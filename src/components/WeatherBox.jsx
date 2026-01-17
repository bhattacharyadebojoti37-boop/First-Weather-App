import React, { useContext, useEffect } from 'react'
import WeatherFeatures from './WeatherFeatures.jsx'
import WeatherContext from '../context/WeatherContext.js'

const WeatherBox = () => {
  const { city, setCity, weatherData, setWeatherData } = useContext(WeatherContext)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const baseUrl = import.meta.env.VITE_BASE_URL

  // 🌍 Fetch weather using coordinates (on load)
  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `${baseUrl}/current.json?key=${apiKey}&q=${coords.latitude},${coords.longitude}`
          )
          const data = await res.json()

          if (data?.location?.name) {
            setCity(data.location.name)
            setWeatherData(data)
          }
        } catch (error) {
          console.log("Geolocation error", error)
        }
      }
    )
  }, [])

  // 🔍 Fetch weather by city search
  const handleSearch = async () => {
    if (!city.trim()) return

    try {
      const res = await fetch(
        `${baseUrl}/current.json?key=${apiKey}&q=${city}`
      )
      const data = await res.json()

      if (data?.error) {
        alert("City not found")
        return
      }

      setWeatherData(data)
    } catch (error) {
      console.log("Search error", error)
    }
  }

  return (
    <div className='w-[90vh] bg-gradient-to-r from-teal-50 to-purple-200 backdrop-blur-2xl rounded p-5 flex flex-col justify-center items-center gap-4'>
      
      {/* 🔍 SEARCH BAR */}
      <div className="flex gap-2 w-full">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 p-2 text-blue-400 border rounded-lg"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* 🌦️ WEATHER DETAILS */}
      {weatherData && <WeatherFeatures />}
    </div>
  )
}

export default WeatherBox
