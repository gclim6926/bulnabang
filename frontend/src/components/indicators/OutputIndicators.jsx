import React, { useState } from 'react'

// 최근 7일 점수 기록
const scoreHistory = [
  { date: '2026-01-29', predicted: 2545.00, actual: null, score: null, status: 'pending' },
  { date: '2026-01-28', predicted: 2530.50, actual: 2534.72, score: 98.3, status: 'complete' },
  { date: '2026-01-27', predicted: 2520.00, actual: 2518.45, score: 99.4, status: 'complete' },
  { date: '2026-01-26', predicted: 2550.00, actual: 2512.30, score: 85.0, status: 'complete' },
  { date: '2026-01-25', predicted: 2480.00, actual: 2495.60, score: 93.7, status: 'complete' },
  { date: '2026-01-24', predicted: 2500.00, actual: 2502.10, score: 99.2, status: 'complete' },
  { date: '2026-01-23', predicted: 2490.00, actual: 2478.50, score: 95.4, status: 'complete' },
]

function OutputIndicators() {
  const [outputTarget, setOutputTarget] = useState('kospi')

  // 평균 점수 계산
  const completedScores = scoreHistory.filter(s => s.score !== null)
  const avgScore = completedScores.length > 0
    ? (completedScores.reduce((sum, s) => sum + s.score, 0) / completedScores.length).toFixed(1)
    : 0

  // 100점 횟수
  const perfectCount = completedScores.filter(s => s.score >= 99).length

  return (
    <div>
      {/* 평가 방법 설명 카드 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h3 className="card-title">
            <span className="card-title-icon">📋</span>
            평가 방법
          </h3>
        </div>

        <div style={{
          background: 'rgba(255, 107, 53, 0.1)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px'
        }}>
          <h4 style={{ marginBottom: '15px', color: 'var(--primary)' }}>🎯 목표: 매일 100점 달성</h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>기준</div>
              <div style={{ fontSize: '18px', fontWeight: 600 }}>예측값 vs 실제값</div>
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>만점</div>
              <div style={{ fontSize: '18px', fontWeight: 600 }}>100% 정확 = 100점</div>
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>감점 기준</div>
              <div style={{ fontSize: '18px', fontWeight: 600 }}>1% 오차 = -10점</div>
            </div>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '16px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '12px',
            fontFamily: 'Orbitron, monospace',
            textAlign: 'center'
          }}>
            <span style={{ opacity: 0.7 }}>점수 공식: </span>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
              Score = 100 - (오차% × 10)
            </span>
          </div>
        </div>

        {/* 출력 지표 선택 */}
        <h4 style={{ marginBottom: '15px' }}>📤 출력 지표 설정</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { id: 'kospi', name: 'KOSPI 종가', icon: '📈' },
            { id: 'kosdaq', name: 'KOSDAQ 종가', icon: '📊' },
            { id: 'direction', name: '등락 방향', icon: '↕️' },
            { id: 'volume', name: '거래량', icon: '📦' }
          ].map(target => (
            <button
              key={target.id}
              className={`btn ${outputTarget === target.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setOutputTarget(target.id)}
            >
              {target.icon} {target.name}
            </button>
          ))}
        </div>
      </div>

      {/* 점수 요약 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div className="score-display">
          <div className="score-label">평균 점수</div>
          <div className={`score-value ${parseFloat(avgScore) >= 95 ? 'perfect' : ''}`}>
            {avgScore}<span className="score-unit">점</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
          <div style={{ fontSize: '14px', opacity: 0.6, marginBottom: '8px' }}>완벽 예측 (99점+)</div>
          <div style={{ fontSize: '48px', fontWeight: 700, color: 'var(--success)' }}>
            {perfectCount}<span style={{ fontSize: '20px', opacity: 0.7 }}> / {completedScores.length}</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
          <div style={{ fontSize: '14px', opacity: 0.6, marginBottom: '8px' }}>연속 예측 일수</div>
          <div style={{ fontSize: '48px', fontWeight: 700, color: 'var(--accent)' }}>
            {completedScores.length}<span style={{ fontSize: '20px', opacity: 0.7 }}>일</span>
          </div>
        </div>
      </div>

      {/* 일별 점수 테이블 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <span className="card-title-icon">📅</span>
            일별 점수 기록
          </h3>
          <button className="btn btn-secondary">
            📥 CSV 다운로드
          </button>
        </div>

        <table className="comparison-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>예측값</th>
              <th>실제값</th>
              <th>오차</th>
              <th>점수</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {scoreHistory.map(record => {
              const error = record.actual
                ? Math.abs((record.predicted - record.actual) / record.actual * 100).toFixed(2)
                : null

              return (
                <tr key={record.date}>
                  <td style={{ fontWeight: 600 }}>{record.date}</td>
                  <td className="predicted-value">{record.predicted.toLocaleString()}</td>
                  <td className="actual-value">
                    {record.actual ? record.actual.toLocaleString() : '-'}
                  </td>
                  <td className={`diff-value ${error && parseFloat(error) < 1 ? 'good' : 'bad'}`}>
                    {error ? `${error}%` : '-'}
                  </td>
                  <td>
                    {record.score !== null ? (
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        background: record.score >= 99 ? 'rgba(0, 184, 148, 0.2)' :
                                   record.score >= 90 ? 'rgba(247, 147, 30, 0.2)' :
                                   'rgba(255, 118, 117, 0.2)',
                        color: record.score >= 99 ? 'var(--success)' :
                               record.score >= 90 ? 'var(--secondary)' :
                               'var(--danger)'
                      }}>
                        {record.score}점
                      </span>
                    ) : '-'}
                  </td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      background: record.status === 'pending' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 184, 148, 0.2)',
                      color: record.status === 'pending' ? 'var(--accent)' : 'var(--success)'
                    }}>
                      {record.status === 'pending' ? '⏳ 대기중' : '✓ 완료'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OutputIndicators
