import React, { useState } from 'react'

// 18가지 대표 입력 지표 (중요도 순)
const defaultIndicators = [
  {
    id: 1,
    name: 'KOSPI 지수',
    value: 2534.72,
    change: 1.23,
    source: 'KRX',
    category: '주가지수',
    description: '한국 대표 주가지수',
    active: true
  },
  {
    id: 2,
    name: 'KOSDAQ 지수',
    value: 842.15,
    change: -0.54,
    source: 'KRX',
    category: '주가지수',
    description: '코스닥 시장 지수',
    active: true
  },
  {
    id: 3,
    name: '거래량 (KOSPI)',
    value: 456780000,
    change: 12.5,
    source: 'KRX',
    category: '거래',
    description: '일일 총 거래량',
    active: true
  },
  {
    id: 4,
    name: 'USD/KRW 환율',
    value: 1345.20,
    change: 0.32,
    source: '한국은행',
    category: '환율',
    description: '달러/원 환율',
    active: true
  },
  {
    id: 5,
    name: 'EUR/KRW 환율',
    value: 1456.80,
    change: -0.15,
    source: '한국은행',
    category: '환율',
    description: '유로/원 환율',
    active: true
  },
  {
    id: 6,
    name: 'JPY/KRW 환율',
    value: 896.45,
    change: 0.08,
    source: '한국은행',
    category: '환율',
    description: '엔/원 환율',
    active: true
  },
  {
    id: 7,
    name: 'Bitcoin (BTC)',
    value: 98450.00,
    change: 2.45,
    source: 'Binance',
    category: '암호화폐',
    description: '비트코인 가격 (USD)',
    active: true
  },
  {
    id: 8,
    name: 'Ethereum (ETH)',
    value: 3245.80,
    change: 1.87,
    source: 'Binance',
    category: '암호화폐',
    description: '이더리움 가격 (USD)',
    active: true
  },
  {
    id: 9,
    name: 'WTI 원유',
    value: 78.45,
    change: -1.23,
    source: 'NYMEX',
    category: '원자재',
    description: '서부텍사스 원유 선물',
    active: true
  },
  {
    id: 10,
    name: '금 (Gold)',
    value: 2045.30,
    change: 0.56,
    source: 'COMEX',
    category: '원자재',
    description: '금 선물 가격 (USD/oz)',
    active: true
  },
  {
    id: 11,
    name: '구리 (Copper)',
    value: 4.12,
    change: -0.34,
    source: 'COMEX',
    category: '원자재',
    description: '구리 선물 가격',
    active: true
  },
  {
    id: 12,
    name: 'M2 통화량',
    value: 3890.5,
    change: 0.12,
    source: '한국은행',
    category: '통화',
    description: '광의통화 (조원)',
    active: true
  },
  {
    id: 13,
    name: '기준금리',
    value: 3.50,
    change: 0,
    source: '한국은행',
    category: '금리',
    description: '한국 기준금리 (%)',
    active: true
  },
  {
    id: 14,
    name: '미국 10년물 국채',
    value: 4.25,
    change: 0.03,
    source: 'Treasury',
    category: '금리',
    description: '미국 국채 수익률 (%)',
    active: true
  },
  {
    id: 15,
    name: '무역수지',
    value: 4.8,
    change: -2.1,
    source: '관세청',
    category: '무역',
    description: '월간 무역수지 (십억달러)',
    active: true
  },
  {
    id: 16,
    name: '수출액',
    value: 56.2,
    change: 5.3,
    source: '관세청',
    category: '무역',
    description: '월간 수출액 (십억달러)',
    active: true
  },
  {
    id: 17,
    name: 'VIX 지수',
    value: 15.45,
    change: -3.2,
    source: 'CBOE',
    category: '변동성',
    description: '공포지수 (변동성)',
    active: true
  },
  {
    id: 18,
    name: '외국인 순매수',
    value: 234.5,
    change: 45.2,
    source: 'KRX',
    category: '투자자',
    description: '외국인 순매수 (십억원)',
    active: true
  }
]

