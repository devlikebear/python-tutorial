# Chapter 5: 네트워킹과 소켓 프로그래밍

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 소켓 프로그래밍의 핵심 개념과 저수준 네트워킹 구현하기
- TCP/UDP 프로토콜을 활용한 안정적이고 효율적인 네트워크 통신 설계하기
- 비동기 네트워킹과 고성능 I/O 패턴 마스터하기
- 웹 서버와 프록시 구현을 통한 HTTP 프로토콜 심화 이해하기
- 네트워크 보안과 암호화 통신 구현하기
- 분산 시스템을 위한 메시지 패싱과 RPC 시스템 설계하기
- 고성능 네트워킹 패턴과 스케일링 전략 적용하기
- 실무 중심의 네트워크 모니터링과 문제 해결 기법 활용하기

## 1. 소켓 프로그래밍 기초와 고급 패턴

### 1.1 소켓 프로그래밍 핵심 개념

```python
print("=== 소켓 프로그래밍 기초와 고급 패턴 ===")

import socket
import threading
import time
import json
import struct
import select
import errno
from typing import Dict, List, Optional, Callable, Any
from dataclasses import dataclass
from enum import Enum
import logging

class SocketType(Enum):
    """소켓 타입 열거형"""
    TCP = socket.SOCK_STREAM
    UDP = socket.SOCK_DGRAM

class ConnectionState(Enum):
    """연결 상태"""
    DISCONNECTED = "disconnected"
    CONNECTING = "connecting"
    CONNECTED = "connected"
    DISCONNECTING = "disconnecting"
    ERROR = "error"

@dataclass
class NetworkMessage:
    """네트워크 메시지 구조"""
    msg_type: str
    payload: Dict[str, Any]
    timestamp: float = None
    sender_id: str = None
    
    def __post_init__(self):
        if self.timestamp is None:
            self.timestamp = time.time()
    
    def to_bytes(self) -> bytes:
        """메시지를 바이트로 직렬화"""
        data = {
            'type': self.msg_type,
            'payload': self.payload,
            'timestamp': self.timestamp,
            'sender_id': self.sender_id
        }
        json_data = json.dumps(data).encode('utf-8')
        # 메시지 길이를 헤더로 추가 (4바이트 빅엔디안)
        header = struct.pack('>I', len(json_data))
        return header + json_data
    
    @classmethod
    def from_bytes(cls, data: bytes) -> 'NetworkMessage':
        """바이트에서 메시지 복원"""
        decoded = json.loads(data.decode('utf-8'))
        return cls(
            msg_type=decoded['type'],
            payload=decoded['payload'],
            timestamp=decoded['timestamp'],
            sender_id=decoded['sender_id']
        )

class AdvancedSocket:
    """고급 소켓 래퍼 클래스"""
    
    def __init__(self, socket_type: SocketType = SocketType.TCP):
        self.socket_type = socket_type
        self.socket = socket.socket(socket.AF_INET, socket_type.value)
        self.state = ConnectionState.DISCONNECTED
        self.callbacks = {}
        self.buffer = b''
        self.stats = {
            'bytes_sent': 0,
            'bytes_received': 0,
            'messages_sent': 0,
            'messages_received': 0,
            'connections': 0,
            'errors': 0
        }
        
        # 소켓 옵션 설정
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        if socket_type == SocketType.TCP:
            self.socket.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
    
    def set_callback(self, event: str, callback: Callable):
        """이벤트 콜백 설정"""
        self.callbacks[event] = callback
    
    def _trigger_callback(self, event: str, *args, **kwargs):
        """콜백 트리거"""
        if event in self.callbacks:
            try:
                self.callbacks[event](*args, **kwargs)
            except Exception as e:
                logging.error(f"Callback error for {event}: {e}")
    
    def connect(self, host: str, port: int, timeout: float = 5.0) -> bool:
        """연결 설정"""
        try:
            self.state = ConnectionState.CONNECTING
            self.socket.settimeout(timeout)
            self.socket.connect((host, port))
            self.state = ConnectionState.CONNECTED
            self.stats['connections'] += 1
            
            print(f"   연결 성공: {host}:{port}")
            self._trigger_callback('connected', host, port)
            return True
            
        except socket.error as e:
            self.state = ConnectionState.ERROR
            self.stats['errors'] += 1
            print(f"   연결 실패: {e}")
            self._trigger_callback('connection_failed', e)
            return False
    
    def send_message(self, message: NetworkMessage) -> bool:
        """메시지 전송"""
        if self.state != ConnectionState.CONNECTED:
            return False
        
        try:
            data = message.to_bytes()
            bytes_sent = self.socket.send(data)
            
            self.stats['bytes_sent'] += bytes_sent
            self.stats['messages_sent'] += 1
            
            print(f"   메시지 전송: {message.msg_type} ({bytes_sent} bytes)")
            self._trigger_callback('message_sent', message)
            return True
            
        except socket.error as e:
            self.stats['errors'] += 1
            print(f"   전송 실패: {e}")
            self._trigger_callback('send_error', e)
            return False
    
    def receive_message(self, timeout: float = 1.0) -> Optional[NetworkMessage]:
        """메시지 수신"""
        if self.state != ConnectionState.CONNECTED:
            return None
        
        try:
            self.socket.settimeout(timeout)
            
            # 메시지 헤더 읽기 (4바이트 길이 정보)
            while len(self.buffer) < 4:
                chunk = self.socket.recv(4 - len(self.buffer))
                if not chunk:
                    return None
                self.buffer += chunk
            
            # 메시지 길이 추출
            msg_length = struct.unpack('>I', self.buffer[:4])[0]
            self.buffer = self.buffer[4:]
            
            # 메시지 본문 읽기
            while len(self.buffer) < msg_length:
                remaining = msg_length - len(self.buffer)
                chunk = self.socket.recv(remaining)
                if not chunk:
                    return None
                self.buffer += chunk
            
            # 메시지 파싱
            message_data = self.buffer[:msg_length]
            self.buffer = self.buffer[msg_length:]
            
            message = NetworkMessage.from_bytes(message_data)
            
            self.stats['bytes_received'] += msg_length + 4
            self.stats['messages_received'] += 1
            
            print(f"   메시지 수신: {message.msg_type}")
            self._trigger_callback('message_received', message)
            return message
            
        except socket.timeout:
            return None
        except socket.error as e:
            self.stats['errors'] += 1
            print(f"   수신 실패: {e}")
            self._trigger_callback('receive_error', e)
            return None
    
    def close(self):
        """연결 종료"""
        if self.state == ConnectionState.CONNECTED:
            self.state = ConnectionState.DISCONNECTING
            self._trigger_callback('disconnecting')
        
        try:
            self.socket.close()
            self.state = ConnectionState.DISCONNECTED
            print("   연결 종료")
            self._trigger_callback('disconnected')
        except socket.error as e:
            print(f"   종료 오류: {e}")
    
    def get_stats(self) -> Dict[str, Any]:
        """통계 정보 반환"""
        return {
            **self.stats,
            'state': self.state.value,
            'socket_type': self.socket_type.name
        }

class SocketPool:
    """소켓 풀 관리자"""
    
    def __init__(self, max_size: int = 10):
        self.max_size = max_size
        self.available_sockets = []
        self.in_use_sockets = set()
        self.lock = threading.Lock()
        self.stats = {
            'created': 0,
            'reused': 0,
            'closed': 0
        }
    
    def get_socket(self, socket_type: SocketType = SocketType.TCP) -> AdvancedSocket:
        """소켓 획득"""
        with self.lock:
            # 사용 가능한 소켓 확인
            for sock in self.available_sockets[:]:
                if sock.socket_type == socket_type and sock.state == ConnectionState.DISCONNECTED:
                    self.available_sockets.remove(sock)
                    self.in_use_sockets.add(sock)
                    self.stats['reused'] += 1
                    print(f"   소켓 재사용: {socket_type.name}")
                    return sock
            
            # 새 소켓 생성
            new_socket = AdvancedSocket(socket_type)
            self.in_use_sockets.add(new_socket)
            self.stats['created'] += 1
            print(f"   새 소켓 생성: {socket_type.name}")
            return new_socket
    
    def return_socket(self, sock: AdvancedSocket):
        """소켓 반환"""
        with self.lock:
            if sock in self.in_use_sockets:
                self.in_use_sockets.remove(sock)
                
                if len(self.available_sockets) < self.max_size:
                    # 소켓 상태 초기화
                    sock.buffer = b''
                    sock.state = ConnectionState.DISCONNECTED
                    self.available_sockets.append(sock)
                    print("   소켓 풀 반환")
                else:
                    # 풀이 가득 찬 경우 소켓 닫기
                    sock.close()
                    self.stats['closed'] += 1
                    print("   소켓 풀 가득참, 소켓 닫기")
    
    def close_all(self):
        """모든 소켓 닫기"""
        with self.lock:
            all_sockets = list(self.available_sockets) + list(self.in_use_sockets)
            for sock in all_sockets:
                sock.close()
            
            self.available_sockets.clear()
            self.in_use_sockets.clear()
            print("   모든 소켓 닫기 완료")
    
    def get_stats(self) -> Dict[str, Any]:
        """풀 통계"""
        with self.lock:
            return {
                **self.stats,
                'available': len(self.available_sockets),
                'in_use': len(self.in_use_sockets),
                'total': len(self.available_sockets) + len(self.in_use_sockets)
            }

def demonstrate_socket_basics():
    """소켓 프로그래밍 기초 시연"""
    print("\n1. 기본 소켓 통신:")
    
    def on_connected(host, port):
        print(f"     콜백: {host}:{port}에 연결됨")
    
    def on_message_received(message):
        print(f"     콜백: 메시지 수신됨 - {message.msg_type}")
    
    # 클라이언트 소켓 생성
    client = AdvancedSocket(SocketType.TCP)
    client.set_callback('connected', on_connected)
    client.set_callback('message_received', on_message_received)
    
    # 간단한 에코 서버 시뮬레이션 (실제로는 서버가 필요)
    print("   클라이언트 소켓 생성 완료")
    print("   (실제 서버 연결을 위해서는 서버가 실행 중이어야 함)")
    
    # 메시지 생성 및 직렬화 테스트
    test_message = NetworkMessage(
        msg_type="echo",
        payload={"text": "Hello, Server!"},
        sender_id="client_001"
    )
    
    serialized = test_message.to_bytes()
    deserialized = NetworkMessage.from_bytes(serialized[4:])  # 헤더 제거
    
    print(f"   원본 메시지: {test_message.msg_type} - {test_message.payload}")
    print(f"   직렬화 크기: {len(serialized)} bytes")
    print(f"   복원된 메시지: {deserialized.msg_type} - {deserialized.payload}")
    
    client.close()
    
    print("\n2. 소켓 풀 관리:")
    
    pool = SocketPool(max_size=3)
    
    # 소켓 획득 및 반환 테스트
    sockets = []
    for i in range(5):
        sock = pool.get_socket(SocketType.TCP)
        sockets.append(sock)
    
    print(f"   풀 상태: {pool.get_stats()}")
    
    # 소켓 반환
    for sock in sockets:
        pool.return_socket(sock)
    
    print(f"   반환 후 풀 상태: {pool.get_stats()}")
    
    pool.close_all()

demonstrate_socket_basics()
```

