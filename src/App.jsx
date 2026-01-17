import React from 'react'
import WeatherBox from './components/WeatherBox'

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 text-white text-3xl font-bold">
      <WeatherBox />
    </div>
  )
}

export default App