import React, { useState } from 'react'

function PredictionPanel() {
  const [inputData, setInputData] = useState({
    '거래량': '',
    'RSI': ''
  })
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePredict = async () => {
    setIsLoading(true)

    // TODO: 실제 API 호출
    setTimeout(() => {
      setPrediction({
        date: new Date().toISOString().split('T')[0],
        predictions: {
          '종가': 52350
        },
        confidence: 87.5
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div>
      {/* 입력 데이터 */}
      <div className="indicator-card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>📥 오늘의 입력 지표</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {Object.keys(inputData).map(key => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <label style={{ width: '100px', opacity: 0.8 }}>{key}</label>
              <input
                type="number"
                value={inputData[key]}
                onChange={e => setInputData({ ...inputData, [key]: e.target.value })}
                placeholder="값 입력"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white'
                }}
              />
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary"
          style={{ marginTop: '20px', width: '100%' }}
          onClick={handlePredict}
          disabled={isLoading}
        >
          {isLoading ? '🔄 예측 중...' : '🎯 예측하기'}
        </button>
      </div>

      {/* 예측 결과 */}
      {prediction && (
        <div className="score-card" style={{ background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)' }}>
          <h3 style={{ marginBottom: '20px', opacity: 0.9 }}>🔮 예측 결과</h3>

          <div style={{ marginBottom: '20px' }}>
            {Object.entries(prediction.predictions).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '10px' }}>
                <span style={{ opacity: 0.8 }}>{key}: </span>
                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>
                  {value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '10px',
            padding: '15px',
            marginTop: '15px'
          }}>
            <span style={{ opacity: 0.8 }}>신뢰도: </span>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {prediction.confidence}%
            </span>
          </div>
        </div>
      )}

      {/* 예측 히스토리 */}
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>📜 최근 예측 기록</h3>
        <div className="indicator-card">
          <p style={{ opacity: 0.6, textAlign: 'center' }}>
            아직 예측 기록이 없습니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PredictionPanel
