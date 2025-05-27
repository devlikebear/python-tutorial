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

# 퀴즈 데이터 복사
echo "Copying quiz data..."
mkdir -p site/quizzes/beginner
mkdir -p site/quizzes/intermediate  
mkdir -p site/quizzes/advanced

cp docs/quizzes/beginner/*.json site/quizzes/beginner/ 2>/dev/null || echo "No beginner quiz files found"
cp docs/quizzes/intermediate/*.json site/quizzes/intermediate/ 2>/dev/null || echo "No intermediate quiz files found"
cp docs/quizzes/advanced/*.json site/quizzes/advanced/ 2>/dev/null || echo "No advanced quiz files found"

echo "Build completed successfully!" 