#!/bin/bash
set -e

echo "Starting build process..."

# Python과 pip 버전 확인
python3 --version
pip3 --version

# pip 업그레이드
echo "Upgrading pip..."
python3 -m pip install --upgrade pip

# 의존성 설치
echo "Installing dependencies..."
pip3 install -r requirements.txt

# MkDocs 빌드
echo "Building site with MkDocs..."
python3 -m mkdocs build

echo "Build completed successfully!" 