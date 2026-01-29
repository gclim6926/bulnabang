import React, { useState, useEffect } from 'react'
import ScoreDashboard from './components/score/ScoreDashboard'
import IndicatorManager from './components/indicators/IndicatorManager'
import PredictionPanel from './components/prediction/PredictionPanel'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="container">
      {/* 헤더 */}
      <header style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>
          🔥🦋 불나방
        </h1>
        <p style={{ opacity: 0.8, fontSize: '18px' }}>
          주식 예측의 신 - 목표: 매일 100점!
        </p>
      </header>

      {/* 네비게이션 */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '30px'
      }}>
        <button
          className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 대시보드
        </button>
        <button
          className={`btn ${activeTab === 'indicators' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('indicators')}
        >
          📈 지표 관리
        </button>
        <button
          className={`btn ${activeTab === 'prediction' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('prediction')}
        >
          🎯 예측
        </button>
      </nav>

      {/* 메인 컨텐츠 */}
      <main>
        {activeTab === 'dashboard' && <ScoreDashboard />}
        {activeTab === 'indicators' && <IndicatorManager />}
        {activeTab === 'prediction' && <PredictionPanel />}
      </main>

      {/* 푸터 */}
      <footer style={{
        textAlign: 'center',
        padding: '40px 0',
        opacity: 0.5,
        marginTop: '40px'
      }}>
        <p>🔥🦋 불나방 v0.1.0</p>
      </footer>
    </div>
  )
}

export default App
