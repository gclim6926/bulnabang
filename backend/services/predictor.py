"""
예측 서비스
- 입력 지표를 기반으로 출력 지표 예측
"""

from typing import Dict, List, Optional
from datetime import datetime
import json
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"


class Predictor:
    """출력 지표 예측"""

    def __init__(self):
        self.predictions_dir = DATA_DIR / "predictions"
        self.model = None  # TODO: 실제 모델 로드

    def predict(self, input_data: Dict[str, float]) -> Dict[str, float]:
        """
        입력 지표 데이터를 받아 출력 지표 예측

        Args:
            input_data: {지표명: 값, ...}

        Returns:
            예측된 출력 지표 {지표명: 예측값, ...}
        """
        # TODO: 실제 예측 모델 구현
        # 현재는 placeholder
        return {
            "predicted_value": 0.0,
            "confidence": 0.0
        }

    def save_prediction(self, date: str, prediction: Dict, actual: Optional[Dict] = None):
        """예측 결과 저장"""
        filepath = self.predictions_dir / f"{date}.json"

        data = {
            "date": date,
            "prediction": prediction,
            "actual": actual,
            "score": self.calculate_score(prediction, actual) if actual else None,
            "timestamp": datetime.now().isoformat()
        }

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def calculate_score(self, prediction: Dict, actual: Dict) -> float:
        """
        예측 점수 계산

        평가 방법:
        - 100% 정확 = 100점
        - N% 오차 = 100 - (N × 10) 점
        """
        if not prediction or not actual:
            return 0.0

        # TODO: 실제 점수 계산 로직 구현
        # 예시: 예측값과 실제값의 차이(%)를 기반으로 계산
        return 100.0  # placeholder

    def get_history(self, days: int = 30) -> List[Dict]:
        """과거 예측 기록 조회"""
        predictions = []
        for filepath in sorted(self.predictions_dir.glob("*.json"))[-days:]:
            with open(filepath, "r", encoding="utf-8") as f:
                predictions.append(json.load(f))
        return predictions
