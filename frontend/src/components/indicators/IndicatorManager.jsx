import React, { useState } from 'react'

function IndicatorManager() {
  const [inputIndicators, setInputIndicators] = useState([
    { name: '거래량', source: 'api', description: '일별 거래량' },
    { name: 'RSI', source: 'csv', description: '상대강도지수' },
  ])

  const [outputIndicators, setOutputIndicators] = useState([
    { name: '종가', source: 'api', description: '당일 종가' },
  ])

  const [newIndicator, setNewIndicator] = useState({ name: '', description: '', source: 'api' })
  const [isAddingInput, setIsAddingInput] = useState(true)

  const handleAdd = () => {
    if (!newIndicator.name) return

    if (isAddingInput) {
      setInputIndicators([...inputIndicators, newIndicator])
    } else {
      setOutputIndicators([...outputIndicators, newIndicator])
    }

    setNewIndicator({ name: '', description: '', source: 'api' })
  }

  const handleDelete = (name, isInput) => {
    if (isInput) {
      setInputIndicators(inputIndicators.filter(i => i.name !== name))
    } else {
      setOutputIndicators(outputIndicators.filter(i => i.name !== name))
    }
  }

  const IndicatorCard = ({ indicator, isInput }) => (
    <div className="indicator-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ marginBottom: '5px' }}>{indicator.name}</h4>
          <p style={{ opacity: 0.6, fontSize: '14px' }}>{indicator.description}</p>
          <span style={{
            display: 'inline-block',
            marginTop: '8px',
            padding: '4px 8px',
            background: indicator.source === 'api' ? 'rgba(0, 184, 148, 0.2)' : 'rgba(255, 107, 53, 0.2)',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            {indicator.source === 'api' ? '🔗 API' : '📄 CSV'}
          </span>
        </div>
        <button
          className="btn btn-secondary"
          style={{ padding: '8px 12px' }}
          onClick={() => handleDelete(indicator.name, isInput)}
        >
          🗑️
        </button>
      </div>
    </div>
  )

  return (
    <div>
      {/* 지표 추가 폼 */}
      <div className="indicator-card" style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>➕ 지표 추가</h3>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            className={`btn ${isAddingInput ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setIsAddingInput(true)}
          >
            입력 지표
          </button>
          <button
            className={`btn ${!isAddingInput ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setIsAddingInput(false)}
          >
            출력 지표
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="지표 이름"
            value={newIndicator.name}
            onChange={e => setNewIndicator({ ...newIndicator, name: e.target.value })}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              flex: 1,
              minWidth: '150px'
            }}
          />
          <input
            type="text"
            placeholder="설명"
            value={newIndicator.description}
            onChange={e => setNewIndicator({ ...newIndicator, description: e.target.value })}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              flex: 2,
              minWidth: '200px'
            }}
          />
          <select
            value={newIndicator.source}
            onChange={e => setNewIndicator({ ...newIndicator, source: e.target.value })}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white'
            }}
          >
            <option value="api">API</option>
            <option value="csv">CSV</option>
          </select>
          <button className="btn btn-primary" onClick={handleAdd}>
            추가
          </button>
        </div>
      </div>

      {/* 입력 지표 목록 */}
      <div className="grid grid-2">
        <div>
          <h3 style={{ marginBottom: '15px' }}>📥 입력 지표 ({inputIndicators.length})</h3>
          {inputIndicators.map(indicator => (
            <IndicatorCard key={indicator.name} indicator={indicator} isInput={true} />
          ))}
        </div>

        {/* 출력 지표 목록 */}
        <div>
          <h3 style={{ marginBottom: '15px' }}>📤 출력 지표 ({outputIndicators.length})</h3>
          {outputIndicators.map(indicator => (
            <IndicatorCard key={indicator.name} indicator={indicator} isInput={false} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default IndicatorManager
