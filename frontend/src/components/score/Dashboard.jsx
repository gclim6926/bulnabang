import React, { useState } from 'react'

// 오늘의 주요 입력 지표
const todayInputs = [
  { name: 'KOSPI', value: 2534.72, change: 1.23 },
  { name: 'USD/KRW', value: 1345.20, change: 0.32 },
  { name: 'BTC', value: 98450, change: 2.45 },
  { name: 'WTI', value: 78.45, change: -1.23 },
  { name: 'VIX', value: 15.45, change: -3.2 },
  { name: '외국인', value: 234.5, change: 45.2 }
]

// 최근 예측 기록
const recentPredictions = [
  { date: '2026-01-29', predicted: 2545.00, actual: null, score: null },
  { date: '2026-01-28', predicted: 2530.50, actual: 2534.72, score: 98.3 },
  { date: '2026-01-27', predicted: 2520.00, actual: 2518.45, score: 99.4 },
  { date: '2026-01-26', predicted: 2550.00, actual: 2512.30, score: 85.0 },
  { date: '2026-01-25', predicted: 2480.00, actual: 2495.60, score: 93.7 },
]

function Dashboard() {
  const [selectedModel] = useState('Claude')

  // 오늘의 예측
  const todayPrediction = recentPredictions[0]

  // 통계 계산
  const completedPredictions = recentPredictions.filter(p => p.score !== null)
  const avgScore = completedPredictions.length > 0
    ? (completedPredictions.reduce((sum, p) => sum + p.score, 0) / completedPredictions.length).toFixed(1)
    : 0
  const perfectCount = completedPredictions.filter(p => p.score >= 99).length

  return (
    <div>
      {/* 상단 요약 카드들 */}
      <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
        {/* 오늘의 예측 */}
        <div className="dashboard-item col-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{
              padding: '8px 12px',
              background: 'rgba(0, 212, 255, 0.2)',
              borderRadius: '8px',
              color: 'var(--accent)',
              fontSize: '12px',
              fontWeight: 600
            }}>
              🔮 오늘의 예측
            </span>
            <span style={{ opacity: 0.5, fontSize: '13px' }}>{todayPrediction.date}</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', opacity: 0.6, marginBottom: '8px' }}>KOSPI 종가 예측</div>
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '42px',
              fontWeight: 700,
              color: 'var(--accent)',
              textShadow: '0 0 30px rgba(0, 212, 255, 0.3)'
            }}>
              {todayPrediction.predicted.toLocaleString()}
            </div>
            <div style={{
              marginTop: '15px',
              padding: '10px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '10px',
              fontSize: '13px'
            }}>
              <span style={{ opacity: 0.7 }}>사용 모델: </span>
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{selectedModel}</span>
            </div>
          </div>
        </div>

        {/* 어제 결과 */}
        <div className="dashboard-item col-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{
              padding: '8px 12px',
              background: 'rgba(0, 184, 148, 0.2)',
              borderRadius: '8px',
              color: 'var(--success)',
              fontSize: '12px',
              fontWeight: 600
            }}>
              ✓ 어제 결과
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '6px' }}>예측</div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--accent)' }}>
                {recentPredictions[1].predicted.toLocaleString()}
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '6px' }}>실제</div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--success)' }}>
                {recentPredictions[1].actual.toLocaleString()}
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '15px',
            textAlign: 'center',
            padding: '15px',
            background: recentPredictions[1].score >= 95
              ? 'linear-gradient(135deg, rgba(0, 184, 148, 0.2) 0%, rgba(0, 206, 201, 0.1) 100%)'
              : 'rgba(255, 107, 53, 0.1)',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '4px' }}>점수</div>
            <div style={{
              fontSize: '32px',
              fontWeight: 700,
              color: recentPredictions[1].score >= 95 ? 'var(--success)' : 'var(--primary)'
            }}>
              {recentPredictions[1].score}점
            </div>
          </div>
        </div>

        {/* 주간 통계 */}
        <div className="dashboard-item col-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{
              padding: '8px 12px',
              background: 'rgba(255, 107, 53, 0.2)',
              borderRadius: '8px',
              color: 'var(--primary)',
              fontSize: '12px',
              fontWeight: 600
            }}>
              📊 주간 통계
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '6px' }}>평균 점수</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--secondary)' }}>
                {avgScore}
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '6px' }}>완벽 예측</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--success)' }}>
                {perfectCount}회
              </div>
            </div>
          </div>

          {/* 미니 점수 바 */}
          <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {completedPredictions.slice(0, 5).reverse().map((p, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: '8px',
                    borderRadius: '4px',
                    background: p.score >= 99 ? 'var(--success)' :
                               p.score >= 90 ? 'var(--secondary)' :
                               'var(--danger)'
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: '11px', opacity: 0.5, marginTop: '6px', textAlign: 'center' }}>
              최근 5일 성적
            </div>
          </div>
        </div>
      </div>

      {/* 주요 입력 지표 현황 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h3 className="card-title">
            <span className="card-title-icon">📥</span>
            주요 입력 지표 현황
          </h3>
          <span style={{ opacity: 0.5, fontSize: '13px' }}>실시간 업데이트</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          {todayInputs.map(input => (
            <div
              key={input.name}
              style={{
                padding: '16px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '6px' }}>{input.name}</div>
              <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                {typeof input.value === 'number' && input.value > 1000
                  ? input.value.toLocaleString()
                  : input.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: input.change >= 0 ? 'var(--success)' : 'var(--danger)'
              }}>
                {input.change >= 0 ? '▲' : '▼'} {Math.abs(input.change)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 예측 vs 실제 비교 테이블 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <span className="card-title-icon">📋</span>
            예측 vs 실제 비교
          </h3>
        </div>

        <table className="comparison-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>예측값</th>
              <th>실제값</th>
              <th>오차</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            {recentPredictions.map(record => {
              const error = record.actual
                ? ((record.predicted - record.actual) / record.actual * 100).toFixed(2)
                : null

              return (
                <tr key={record.date}>
                  <td style={{ fontWeight: 600 }}>
                    {record.date}
                    {!record.actual && (
                      <span style={{
                        marginLeft: '8px',
                        padding: '2px 6px',
                        background: 'rgba(0, 212, 255, 0.2)',
                        borderRadius: '4px',
                        fontSize: '10px',
                        color: 'var(--accent)'
                      }}>
                        TODAY
                      </span>
                    )}
                  </td>
                  <td className="predicted-value">{record.predicted.toLocaleString()}</td>
                  <td className="actual-value">
                    {record.actual ? record.actual.toLocaleString() : (
                      <span style={{ opacity: 0.4 }}>대기중...</span>
                    )}
                  </td>
                  <td className={`diff-value ${error && Math.abs(parseFloat(error)) < 1 ? 'good' : error ? 'bad' : ''}`}>
                    {error ? `${error > 0 ? '+' : ''}${error}%` : '-'}
                  </td>
                  <td>
                    {record.score !== null ? (
                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '15px',
                        background: record.score >= 99 ? 'rgba(0, 184, 148, 0.2)' :
                                   record.score >= 90 ? 'rgba(247, 147, 30, 0.2)' :
                                   'rgba(255, 118, 117, 0.2)',
                        color: record.score >= 99 ? 'var(--success)' :
                               record.score >= 90 ? 'var(--secondary)' :
                               'var(--danger)'
                      }}>
                        {record.score}점
                        {record.score >= 99 && ' 🎯'}
                      </span>
                    ) : (
                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        background: 'rgba(0, 212, 255, 0.1)',
                        color: 'var(--accent)',
                        fontSize: '13px'
                      }}>
                        ⏳ 대기중
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 예측 실행 버튼 */}
      <div style={{
        marginTop: '24px',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.05) 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 107, 53, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h4 style={{ marginBottom: '6px' }}>🚀 오늘의 예측 실행</h4>
          <p style={{ opacity: 0.6, fontSize: '14px' }}>
            18개 입력 지표 기반, Claude 모델로 KOSPI 종가를 예측합니다
          </p>
        </div>
        <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
          🎯 예측 시작
        </button>
      </div>
    </div>
  )
}

export default Dashboard
