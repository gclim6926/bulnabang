import React, { useState } from 'react'

const llmModels = [
  {
    id: 'claude',
    name: 'Claude',
    provider: 'Anthropic',
    icon: '🟠',
    description: 'Anthropic의 최신 AI 모델. 복잡한 분석과 추론에 강점',
    color: '#ff6b35',
    features: ['복잡한 추론', '긴 컨텍스트', '안전성'],
    accuracy: 94.2
  },
  {
    id: 'gpt4',
    name: 'GPT-4',
    provider: 'OpenAI',
    icon: '🟢',
    description: 'OpenAI의 멀티모달 AI. 범용성과 정확도가 높음',
    color: '#00b894',
    features: ['범용성', '멀티모달', '코드 생성'],
    accuracy: 93.8
  },
  {
    id: 'gemini',
    name: 'Gemini',
    provider: 'Google',
    icon: '🔵',
    description: 'Google의 최신 AI 모델. 빠른 처리 속도',
    color: '#0984e3',
    features: ['빠른 속도', '실시간 검색', '다국어'],
    accuracy: 92.5
  },
  {
    id: 'llama',
    name: 'Llama 3',
    provider: 'Meta',
    icon: '🟣',
    description: 'Meta의 오픈소스 모델. 커스터마이징 가능',
    color: '#6c5ce7',
    features: ['오픈소스', '커스텀 가능', '경량화'],
    accuracy: 89.3
  }
]

const estimationMethods = [
  {
    id: 'regression',
    name: '회귀 분석',
    description: '입력 지표들의 선형/비선형 관계를 분석',
    icon: '📈'
  },
  {
    id: 'timeseries',
    name: '시계열 분석',
    description: '과거 데이터 패턴을 기반으로 예측',
    icon: '📊'
  },
  {
    id: 'ensemble',
    name: '앙상블 기법',
    description: '여러 모델의 예측을 조합',
    icon: '🎯'
  },
  {
    id: 'sentiment',
    name: '감성 분석',
    description: '뉴스/SNS 감성을 분석하여 반영',
    icon: '💬'
  }
]

function EstimationMethods() {
  const [selectedLLM, setSelectedLLM] = useState('claude')
  const [selectedMethods, setSelectedMethods] = useState(['regression', 'timeseries'])
  const [temperature, setTemperature] = useState(0.7)
  const [confidence, setConfidence] = useState(85)

  const toggleMethod = (methodId) => {
    setSelectedMethods(prev =>
      prev.includes(methodId)
        ? prev.filter(m => m !== methodId)
        : [...prev, methodId]
    )
  }

  const selectedModel = llmModels.find(m => m.id === selectedLLM)

  return (
    <div>
      {/* LLM 선택 섹션 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h3 className="card-title">
            <span className="card-title-icon">🤖</span>
            AI 모델 선택
          </h3>
        </div>

        <div className="llm-grid">
          {llmModels.map(model => (
            <div
              key={model.id}
              className={`llm-card ${selectedLLM === model.id ? 'selected' : ''}`}
              onClick={() => setSelectedLLM(model.id)}
              style={{
                '--model-color': model.color
              }}
            >
              <div className="llm-icon">{model.icon}</div>
              <div className="llm-name">{model.name}</div>
              <div className="llm-desc" style={{ marginBottom: '10px' }}>{model.provider}</div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '12px',
                flexWrap: 'wrap'
              }}>
                {model.features.map(f => (
                  <span key={f} style={{
                    padding: '4px 8px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    fontSize: '11px'
                  }}>
                    {f}
                  </span>
                ))}
              </div>
              <div style={{
                marginTop: '15px',
                padding: '8px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '4px' }}>예측 정확도</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: model.color }}>
                  {model.accuracy}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 모델 정보 */}
      {selectedModel && (
        <div className="card" style={{ marginBottom: '24px', background: `linear-gradient(135deg, ${selectedModel.color}15 0%, transparent 100%)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              fontSize: '48px',
              background: selectedModel.color,
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {selectedModel.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '8px' }}>{selectedModel.name} 사용 중</h3>
              <p style={{ opacity: 0.7, marginBottom: '15px' }}>{selectedModel.description}</p>

              {/* Temperature 슬라이더 */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', opacity: 0.7 }}>Temperature (창의성)</span>
                  <span style={{ fontWeight: 600 }}>{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={e => setTemperature(parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: selectedModel.color
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.5 }}>
                  <span>보수적</span>
                  <span>창의적</span>
                </div>
              </div>

              {/* 신뢰도 설정 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', opacity: 0.7 }}>최소 신뢰도 기준</span>
                  <span style={{ fontWeight: 600 }}>{confidence}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="99"
                  step="1"
                  value={confidence}
                  onChange={e => setConfidence(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: selectedModel.color
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 추정 기법 선택 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <span className="card-title-icon">⚙️</span>
            추정 기법 선택
          </h3>
          <span style={{ opacity: 0.6, fontSize: '14px' }}>
            {selectedMethods.length}개 선택됨
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
          {estimationMethods.map(method => (
            <div
              key={method.id}
              onClick={() => toggleMethod(method.id)}
              style={{
                padding: '20px',
                background: selectedMethods.includes(method.id)
                  ? 'rgba(255, 107, 53, 0.15)'
                  : 'rgba(255,255,255,0.02)',
                border: `2px solid ${selectedMethods.includes(method.id) ? 'var(--primary)' : 'var(--card-border)'}`,
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>{method.icon}</span>
                <span style={{ fontWeight: 600 }}>{method.name}</span>
                {selectedMethods.includes(method.id) && (
                  <span style={{
                    marginLeft: 'auto',
                    background: 'var(--primary)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '11px'
                  }}>
                    ✓ 선택됨
                  </span>
                )}
              </div>
              <p style={{ fontSize: '13px', opacity: 0.7 }}>{method.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 저장 버튼 */}
      <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary">설정 초기화</button>
        <button className="btn btn-primary">설정 저장</button>
      </div>
    </div>
  )
}

export default EstimationMethods
