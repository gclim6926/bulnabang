"""
🔥🦋 불나방 (BulNaBang) - Backend Server
주식 예측의 신
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="불나방 API",
    description="주식 예측의 신 - 입력 지표 기반 출력 지표 예측",
    version="0.1.0"
)

# CORS 설정 (Frontend 연동용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "name": "🔥🦋 불나방",
        "description": "주식 예측의 신",
        "goal": "매일 100점 달성"
    }


@app.get("/health")
async def health():
    return {"status": "alive", "score": "목표: 100점"}


# TODO: API 라우터 추가
# from api.routes import router as api_router
# app.include_router(api_router, prefix="/api")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
