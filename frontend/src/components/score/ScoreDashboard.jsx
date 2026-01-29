import React, { useState, useEffect } from 'react'

function ScoreDashboard() {
  const [todayScore, setTodayScore] = useState(null)
  const [history, setHistory] = useState([])

  // TODO: API 연동
  useEffect(() => {
    // 임시 데이터
    setTodayScore({
      date: new Date().toISOString().split('T')[0],
      score: 85.5,
      isPerfect: false
    })

    setHistory([
      { date: '2026-01-28', score: 92.3 },
      { date: '2026-01-27', score: 100.0 },
      { date: '2026-01-26', score: 78.5 },
      { date: '2026-01-25', score: 88.0 },
    ])
  }, [])

  return (
    <div>
      {/* 오늘의 점수 */}
      <div className={`score-card ${todayScore?.isPerfect ? 'perfect' : ''}`}>
        <h2 style={{ marginBottom: '10px', opacity: 0.9 }}>오늘의 점수</h2>
        <div className="score-value">
          {todayScore?.score ?? '—'}
          <span style={{ fontSize: '24px' }}>점</span>
        </div>
        <p style={{ marginTop: '10px', opacity: 0.8 }}>
          {todayScore?.isPerfect ? '🎉 완벽한 예측!' : '목표: 100점'}
        </p>
      </div>

      {/* 점수 히스토리 */}
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>📅 최근 기록</h3>
        <div className="grid grid-2">
          {history.map((item) => (
            <div key={item.date} className="indicator-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ opacity: 0.7 }}>{item.date}</span>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: item.score === 100 ? '#00b894' : item.score >= 90 ? '#f7931e' : '#ff6b35'
                }}>
                  {item.score}점
                  {item.score === 100 && ' 🎯'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScoreDashboard
