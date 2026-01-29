"""
🔥🦋 불나방 (BulNaBang) - Backend Server
주식 예측의 신
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn

app = FastAPI(
    title="불나방 API",
    description="주식 예측의 신 - 입력 지표 기반 출력 지표 예측",
    version="0.2.0"
)

# CORS 설정 (Frontend 연동용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Koyeb 배포 시 모든 origin 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API 라우터 추가
from api.routes import router as api_router
app.include_router(api_router, prefix="/api")


@app.get("/api/health")
async def health():
    return {"status": "alive", "score": "목표: 100점"}


# 정적 파일 서빙 (Production 환경)
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")

    @app.get("/")
    async def serve_root():
        return FileResponse(os.path.join(static_dir, "index.html"))

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # API 경로가 아니면 SPA의 index.html 반환
        file_path = os.path.join(static_dir, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(static_dir, "index.html"))
else:
    # 개발 환경 - Frontend 별도 실행
    @app.get("/")
    async def root():
        return {
            "name": "🔥🦋 불나방",
            "description": "주식 예측의 신",
            "goal": "매일 100점 달성",
            "frontend": "http://localhost:3000"
        }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
