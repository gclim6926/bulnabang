"""
데이터 수집 서비스
- API를 통해 지표 데이터 가져오기
- CSV 파일 읽기/쓰기
"""

import pandas as pd
from pathlib import Path
from typing import Optional, List, Dict
from datetime import datetime

DATA_DIR = Path(__file__).parent.parent / "data"


class DataFetcher:
    """입력/출력 지표 데이터 수집 및 관리"""

    def __init__(self):
        self.inputs_dir = DATA_DIR / "inputs"
        self.outputs_dir = DATA_DIR / "outputs"

    def load_csv(self, filename: str, is_input: bool = True) -> Optional[pd.DataFrame]:
        """CSV 파일 로드"""
        directory = self.inputs_dir if is_input else self.outputs_dir
        filepath = directory / filename

        if filepath.exists():
            return pd.read_csv(filepath)
        return None

    def save_csv(self, df: pd.DataFrame, filename: str, is_input: bool = True):
        """CSV 파일 저장"""
        directory = self.inputs_dir if is_input else self.outputs_dir
        filepath = directory / filename
        df.to_csv(filepath, index=False)

    def list_indicators(self, is_input: bool = True) -> List[str]:
        """저장된 지표 목록 조회"""
        directory = self.inputs_dir if is_input else self.outputs_dir
        return [f.stem for f in directory.glob("*.csv")]

    async def fetch_from_api(self, url: str, params: Dict = None) -> Optional[Dict]:
        """외부 API에서 데이터 가져오기 (구현 예정)"""
        # TODO: httpx를 사용한 API 호출 구현
        pass

    def get_latest_data(self, indicator: str, is_input: bool = True) -> Optional[Dict]:
        """특정 지표의 최신 데이터 조회"""
        df = self.load_csv(f"{indicator}.csv", is_input)
        if df is not None and len(df) > 0:
            return df.iloc[-1].to_dict()
        return None