### 1.2 TCP/UDP 서버-클라이언트 구현

```python
print("\n=== TCP/UDP 서버-클라이언트 구현 ===")

import asyncio
import queue
import concurrent.futures
from threading import Thread, Event

class TCPServer:
    """고급 TCP 서버"""
    
    def __init__(self, host: str = 'localhost', port: int = 8888):
        self.host = host
        self.port = port
        self.socket = None
        self.clients = {}
        self.running = False
        self.thread_pool = concurrent.futures.ThreadPoolExecutor(max_workers=10)
        self.message_handlers = {}
        self.stats = {
            'total_connections': 0,
            'active_connections': 0,
            'total_messages': 0,
            'errors': 0
        }
    
    def register_handler(self, msg_type: str, handler: Callable):
        """메시지 핸들러 등록"""
        self.message_handlers[msg_type] = handler
        print(f"   핸들러 등록: {msg_type}")
    
    def start(self):
        """서버 시작"""
        try:
            self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            self.socket.bind((self.host, self.port))
            self.socket.listen(5)
            
            self.running = True
            print(f"   TCP 서버 시작: {self.host}:{self.port}")
            
            while self.running:
                try:
                    client_socket, address = self.socket.accept()
                    client_id = f"{address[0]}:{address[1]}"
                    
                    print(f"   클라이언트 연결: {client_id}")
                    
                    # 클라이언트 정보 저장
                    self.clients[client_id] = {
                        'socket': client_socket,
                        'address': address,
                        'connected_at': time.time()
                    }
                    
                    self.stats['total_connections'] += 1
                    self.stats['active_connections'] += 1
                    
                    # 클라이언트 처리를 스레드 풀에 위임
                    self.thread_pool.submit(self._handle_client, client_id, client_socket)
                    
                except socket.error as e:
                    if self.running:
                        print(f"   연결 수락 오류: {e}")
                        self.stats['errors'] += 1
        
        except Exception as e:
            print(f"   서버 시작 실패: {e}")
        finally:
            self._cleanup()
    
    def _handle_client(self, client_id: str, client_socket: socket.socket):
        """클라이언트 처리"""
        advanced_socket = AdvancedSocket()
        advanced_socket.socket = client_socket
        advanced_socket.state = ConnectionState.CONNECTED
        
        try:
            while self.running:
                message = advanced_socket.receive_message(timeout=1.0)
                if message is None:
                    continue
                
                self.stats['total_messages'] += 1
                print(f"   메시지 수신: {client_id} -> {message.msg_type}")
                
                # 메시지 처리
                response = self._process_message(client_id, message)
                if response:
                    advanced_socket.send_message(response)
        
        except Exception as e:
            print(f"   클라이언트 처리 오류: {client_id} - {e}")
            self.stats['errors'] += 1
        finally:
            self._disconnect_client(client_id)
    
    def _process_message(self, client_id: str, message: NetworkMessage) -> Optional[NetworkMessage]:
        """메시지 처리"""
        handler = self.message_handlers.get(message.msg_type)
        if handler:
            try:
                return handler(client_id, message)
            except Exception as e:
                print(f"   핸들러 오류: {message.msg_type} - {e}")
                return NetworkMessage(
                    msg_type="error",
                    payload={"error": str(e)},
                    sender_id="server"
                )
        else:
            print(f"   알 수 없는 메시지 타입: {message.msg_type}")
            return NetworkMessage(
                msg_type="error",
                payload={"error": f"Unknown message type: {message.msg_type}"},
                sender_id="server"
            )
    
    def _disconnect_client(self, client_id: str):
        """클라이언트 연결 해제"""
        if client_id in self.clients:
            try:
                self.clients[client_id]['socket'].close()
            except:
                pass
            
            del self.clients[client_id]
            self.stats['active_connections'] -= 1
            print(f"   클라이언트 연결 해제: {client_id}")
    
    def broadcast_message(self, message: NetworkMessage):
        """모든 클라이언트에게 메시지 브로드캐스트"""
        disconnected_clients = []
        
        for client_id, client_info in self.clients.items():
            try:
                client_socket = client_info['socket']
                advanced_socket = AdvancedSocket()
                advanced_socket.socket = client_socket
                advanced_socket.state = ConnectionState.CONNECTED
                advanced_socket.send_message(message)
            except Exception as e:
                print(f"   브로드캐스트 실패: {client_id} - {e}")
                disconnected_clients.append(client_id)
        
        # 연결이 끊어진 클라이언트 제거
        for client_id in disconnected_clients:
            self._disconnect_client(client_id)
    
    def stop(self):
        """서버 중지"""
        self.running = False
        
        # 모든 클라이언트 연결 해제
        for client_id in list(self.clients.keys()):
            self._disconnect_client(client_id)
        
        if self.socket:
            self.socket.close()
        
        self.thread_pool.shutdown(wait=True)
        print("   TCP 서버 중지")
    
    def _cleanup(self):
        """정리 작업"""
        if self.socket:
            self.socket.close()
        
        for client_id in list(self.clients.keys()):
            self._disconnect_client(client_id)
    
    def get_stats(self) -> Dict[str, Any]:
        """서버 통계"""
        return {
            **self.stats,
            'running': self.running,
            'connected_clients': len(self.clients)
        }

class UDPServer:
    """고급 UDP 서버"""
    
    def __init__(self, host: str = 'localhost', port: int = 8889):
        self.host = host
        self.port = port
        self.socket = None
        self.running = False
        self.message_handlers = {}
        self.clients = {}  # address -> last_seen
        self.stats = {
            'total_messages': 0,
            'unique_clients': 0,
            'errors': 0
        }
    
    def register_handler(self, msg_type: str, handler: Callable):
        """메시지 핸들러 등록"""
        self.message_handlers[msg_type] = handler
        print(f"   UDP 핸들러 등록: {msg_type}")
    
    def start(self):
        """서버 시작"""
        try:
            self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            self.socket.bind((self.host, self.port))
            self.running = True
            
            print(f"   UDP 서버 시작: {self.host}:{self.port}")
            
            while self.running:
                try:
                    # 메시지 수신 (최대 64KB)
                    data, address = self.socket.recvfrom(65536)
                    
                    # 클라이언트 추적
                    if address not in self.clients:
                        self.clients[address] = time.time()
                        self.stats['unique_clients'] += 1
                        print(f"   새 UDP 클라이언트: {address}")
                    else:
                        self.clients[address] = time.time()
                    
                    self.stats['total_messages'] += 1
                    
                    # 메시지 파싱
                    if len(data) < 4:
                        continue
                    
                    msg_length = struct.unpack('>I', data[:4])[0]
                    if len(data) != msg_length + 4:
                        continue
                    
                    message = NetworkMessage.from_bytes(data[4:])
                    print(f"   UDP 메시지 수신: {address} -> {message.msg_type}")
                    
                    # 메시지 처리
                    response = self._process_message(address, message)
                    if response:
                        self._send_response(address, response)
                
                except socket.error as e:
                    if self.running:
                        print(f"   UDP 수신 오류: {e}")
                        self.stats['errors'] += 1
        
        except Exception as e:
            print(f"   UDP 서버 시작 실패: {e}")
        finally:
            if self.socket:
                self.socket.close()
    
    def _process_message(self, address: tuple, message: NetworkMessage) -> Optional[NetworkMessage]:
        """메시지 처리"""
        handler = self.message_handlers.get(message.msg_type)
        if handler:
            try:
                return handler(address, message)
            except Exception as e:
                print(f"   UDP 핸들러 오류: {message.msg_type} - {e}")
                return NetworkMessage(
                    msg_type="error",
                    payload={"error": str(e)},
                    sender_id="udp_server"
                )
        else:
            return NetworkMessage(
                msg_type="error",
                payload={"error": f"Unknown message type: {message.msg_type}"},
                sender_id="udp_server"
            )
    
    def _send_response(self, address: tuple, message: NetworkMessage):
        """응답 전송"""
        try:
            data = message.to_bytes()
            self.socket.sendto(data, address)
            print(f"   UDP 응답 전송: {message.msg_type} -> {address}")
        except socket.error as e:
            print(f"   UDP 전송 실패: {e}")
            self.stats['errors'] += 1
    
    def stop(self):
        """서버 중지"""
        self.running = False
        if self.socket:
            self.socket.close()
        print("   UDP 서버 중지")
    
    def get_stats(self) -> Dict[str, Any]:
        """서버 통계"""
        active_clients = sum(1 for last_seen in self.clients.values() 
                           if time.time() - last_seen < 300)  # 5분 이내
        
        return {
            **self.stats,
            'running': self.running,
            'active_clients': active_clients,
            'total_clients': len(self.clients)
        }

def demonstrate_tcp_udp_servers():
    """TCP/UDP 서버 시연"""
    print("\n1. TCP 서버 핸들러 설정:")
    
    tcp_server = TCPServer('localhost', 8888)
    
    def echo_handler(client_id: str, message: NetworkMessage) -> NetworkMessage:
        """에코 핸들러"""
        return NetworkMessage(
            msg_type="echo_response",
            payload={"original": message.payload, "client": client_id},
            sender_id="tcp_server"
        )
    
    def ping_handler(client_id: str, message: NetworkMessage) -> NetworkMessage:
        """핑 핸들러"""
        return NetworkMessage(
            msg_type="pong",
            payload={"timestamp": time.time()},
            sender_id="tcp_server"
        )
    
    tcp_server.register_handler("echo", echo_handler)
    tcp_server.register_handler("ping", ping_handler)
    
    print(f"   TCP 서버 설정 완료: {tcp_server.get_stats()}")
    
    print("\n2. UDP 서버 핸들러 설정:")
    
    udp_server = UDPServer('localhost', 8889)
    
    def udp_echo_handler(address: tuple, message: NetworkMessage) -> NetworkMessage:
        """UDP 에코 핸들러"""
        return NetworkMessage(
            msg_type="udp_echo_response",
            payload={"original": message.payload, "address": f"{address[0]}:{address[1]}"},
            sender_id="udp_server"
        )
    
    def broadcast_handler(address: tuple, message: NetworkMessage) -> NetworkMessage:
        """브로드캐스트 핸들러"""
        return NetworkMessage(
            msg_type="broadcast_ack",
            payload={"message": "Broadcast received"},
            sender_id="udp_server"
        )
    
    udp_server.register_handler("echo", udp_echo_handler)
    udp_server.register_handler("broadcast", broadcast_handler)
    
    print(f"   UDP 서버 설정 완료: {udp_server.get_stats()}")
    
    print("\n3. 서버 시뮬레이션 (실제 실행은 별도 프로세스 필요):")
    print("   실제 서버 실행:")
    print("   - TCP: python -c \"from server import TCPServer; TCPServer().start()\"")
    print("   - UDP: python -c \"from server import UDPServer; UDPServer().start()\"")
    
    # 클라이언트 시뮬레이션
    print("\n4. 클라이언트 연결 시뮬레이션:")
    
    client = AdvancedSocket(SocketType.TCP)
    
    # 메시지 생성 테스트
    test_messages = [
        NetworkMessage("echo", {"text": "Hello, TCP Server!"}),
        NetworkMessage("ping", {}),
        NetworkMessage("unknown", {"test": "data"})
    ]
    
    for msg in test_messages:
        print(f"   테스트 메시지: {msg.msg_type} - {msg.payload}")
        # 실제 전송은 서버가 실행 중일 때만 가능
    
    print(f"   클라이언트 통계: {client.get_stats()}")

demonstrate_tcp_udp_servers()
```

