import React, { useState, useEffect } from 'react'
import InputIndicators from './components/indicators/InputIndicators'
import EstimationMethods from './components/prediction/EstimationMethods'
import OutputIndicators from './components/indicators/OutputIndicators'
import Dashboard from './components/score/Dashboard'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [currentTime, setCurrentTime] = useState(new Date())

  // 실시간 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 시장 상태 체크 (한국 주식시장 기준: 9:00 ~ 15:30)
  const getMarketStatus = () => {
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    const day = currentTime.getDay()

    if (day === 0 || day === 6) return { isOpen: false, text: '휴장' }
    if ((hour === 9 && minute >= 0) || (hour > 9 && hour < 15) || (hour === 15 && minute <= 30)) {
      return { isOpen: true, text: '장 운영중' }
    }
    return { isOpen: false, text: '장 마감' }
  }

  const marketStatus = getMarketStatus()

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }

  // 파티클 생성
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    size: `${Math.random() * 4 + 2}px`
  }))

  return (
    <div className="app-container">
      {/* 애니메이션 배경 */}
      <div className="animated-bg">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              width: p.size,
              height: p.size
            }}
          />
        ))}
      </div>

      {/* 헤더 */}
      <header className="header">
        <div className="logo-area">
          <div className="logo-icon">🔥</div>
          <div className="logo-text">
            <div className="logo-title">BULNABANG</div>
            <div className="logo-subtitle">AI Stock Prediction System</div>
          </div>
        </div>

        <div className="header-info">
          <div className={`market-status ${marketStatus.isOpen ? 'open' : 'closed'}`}>
            {marketStatus.isOpen ? '● ' : '○ '}
            {marketStatus.text}
          </div>
          <div className="current-time">
            <div className="time-display">{formatTime(currentTime)}</div>
            <div className="date-display">{formatDate(currentTime)}</div>
          </div>
        </div>
      </header>

      {/* 네비게이션 */}
      <nav className="nav-container">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <span className="nav-icon">📊</span>
          대시보드
        </button>
        <button
          className={`nav-btn ${activeTab === 'input' ? 'active' : ''}`}
          onClick={() => setActiveTab('input')}
        >
          <span className="nav-icon">📥</span>
          입력지표관리
        </button>
        <button
          className={`nav-btn ${activeTab === 'estimation' ? 'active' : ''}`}
          onClick={() => setActiveTab('estimation')}
        >
          <span className="nav-icon">🤖</span>
          추정기법관리
        </button>
        <button
          className={`nav-btn ${activeTab === 'output' ? 'active' : ''}`}
          onClick={() => setActiveTab('output')}
        >
          <span className="nav-icon">📤</span>
          출력지표관리
        </button>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'input' && <InputIndicators />}
        {activeTab === 'estimation' && <EstimationMethods />}
        {activeTab === 'output' && <OutputIndicators />}
      </main>

      {/* 푸터 */}
      <footer style={{
        textAlign: 'center',
        padding: '30px',
        opacity: 0.4,
        fontSize: '12px',
        letterSpacing: '2px'
      }}>
        <p>🔥🦋 BULNABANG v0.2.0 | AI Stock Prediction System</p>
      </footer>
    </div>
  )
}

export default App
