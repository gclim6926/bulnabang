# 🔥🦋 불나방 - Render.com 배포 가이드

## 방법 1: Blueprint (자동 - 권장)

1. [Render Dashboard](https://dashboard.render.com) 접속
2. **New** → **Blueprint** 클릭
3. GitHub repo 연결: `gclim6926/bulnabang`
4. `render.yaml` 자동 감지됨
5. **Apply** 클릭

---

## 방법 2: 수동 설정

1. [Render Dashboard](https://dashboard.render.com) 접속
2. **New** → **Web Service** 클릭
3. GitHub repo 연결: `gclim6926/bulnabang`

### 설정값:

| 항목 | 값 |
|------|-----|
| Name | `bulnabang` |
| Environment | **Docker** |
| Dockerfile Path | `./Dockerfile` |
| Instance Type | Free (또는 원하는 플랜) |

### 환경 변수:
```
PORT=8000
```

4. **Create Web Service** 클릭

---

## 배포 후 확인

- 앱 URL: `https://bulnabang.onrender.com`
- API 문서: `https://bulnabang.onrender.com/docs`
- Health: `https://bulnabang.onrender.com/api/health`

---

## 주의사항

### Free 플랜 제한
- 15분 비활성시 슬립 모드 (첫 요청 시 30초 대기)
- 월 750시간 무료

### 슬립 방지 (선택)
UptimeRobot 등으로 5분마다 `/api/health` 핑

---

## 트러블슈팅

### 빌드 실패
- Dockerfile 경로 확인: `./Dockerfile`
- 로그에서 에러 확인

### 502 Bad Gateway
- Port 8000 설정 확인
- Health check 경로: `/api/health`