## 2. 비동기 네트워킹과 이벤트 루프

### 2.1 AsyncIO 기반 네트워크 서버

```python
print("\n=== 비동기 네트워킹과 이벤트 루프 ===")

import asyncio
import aiofiles
import weakref
from asyncio import StreamReader, StreamWriter
from typing import Set, Dict, Callable, Awaitable

class AsyncNetworkMessage:
    """비동기 네트워크 메시지"""
    
    def __init__(self, msg_type: str, payload: Dict[str, Any], 
                 sender_id: str = None, correlation_id: str = None):
        self.msg_type = msg_type
        self.payload = payload
        self.sender_id = sender_id
        self.correlation_id = correlation_id or str(time.time())
        self.timestamp = time.time()
    
    def to_dict(self) -> Dict[str, Any]:
        """딕셔너리로 변환"""
        return {
            'type': self.msg_type,
            'payload': self.payload,
            'sender_id': self.sender_id,
            'correlation_id': self.correlation_id,
            'timestamp': self.timestamp
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'AsyncNetworkMessage':
        """딕셔너리에서 생성"""
        return cls(
            msg_type=data['type'],
            payload=data['payload'],
            sender_id=data.get('sender_id'),
            correlation_id=data.get('correlation_id')
        )
    
    async def to_bytes(self) -> bytes:
        """비동기 직렬화"""
        data = json.dumps(self.to_dict()).encode('utf-8')
        header = struct.pack('>I', len(data))
        return header + data
    
    @classmethod
    async def from_reader(cls, reader: StreamReader) -> Optional['AsyncNetworkMessage']:
        """StreamReader에서 메시지 읽기"""
        try:
            # 헤더 읽기
            header = await reader.readexactly(4)
            msg_length = struct.unpack('>I', header)[0]
            
            # 메시지 본문 읽기
            data = await reader.readexactly(msg_length)
            message_dict = json.loads(data.decode('utf-8'))
            
            return cls.from_dict(message_dict)
        
        except (asyncio.IncompleteReadError, json.JSONDecodeError) as e:
            return None

class AsyncTCPServer:
    """비동기 TCP 서버"""
    
    def __init__(self, host: str = 'localhost', port: int = 8890):
        self.host = host
        self.port = port
        self.server = None
        self.clients: Set[StreamWriter] = set()
        self.client_info: Dict[StreamWriter, Dict] = {}
        self.message_handlers: Dict[str, Callable] = {}
        self.middleware: List[Callable] = []
        self.stats = {
            'total_connections': 0,
            'active_connections': 0,
            'total_messages': 0,
            'errors': 0,
            'start_time': None
        }
        
        # 약한 참조를 사용하여 클라이언트 관리
        self.client_refs = weakref.WeakSet()
    
    def add_middleware(self, middleware: Callable):
        """미들웨어 추가"""
        self.middleware.append(middleware)
        print(f"   미들웨어 추가: {middleware.__name__}")
    
    def register_handler(self, msg_type: str, handler: Callable[..., Awaitable]):
        """비동기 메시지 핸들러 등록"""
        self.message_handlers[msg_type] = handler
        print(f"   비동기 핸들러 등록: {msg_type}")
    
    async def start(self):
        """서버 시작"""
        try:
            self.server = await asyncio.start_server(
                self._handle_client,
                self.host,
                self.port
            )
            
            self.stats['start_time'] = time.time()
            print(f"   비동기 TCP 서버 시작: {self.host}:{self.port}")
            
            async with self.server:
                await self.server.serve_forever()
        
        except Exception as e:
            print(f"   비동기 서버 시작 실패: {e}")
    
    async def _handle_client(self, reader: StreamReader, writer: StreamWriter):
        """클라이언트 연결 처리"""
        client_address = writer.get_extra_info('peername')
        client_id = f"{client_address[0]}:{client_address[1]}"
        
        # 클라이언트 등록
        self.clients.add(writer)
        self.client_info[writer] = {
            'address': client_address,
            'connected_at': time.time(),
            'client_id': client_id,
            'messages_received': 0
        }
        
        self.stats['total_connections'] += 1
        self.stats['active_connections'] += 1
        
        print(f"   비동기 클라이언트 연결: {client_id}")
        
        try:
            while True:
                # 메시지 수신
                message = await AsyncNetworkMessage.from_reader(reader)
                if message is None:
                    break
                
                self.client_info[writer]['messages_received'] += 1
                self.stats['total_messages'] += 1
                
                print(f"   비동기 메시지 수신: {client_id} -> {message.msg_type}")
                
                # 미들웨어 실행
                for middleware in self.middleware:
                    try:
                        await middleware(client_id, message)
                    except Exception as e:
                        print(f"   미들웨어 오류: {e}")
                
                # 메시지 처리
                response = await self._process_message(client_id, message)
                if response:
                    await self._send_message(writer, response)
        
        except asyncio.CancelledError:
            print(f"   클라이언트 처리 취소: {client_id}")
        except Exception as e:
            print(f"   클라이언트 처리 오류: {client_id} - {e}")
            self.stats['errors'] += 1
        finally:
            await self._disconnect_client(writer)
    
    async def _process_message(self, client_id: str, message: AsyncNetworkMessage) -> Optional[AsyncNetworkMessage]:
        """메시지 처리"""
        handler = self.message_handlers.get(message.msg_type)
        if handler:
            try:
                return await handler(client_id, message)
            except Exception as e:
                print(f"   비동기 핸들러 오류: {message.msg_type} - {e}")
                return AsyncNetworkMessage(
                    msg_type="error",
                    payload={"error": str(e)},
                    sender_id="async_server",
                    correlation_id=message.correlation_id
                )
        else:
            return AsyncNetworkMessage(
                msg_type="error",
                payload={"error": f"Unknown message type: {message.msg_type}"},
                sender_id="async_server",
                correlation_id=message.correlation_id
            )
    
    async def _send_message(self, writer: StreamWriter, message: AsyncNetworkMessage):
        """메시지 전송"""
        try:
            data = await message.to_bytes()
            writer.write(data)
            await writer.drain()
            print(f"   비동기 메시지 전송: {message.msg_type}")
        except Exception as e:
            print(f"   비동기 전송 실패: {e}")
            self.stats['errors'] += 1
    
    async def _disconnect_client(self, writer: StreamWriter):
        """클라이언트 연결 해제"""
        if writer in self.clients:
            client_info = self.client_info.get(writer, {})
            client_id = client_info.get('client_id', 'unknown')
            
            self.clients.discard(writer)
            self.client_info.pop(writer, None)
            self.stats['active_connections'] -= 1
            
            try:
                writer.close()
                await writer.wait_closed()
            except Exception:
                pass
            
            print(f"   비동기 클라이언트 연결 해제: {client_id}")
    
    async def broadcast_message(self, message: AsyncNetworkMessage):
        """모든 클라이언트에게 브로드캐스트"""
        if not self.clients:
            return
        
        print(f"   브로드캐스트: {message.msg_type} to {len(self.clients)} clients")
        
        # 병렬 전송
        tasks = []
        for writer in list(self.clients):
            task = asyncio.create_task(self._send_message(writer, message))
            tasks.append(task)
        
        # 전송 완료 대기
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # 오류 처리
        errors = [r for r in results if isinstance(r, Exception)]
        if errors:
            print(f"   브로드캐스트 오류: {len(errors)}개")
    
    async def stop(self):
        """서버 중지"""
        if self.server:
            self.server.close()
            await self.server.wait_closed()
        
        # 모든 클라이언트 연결 해제
        for writer in list(self.clients):
            await self._disconnect_client(writer)
        
        print("   비동기 TCP 서버 중지")
    
    def get_stats(self) -> Dict[str, Any]:
        """서버 통계"""
        uptime = time.time() - self.stats['start_time'] if self.stats['start_time'] else 0
        
        return {
            **self.stats,
            'uptime': uptime,
            'connected_clients': len(self.clients),
            'handlers_registered': len(self.message_handlers),
            'middleware_count': len(self.middleware)
        }

class AsyncClient:
    """비동기 클라이언트"""
    
    def __init__(self):
        self.reader = None
        self.writer = None
        self.connected = False
        self.response_futures = {}
        self.stats = {
            'messages_sent': 0,
            'messages_received': 0,
            'errors': 0
        }
    
    async def connect(self, host: str, port: int) -> bool:
        """서버에 연결"""
        try:
            self.reader, self.writer = await asyncio.open_connection(host, port)
            self.connected = True
            print(f"   비동기 클라이언트 연결: {host}:{port}")
            
            # 수신 태스크 시작
            asyncio.create_task(self._receive_loop())
            return True
            
        except Exception as e:
            print(f"   비동기 연결 실패: {e}")
            self.stats['errors'] += 1
            return False
    
    async def send_message(self, message: AsyncNetworkMessage) -> Optional[AsyncNetworkMessage]:
        """메시지 전송 및 응답 대기"""
        if not self.connected:
            return None
        
        try:
            # 응답 대기를 위한 Future 생성
            if message.correlation_id:
                future = asyncio.Future()
                self.response_futures[message.correlation_id] = future
            
            # 메시지 전송
            data = await message.to_bytes()
            self.writer.write(data)
            await self.writer.drain()
            
            self.stats['messages_sent'] += 1
            print(f"   비동기 메시지 전송: {message.msg_type}")
            
            # 응답이 필요한 경우 대기
            if message.correlation_id:
                try:
                    response = await asyncio.wait_for(future, timeout=5.0)
                    return response
                except asyncio.TimeoutError:
                    print(f"   응답 타임아웃: {message.correlation_id}")
                    return None
                finally:
                    self.response_futures.pop(message.correlation_id, None)
            
            return None
            
        except Exception as e:
            print(f"   비동기 전송 실패: {e}")
            self.stats['errors'] += 1
            return None
    
    async def _receive_loop(self):
        """메시지 수신 루프"""
        try:
            while self.connected:
                message = await AsyncNetworkMessage.from_reader(self.reader)
                if message is None:
                    break
                
                self.stats['messages_received'] += 1
                print(f"   비동기 메시지 수신: {message.msg_type}")
                
                # 응답 메시지 처리
                if message.correlation_id in self.response_futures:
                    future = self.response_futures[message.correlation_id]
                    if not future.done():
                        future.set_result(message)
        
        except Exception as e:
            print(f"   수신 루프 오류: {e}")
            self.stats['errors'] += 1
        finally:
            self.connected = False
    
    async def disconnect(self):
        """연결 해제"""
        if self.writer:
            self.writer.close()
            await self.writer.wait_closed()
        
        self.connected = False
        print("   비동기 클라이언트 연결 해제")
    
    def get_stats(self) -> Dict[str, Any]:
        """클라이언트 통계"""
        return {
            **self.stats,
            'connected': self.connected,
            'pending_responses': len(self.response_futures)
        }

async def demonstrate_async_networking():
    """비동기 네트워킹 시연"""
    print("\n1. 비동기 서버 설정:")
    
    server = AsyncTCPServer('localhost', 8890)
    
    # 미들웨어 정의
    async def logging_middleware(client_id: str, message: AsyncNetworkMessage):
        """로깅 미들웨어"""
        print(f"     미들웨어 로그: {client_id} -> {message.msg_type}")
    
    async def rate_limit_middleware(client_id: str, message: AsyncNetworkMessage):
        """속도 제한 미들웨어"""
        # 실제로는 클라이언트별 속도 제한 구현
        pass
    
    server.add_middleware(logging_middleware)
    server.add_middleware(rate_limit_middleware)
    
    # 핸들러 정의
    async def async_echo_handler(client_id: str, message: AsyncNetworkMessage) -> AsyncNetworkMessage:
        """비동기 에코 핸들러"""
        await asyncio.sleep(0.1)  # 비동기 작업 시뮬레이션
        return AsyncNetworkMessage(
            msg_type="echo_response",
            payload={"echo": message.payload, "processed_by": "async_server"},
            sender_id="async_server",
            correlation_id=message.correlation_id
        )
    
    async def async_compute_handler(client_id: str, message: AsyncNetworkMessage) -> AsyncNetworkMessage:
        """비동기 계산 핸들러"""
        numbers = message.payload.get('numbers', [])
        
        # CPU 집약적 작업을 별도 스레드에서 실행
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, sum, numbers)
        
        return AsyncNetworkMessage(
            msg_type="compute_response",
            payload={"result": result, "count": len(numbers)},
            sender_id="async_server",
            correlation_id=message.correlation_id
        )
    
    server.register_handler("echo", async_echo_handler)
    server.register_handler("compute", async_compute_handler)
    
    print(f"   비동기 서버 설정 완료: {server.get_stats()}")
    
    print("\n2. 비동기 클라이언트 테스트:")
    
    client = AsyncClient()
    
    # 테스트 메시지들
    test_messages = [
        AsyncNetworkMessage("echo", {"text": "Hello Async!"}, correlation_id="test_1"),
        AsyncNetworkMessage("compute", {"numbers": list(range(100))}, correlation_id="test_2"),
        AsyncNetworkMessage("unknown", {"data": "test"}, correlation_id="test_3")
    ]
    
    print("   테스트 메시지 준비:")
    for msg in test_messages:
        print(f"     {msg.msg_type}: {msg.correlation_id}")
    
    print(f"   클라이언트 설정 완료: {client.get_stats()}")
    
    print("\n3. 실제 비동기 서버 실행 (데모):")
    print("   실제 실행: asyncio.run(server.start())")
    print("   클라이언트: asyncio.run(client.connect('localhost', 8890))")

# 비동기 네트워킹 데모 실행
try:
    # 실제 환경에서는 asyncio.run() 사용
    print("   비동기 네트워킹 데모 설정 완료")
    print("   실제 실행은 별도 비동기 환경에서 진행하세요")
except Exception as e:
    print(f"   비동기 데모 오류: {e}")
```

