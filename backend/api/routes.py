"""
API 라우트 정의
"""

from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import date

router = APIRouter()


# ============== Models ==============

class Indicator(BaseModel):
    """지표 정보"""
    name: str
    description: Optional[str] = None
    source: Optional[str] = None  # "api" or "csv"
    api_url: Optional[str] = None


class PredictionRequest(BaseModel):
    """예측 요청"""
    date: str
    input_data: Dict[str, float]


class PredictionResponse(BaseModel):
    """예측 응답"""
    date: str
    predictions: Dict[str, float]
    confidence: float


class ScoreResponse(BaseModel):
    """점수 응답"""
    date: str
    score: float
    is_perfect: bool
    details: Dict


# ============== 입력 지표 API ==============

@router.get("/indicators/input", tags=["Indicators"])
async def list_input_indicators():
    """입력 지표 목록 조회"""
    # TODO: 실제 구현
    return {"indicators": []}


@router.post("/indicators/input", tags=["Indicators"])
async def add_input_indicator(indicator: Indicator):
    """입력 지표 추가"""
    # TODO: 실제 구현
    return {"message": f"입력 지표 '{indicator.name}' 추가됨"}


@router.delete("/indicators/input/{name}", tags=["Indicators"])
async def delete_input_indicator(name: str):
    """입력 지표 삭제"""
    # TODO: 실제 구현
    return {"message": f"입력 지표 '{name}' 삭제됨"}


# ============== 출력 지표 API ==============

@router.get("/indicators/output", tags=["Indicators"])
async def list_output_indicators():
    """출력 지표 목록 조회"""
    # TODO: 실제 구현
    return {"indicators": []}


@router.post("/indicators/output", tags=["Indicators"])
async def add_output_indicator(indicator: Indicator):
    """출력 지표 추가"""
    # TODO: 실제 구현
    return {"message": f"출력 지표 '{indicator.name}' 추가됨"}


@router.delete("/indicators/output/{name}", tags=["Indicators"])
async def delete_output_indicator(name: str):
    """출력 지표 삭제"""
    # TODO: 실제 구현
    return {"message": f"출력 지표 '{name}' 삭제됨"}


# ============== 데이터 업로드 API ==============

@router.post("/data/upload", tags=["Data"])
async def upload_csv(file: UploadFile = File(...), is_input: bool = True):
    """CSV 파일 업로드"""
    # TODO: 실제 구현
    return {"message": f"파일 '{file.filename}' 업로드됨"}


@router.post("/data/fetch", tags=["Data"])
async def fetch_today_data():
    """오늘의 데이터 API에서 가져오기"""
    # TODO: 실제 구현
    return {"message": "데이터 수집 완료"}


# ============== 예측 API ==============

@router.post("/predict", tags=["Prediction"], response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """출력 지표 예측"""
    # TODO: 실제 구현
    return PredictionResponse(
        date=request.date,
        predictions={"placeholder": 0.0},
        confidence=0.0
    )


@router.get("/predictions/history", tags=["Prediction"])
async def get_prediction_history(days: int = 30):
    """예측 기록 조회"""
    # TODO: 실제 구현
    return {"history": []}


# ============== 점수 API ==============

@router.get("/score/today", tags=["Score"], response_model=ScoreResponse)
async def get_today_score():
    """오늘의 점수 조회"""
    # TODO: 실제 구현
    return ScoreResponse(
        date=str(date.today()),
        score=0.0,
        is_perfect=False,
        details={}
    )


@router.get("/score/history", tags=["Score"])
async def get_score_history(days: int = 30):
    """점수 기록 조회"""
    # TODO: 실제 구현
    return {"history": []}
