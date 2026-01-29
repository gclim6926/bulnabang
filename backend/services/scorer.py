"""
점수 계산 서비스
- 예측 정확도 기반 점수 산출
- 목표: 매일 100점!
"""

from typing import Dict, Optional
from dataclasses import dataclass


@dataclass
class ScoreResult:
    """점수 결과"""
    score: float
    error_percent: float
    is_perfect: bool
    details: Dict


class Scorer:
    """
    점수 계산기

    평가 방법:
    - 100% 정확: 100점 (만점)
    - N% 오차: 100 - (N × 10) 점

    예시:
    - 0% 오차 → 100점
    - 1% 오차 → 90점
    - 5% 오차 → 50점
    - 10% 이상 오차 → 0점
    """

    PENALTY_MULTIPLIER = 10  # 1% 오차당 10점 감점

    def calculate(self, predicted: float, actual: float) -> ScoreResult:
        """
        단일 값 점수 계산

        Args:
            predicted: 예측값
            actual: 실제값

        Returns:
            ScoreResult 객체
        """
        if actual == 0:
            error_percent = 100.0 if predicted != 0 else 0.0
        else:
            error_percent = abs((predicted - actual) / actual) * 100

        # 점수 계산: 100 - (오차% × 10)
        score = max(0, 100 - (error_percent * self.PENALTY_MULTIPLIER))

        return ScoreResult(
            score=round(score, 2),
            error_percent=round(error_percent, 4),
            is_perfect=(score == 100),
            details={
                "predicted": predicted,
                "actual": actual,
                "penalty_multiplier": self.PENALTY_MULTIPLIER
            }
        )

    def calculate_multi(self, predictions: Dict[str, float], actuals: Dict[str, float]) -> Dict:
        """
        여러 지표에 대한 점수 계산

        Returns:
            {
                "total_score": 평균 점수,
                "individual_scores": {지표별 점수},
                "is_perfect": 모두 100점인지
            }
        """
        scores = {}
        for key in predictions:
            if key in actuals:
                result = self.calculate(predictions[key], actuals[key])
                scores[key] = result

        if not scores:
            return {"total_score": 0, "individual_scores": {}, "is_perfect": False}

        total_score = sum(s.score for s in scores.values()) / len(scores)

        return {
            "total_score": round(total_score, 2),
            "individual_scores": {k: v.score for k, v in scores.items()},
            "is_perfect": all(s.is_perfect for s in scores.values())
        }