## 3. HTTP 서버와 웹 프로토콜 구현

### 3.1 커스텀 HTTP 서버 구현

```python
print("\n=== HTTP 서버와 웹 프로토콜 구현 ===")

import urllib.parse
import mimetypes
import os
from http import HTTPStatus
from typing import Dict, List, Tuple, Optional, Union
import base64
import hashlib

class HTTPRequest:
    """HTTP 요청 파서"""
    
    def __init__(self, raw_request: str):
        self.raw = raw_request
        self.method = ""
        self.path = ""
        self.version = ""
        self.headers = {}
        self.query_params = {}
        self.body = ""
        self.cookies = {}
        
        self._parse_request()
    
    def _parse_request(self):
        """요청 파싱"""
        if not self.raw.strip():
            return
        
        lines = self.raw.split('\r\n')
        if not lines:
            return
        
        # 첫 번째 줄: 메서드, 경로, 버전
        request_line = lines[0].split(' ')
        if len(request_line) >= 3:
            self.method = request_line[0]
            full_path = request_line[1]
            self.version = request_line[2]
            
            # 경로와 쿼리 파라미터 분리
            if '?' in full_path:
                self.path, query_string = full_path.split('?', 1)
                self.query_params = urllib.parse.parse_qs(query_string)
            else:
                self.path = full_path
        
        # 헤더 파싱
        header_end = len(lines)
        for i, line in enumerate(lines[1:], 1):
            if line == '':
                header_end = i
                break
            
            if ':' in line:
                key, value = line.split(':', 1)
                self.headers[key.strip().lower()] = value.strip()
        
        # 쿠키 파싱
        if 'cookie' in self.headers:
            cookie_header = self.headers['cookie']
            for cookie in cookie_header.split(';'):
                if '=' in cookie:
                    key, value = cookie.split('=', 1)
                    self.cookies[key.strip()] = value.strip()
        
        # 바디 파싱
        if header_end < len(lines):
            self.body = '\r\n'.join(lines[header_end + 1:])
    
    def get_header(self, name: str, default: str = None) -> str:
        """헤더 값 가져오기"""
        return self.headers.get(name.lower(), default)
    
    def get_query_param(self, name: str, default: str = None) -> str:
        """쿼리 파라미터 가져오기"""
        values = self.query_params.get(name, [default])
        return values[0] if values else default
    
    def get_cookie(self, name: str, default: str = None) -> str:
        """쿠키 값 가져오기"""
        return self.cookies.get(name, default)

class HTTPResponse:
    """HTTP 응답 생성기"""
    
    def __init__(self, status_code: int = 200, status_text: str = None):
        self.status_code = status_code
        self.status_text = status_text or HTTPStatus(status_code).phrase
        self.headers = {}
        self.cookies = {}
        self.body = ""
        
        # 기본 헤더 설정
        self.headers['Server'] = 'AdvancedPythonServer/1.0'
        self.headers['Date'] = time.strftime('%a, %d %b %Y %H:%M:%S GMT', time.gmtime())
        self.headers['Connection'] = 'close'
    
    def set_header(self, name: str, value: str):
        """헤더 설정"""
        self.headers[name] = value
    
    def set_cookie(self, name: str, value: str, max_age: int = None, 
                   path: str = "/", secure: bool = False, http_only: bool = True):
        """쿠키 설정"""
        cookie_value = f"{name}={value}; Path={path}"
        
        if max_age:
            cookie_value += f"; Max-Age={max_age}"
        
        if secure:
            cookie_value += "; Secure"
        
        if http_only:
            cookie_value += "; HttpOnly"
        
        self.cookies[name] = cookie_value
    
    def set_json_body(self, data: Dict[str, Any]):
        """JSON 응답 설정"""
        self.body = json.dumps(data)
        self.headers['Content-Type'] = 'application/json'
        self.headers['Content-Length'] = str(len(self.body.encode('utf-8')))
    
    def set_html_body(self, html: str):
        """HTML 응답 설정"""
        self.body = html
        self.headers['Content-Type'] = 'text/html; charset=utf-8'
        self.headers['Content-Length'] = str(len(self.body.encode('utf-8')))
    
    def set_file_body(self, file_path: str):
        """파일 응답 설정"""
        try:
            with open(file_path, 'rb') as f:
                file_content = f.read()
            
            self.body = file_content
            
            # MIME 타입 설정
            mime_type, _ = mimetypes.guess_type(file_path)
            if mime_type:
                self.headers['Content-Type'] = mime_type
            else:
                self.headers['Content-Type'] = 'application/octet-stream'
            
            self.headers['Content-Length'] = str(len(file_content))
            
        except FileNotFoundError:
            self.status_code = 404
            self.status_text = 'Not Found'
            self.set_html_body('<h1>404 Not Found</h1>')
    
    def to_bytes(self) -> bytes:
        """바이트로 변환"""
        # 상태 라인
        response_lines = [f"HTTP/1.1 {self.status_code} {self.status_text}"]
        
        # 헤더
        for name, value in self.headers.items():
            response_lines.append(f"{name}: {value}")
        
        # 쿠키
        for cookie_value in self.cookies.values():
            response_lines.append(f"Set-Cookie: {cookie_value}")
        
        # 빈 줄
        response_lines.append("")
        
        # 응답 헤더 생성
        response_header = '\r\n'.join(response_lines)
        
        # 바디 추가
        if isinstance(self.body, str):
            return response_header.encode('utf-8') + self.body.encode('utf-8')
        else:
            return response_header.encode('utf-8') + self.body

class HTTPRouter:
    """HTTP 라우터"""
    
    def __init__(self):
        self.routes = {}
        self.middleware = []
    
    def add_route(self, method: str, path: str, handler: Callable):
        """라우트 추가"""
        key = f"{method.upper()}:{path}"
        self.routes[key] = handler
        print(f"   라우트 등록: {method.upper()} {path}")
    
    def get(self, path: str):
        """GET 라우트 데코레이터"""
        def decorator(handler):
            self.add_route('GET', path, handler)
            return handler
        return decorator
    
    def post(self, path: str):
        """POST 라우트 데코레이터"""
        def decorator(handler):
            self.add_route('POST', path, handler)
            return handler
        return decorator
    
    def add_middleware(self, middleware: Callable):
        """미들웨어 추가"""
        self.middleware.append(middleware)
        print(f"   미들웨어 등록: {middleware.__name__}")
    
    def find_handler(self, method: str, path: str) -> Optional[Callable]:
        """핸들러 찾기"""
        # 정확한 매치 먼저 확인
        exact_key = f"{method.upper()}:{path}"
        if exact_key in self.routes:
            return self.routes[exact_key]
        
        # 패턴 매칭 (간단한 구현)
        for route_key, handler in self.routes.items():
            route_method, route_path = route_key.split(':', 1)
            if route_method == method.upper():
                # 와일드카드 패턴 처리
                if route_path.endswith('/*') and path.startswith(route_path[:-1]):
                    return handler
        
        return None
    
    def apply_middleware(self, request: HTTPRequest, response: HTTPResponse):
        """미들웨어 적용"""
        for middleware in self.middleware:
            try:
                middleware(request, response)
            except Exception as e:
                print(f"   미들웨어 오류: {middleware.__name__} - {e}")

class AdvancedHTTPServer:
    """고급 HTTP 서버"""
    
    def __init__(self, host: str = 'localhost', port: int = 8000):
        self.host = host
        self.port = port
        self.router = HTTPRouter()
        self.socket = None
        self.running = False
        self.static_dir = None
        self.stats = {
            'total_requests': 0,
            'successful_requests': 0,
            'error_requests': 0,
            'start_time': None
        }
        
        # 기본 라우트 설정
        self._setup_default_routes()
    
    def _setup_default_routes(self):
        """기본 라우트 설정"""
        @self.router.get('/')
        def index_handler(request: HTTPRequest) -> HTTPResponse:
            html = """
            <!DOCTYPE html>
            <html>
            <head><title>Advanced Python Server</title></head>
            <body>
                <h1>Welcome to Advanced Python Server</h1>
                <p>Server is running successfully!</p>
                <ul>
                    <li><a href="/api/status">Server Status</a></li>
                    <li><a href="/api/stats">Server Statistics</a></li>
                </ul>
            </body>
            </html>
            """
            response = HTTPResponse()
            response.set_html_body(html)
            return response
        
        @self.router.get('/api/status')
        def status_handler(request: HTTPRequest) -> HTTPResponse:
            response = HTTPResponse()
            response.set_json_body({
                'status': 'running',
                'uptime': time.time() - self.stats['start_time'] if self.stats['start_time'] else 0,
                'server': 'AdvancedPythonServer/1.0'
            })
            return response
        
        @self.router.get('/api/stats')
        def stats_handler(request: HTTPRequest) -> HTTPResponse:
            response = HTTPResponse()
            response.set_json_body(self.get_stats())
            return response
    
    def set_static_directory(self, directory: str):
        """정적 파일 디렉토리 설정"""
        self.static_dir = directory
        
        @self.router.get('/static/*')
        def static_handler(request: HTTPRequest) -> HTTPResponse:
            # /static/ 제거
            file_path = request.path[8:]
            full_path = os.path.join(self.static_dir, file_path)
            
            # 보안: 디렉토리 탐색 방지
            if '..' in file_path or not full_path.startswith(self.static_dir):
                response = HTTPResponse(403, 'Forbidden')
                response.set_html_body('<h1>403 Forbidden</h1>')
                return response
            
            response = HTTPResponse()
            response.set_file_body(full_path)
            return response
        
        print(f"   정적 파일 디렉토리 설정: {directory}")
    
    def start(self):
        """서버 시작"""
        try:
            self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            self.socket.bind((self.host, self.port))
            self.socket.listen(5)
            
            self.running = True
            self.stats['start_time'] = time.time()
            
            print(f"   HTTP 서버 시작: http://{self.host}:{self.port}")
            
            while self.running:
                try:
                    client_socket, address = self.socket.accept()
                    self._handle_request(client_socket, address)
                    
                except socket.error as e:
                    if self.running:
                        print(f"   요청 처리 오류: {e}")
                        self.stats['error_requests'] += 1
        
        except Exception as e:
            print(f"   HTTP 서버 시작 실패: {e}")
        finally:
            self._cleanup()
    
    def _handle_request(self, client_socket: socket.socket, address: tuple):
        """HTTP 요청 처리"""
        try:
            # 요청 데이터 수신
            raw_request = client_socket.recv(8192).decode('utf-8')
            if not raw_request.strip():
                return
            
            self.stats['total_requests'] += 1
            
            # 요청 파싱
            request = HTTPRequest(raw_request)
            print(f"   {request.method} {request.path} from {address[0]}")
            
            # 핸들러 찾기
            handler = self.router.find_handler(request.method, request.path)
            
            if handler:
                # 핸들러 실행
                response = handler(request)
                self.stats['successful_requests'] += 1
            else:
                # 404 응답
                response = HTTPResponse(404, 'Not Found')
                response.set_html_body('<h1>404 Not Found</h1>')
                self.stats['error_requests'] += 1
            
            # 미들웨어 적용
            self.router.apply_middleware(request, response)
            
            # 응답 전송
            response_data = response.to_bytes()
            client_socket.send(response_data)
            
        except Exception as e:
            print(f"   요청 처리 중 오류: {e}")
            self.stats['error_requests'] += 1
            
            # 500 응답
            try:
                error_response = HTTPResponse(500, 'Internal Server Error')
                error_response.set_html_body('<h1>500 Internal Server Error</h1>')
                client_socket.send(error_response.to_bytes())
            except:
                pass
        
        finally:
            try:
                client_socket.close()
            except:
                pass
    
    def stop(self):
        """서버 중지"""
        self.running = False
        if self.socket:
            self.socket.close()
        print("   HTTP 서버 중지")
    
    def _cleanup(self):
        """정리 작업"""
        if self.socket:
            self.socket.close()
    
    def get_stats(self) -> Dict[str, Any]:
        """서버 통계"""
        uptime = time.time() - self.stats['start_time'] if self.stats['start_time'] else 0
        
        return {
            **self.stats,
            'uptime': uptime,
            'running': self.running,
            'routes_registered': len(self.router.routes),
            'middleware_count': len(self.router.middleware)
        }

def demonstrate_http_server():
    """HTTP 서버 시연"""
    print("\n1. HTTP 서버 설정:")
    
    server = AdvancedHTTPServer('localhost', 8000)
    
    # 커스텀 라우트 추가
    @server.router.get('/api/echo')
    def echo_handler(request: HTTPRequest) -> HTTPResponse:
        """에코 핸들러"""
        response = HTTPResponse()
        response.set_json_body({
            'method': request.method,
            'path': request.path,
            'headers': dict(request.headers),
            'query_params': request.query_params,
            'body': request.body
        })
        return response
    
    @server.router.post('/api/data')
    def data_handler(request: HTTPRequest) -> HTTPResponse:
        """데이터 처리 핸들러"""
        try:
            if request.get_header('content-type', '').startswith('application/json'):
                data = json.loads(request.body)
            else:
                data = {'raw_body': request.body}
            
            response = HTTPResponse()
            response.set_json_body({
                'received': data,
                'timestamp': time.time(),
                'processed': True
            })
            return response
            
        except json.JSONDecodeError:
            response = HTTPResponse(400, 'Bad Request')
            response.set_json_body({'error': 'Invalid JSON'})
            return response
    
    # 미들웨어 추가
    def cors_middleware(request: HTTPRequest, response: HTTPResponse):
        """CORS 미들웨어"""
        response.set_header('Access-Control-Allow-Origin', '*')
        response.set_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        response.set_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def logging_middleware(request: HTTPRequest, response: HTTPResponse):
        """로깅 미들웨어"""
        print(f"     로그: {request.method} {request.path} -> {response.status_code}")
    
    server.router.add_middleware(cors_middleware)
    server.router.add_middleware(logging_middleware)
    
    print(f"   HTTP 서버 설정 완료: {server.get_stats()}")
    
    print("\n2. HTTP 요청/응답 테스트:")
    
    # 테스트 요청 생성
    test_request = """GET /api/echo?name=test&value=123 HTTP/1.1\r
Host: localhost:8000\r
User-Agent: TestClient/1.0\r
Accept: application/json\r
Cookie: session_id=abc123; user_pref=dark\r
\r
"""
    
    request = HTTPRequest(test_request)
    print(f"   파싱된 요청:")
    print(f"     메서드: {request.method}")
    print(f"     경로: {request.path}")
    print(f"     쿼리: {request.query_params}")
    print(f"     헤더: {len(request.headers)}개")
    print(f"     쿠키: {request.cookies}")
    
    # 테스트 응답 생성
    response = HTTPResponse()
    response.set_json_body({
        'message': 'Hello, World!',
        'timestamp': time.time()
    })
    response.set_cookie('response_id', 'xyz789', max_age=3600)
    
    print(f"\n   응답 생성:")
    print(f"     상태: {response.status_code} {response.status_text}")
    print(f"     헤더: {len(response.headers)}개")
    print(f"     쿠키: {len(response.cookies)}개")
    print(f"     바디 크기: {len(response.body)} bytes")
    
    print("\n3. 실제 서버 실행 (데모):")
    print("   실행 명령: server.start()")
    print("   접속 URL: http://localhost:8000")
    print("   API 엔드포인트:")
    print("     GET  /              - 메인 페이지")
    print("     GET  /api/status    - 서버 상태")
    print("     GET  /api/stats     - 서버 통계")
    print("     GET  /api/echo      - 에코 테스트")
    print("     POST /api/data      - 데이터 처리")

demonstrate_http_server()
```

