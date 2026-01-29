# 🔥🦋 불나방 - Koyeb 배포 가이드

## 배포 방법

### 1. Koyeb 대시보드에서 배포

1. [Koyeb](https://app.koyeb.com) 로그인
2. **Create App** 클릭
3. **GitHub** 선택
4. Repository: `gclim6926/bulnabang` 선택
5. 설정:
   - **Builder**: Dockerfile
   - **Dockerfile path**: `Dockerfile`
   - **Port**: `8000`
6. **Deploy** 클릭

### 2. 환경 변수 (필요시)

```
PORT=8000
```

### 3. 배포 후 확인

- 앱 URL: `https://[app-name]-[username].koyeb.app`
- API 문서: `https://[app-name]-[username].koyeb.app/docs`
- Health Check: `https://[app-name]-[username].koyeb.app/api/health`

## 로컬 Docker 테스트

```bash
# 빌드
docker build -t bulnabang .

# 실행
docker run -p 8000:8000 bulnabang

# 접속
open http://localhost:8000
```

## 트러블슈팅

### 빌드 실패 시
- Node.js 버전 확인 (20 권장)
- Python 버전 확인 (3.11 권장)

### 앱 접속 안될 때
- Port 8000 설정 확인
- Health check 엔드포인트: `/api/health`
