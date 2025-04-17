import React from 'react'
import Home from './pages/Home'
import NewFeedback from './pages/NewFeedback'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App