## 4. 연습 문제

### 연습 1: 고성능 채팅 서버
WebSocket을 지원하는 실시간 채팅 서버를 구현하세요:
- 멀티룸 지원
- 사용자 인증 및 권한 관리
- 메시지 히스토리 저장
- 파일 전송 기능
- 접속자 수 제한 및 밴 기능

### 연습 2: 분산 메시지 큐 시스템
고가용성 메시지 큐 시스템을 구현하세요:
- 메시지 영속성
- 클러스터링 지원
- 백프레셔 제어
- 메시지 라우팅
- 모니터링 대시보드

### 연습 3: 마이크로서비스 게이트웨이
API 게이트웨이 서버를 구현하세요:
- 로드 밸런싱
- 서비스 디스커버리
- 인증 및 인가
- 요청/응답 변환
- 속도 제한 및 캐싱

### 연습 4: 네트워크 모니터링 도구
실시간 네트워크 모니터링 도구를 구현하세요:
- 패킷 캡처 및 분석
- 대역폭 측정
- 연결 상태 추적
- 알림 시스템
- 웹 기반 대시보드

## 정리

이 챕터에서 학습한 내용:

1. **소켓 프로그래밍 기초**: 고급 소켓 래퍼, 메시지 프로토콜, 소켓 풀링
2. **TCP/UDP 구현**: 서버-클라이언트 아키텍처, 멀티스레드 처리, 브로드캐스팅
3. **비동기 네트워킹**: AsyncIO 기반 서버, 스트림 처리, 미들웨어 패턴
4. **HTTP 프로토콜**: 커스텀 HTTP 서버, 라우팅, 정적 파일 서빙

다음 챕터에서는 고급 파일 I/O와 스트리밍을 통해 대용량 데이터 처리 기법을 학습하게 됩니다.

### 핵심 포인트
- 네트워크 프로그래밍은 동시성과 비동기 처리가 핵심입니다
- 프로토콜 설계 시 확장성과 호환성을 고려해야 합니다
- 오류 처리와 복구 메커니즘이 안정성을 결정합니다
- 성능 최적화를 위해 버퍼링과 커넥션 풀링이 중요합니다
- 보안을 고려한 안전한 통신 구현이 필수적입니다
- 모니터링과 로깅을 통한 운영 가시성 확보가 중요합니다 