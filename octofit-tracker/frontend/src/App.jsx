import React, { useState } from 'react'
import UserSettingsForm from './components/UserSettingsForm'
import './App.css'

function App() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSaveSettings = (settings) => {
    console.log('Saving settings:', settings)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🏋️ OctoFit Tracker</h1>
          <p>Manage your fitness journey</p>
        </div>
      </header>
      
      {showSuccess && (
        <div className="success-banner">
          ✓ Settings saved successfully!
        </div>
      )}
      
      <main className="app-main">
        <UserSettingsForm onSave={handleSaveSettings} />
      </main>
      
      <footer className="app-footer">
        <p>© 2025 OctoFit Tracker - Built with ❤️ for Mergington High School</p>
      </footer>
    </div>
  )
}

export default App