function InputIndicators() {
  const [indicators, setIndicators] = useState(defaultIndicators)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newIndicator, setNewIndicator] = useState({
    name: '',
    source: '',
    category: '',
    description: ''
  })

  const toggleIndicator = (id) => {
    setIndicators(indicators.map(ind =>
      ind.id === id ? { ...ind, active: !ind.active } : ind
    ))
  }

  const handleAddIndicator = () => {
    if (!newIndicator.name) return

    const newId = Math.max(...indicators.map(i => i.id)) + 1
    setIndicators([
      {
        id: newId,
        ...newIndicator,
        value: 0,
        change: 0,
        active: true
      },
      ...indicators
    ])
    setNewIndicator({ name: '', source: '', category: '', description: '' })
    setShowAddModal(false)
  }

  const formatValue = (value) => {
    if (value >= 1000000000) return (value / 1000000000).toFixed(2) + 'B'
    if (value >= 1000000) return (value / 1000000).toFixed(2) + 'M'
    if (value >= 1000) return value.toLocaleString()
    return value.toFixed(2)
  }

  const activeCount = indicators.filter(i => i.active).length

  return (
    <div>
      {/* 액션 바 */}
      <div className="action-bar">
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          ➕ 새 지표 추가
        </button>
        <button className="btn btn-accent">
          🔄 지표 업데이트
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ opacity: 0.6 }}>활성 지표:</span>
          <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{activeCount} / {indicators.length}</span>
        </div>
      </div>

      {/* 지표 그리드 */}
      <div className="indicator-grid">
        {indicators.map((indicator, index) => (
          <div
            key={indicator.id}
            className={`indicator-item ${indicator.active ? 'active' : ''}`}
            onClick={() => toggleIndicator(indicator.id)}
          >
            <div className={`indicator-rank ${index < 3 ? 'top3' : ''}`}>
              #{index + 1}
            </div>
            <div className="indicator-name">{indicator.name}</div>
            <div className="indicator-value">
              {formatValue(indicator.value)}
            </div>
            <div className={`indicator-change ${indicator.change >= 0 ? 'up' : 'down'}`}>
              {indicator.change >= 0 ? '▲' : '▼'} {Math.abs(indicator.change)}%
            </div>
            <div className="indicator-source">
              {indicator.category} · {indicator.source}
            </div>
          </div>
        ))}
      </div>

      {/* 지표 추가 모달 */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
            <div className="card-header">
              <h3 className="card-title">
                <span className="card-title-icon">➕</span>
                새 입력 지표 추가
              </h3>
              <button
                className="btn btn-icon btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="text"
                placeholder="지표 이름"
                value={newIndicator.name}
                onChange={e => setNewIndicator({ ...newIndicator, name: e.target.value })}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontSize: '15px'
                }}
              />
              <input
                type="text"
                placeholder="데이터 소스 (예: KRX, 한국은행)"
                value={newIndicator.source}
                onChange={e => setNewIndicator({ ...newIndicator, source: e.target.value })}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontSize: '15px'
                }}
              />
              <select
                value={newIndicator.category}
                onChange={e => setNewIndicator({ ...newIndicator, category: e.target.value })}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontSize: '15px'
                }}
              >
                <option value="">카테고리 선택</option>
                <option value="주가지수">주가지수</option>
                <option value="환율">환율</option>
                <option value="암호화폐">암호화폐</option>
                <option value="원자재">원자재</option>
                <option value="통화">통화</option>
                <option value="금리">금리</option>
                <option value="무역">무역</option>
                <option value="변동성">변동성</option>
                <option value="투자자">투자자</option>
                <option value="기타">기타</option>
              </select>
              <input
                type="text"
                placeholder="설명"
                value={newIndicator.description}
                onChange={e => setNewIndicator({ ...newIndicator, description: e.target.value })}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontSize: '15px'
                }}
              />

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setShowAddModal(false)}
                >
                  취소
                </button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={handleAddIndicator}
                >
                  추가하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InputIndicators
