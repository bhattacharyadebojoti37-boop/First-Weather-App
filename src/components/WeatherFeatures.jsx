import {
  Droplets,
  Gauge,
  Thermometer,
  ThermometerSun
} from "lucide-react"
import React,{ useContext, useEffect } from "react"
import WeatherContext from "../context/WeatherContext"

const WeatherFeatures = () => {
  const { weatherData, setWeatherData, city } = useContext(WeatherContext)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const baseUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    if (!city) return

    const fetchWeatherData = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/current.json?key=${apiKey}&q=${city}`
        )
        const data = await res.json()
        setWeatherData(data)
      } catch (error) {
        console.log("Error fetching weather data", error)
      }
    }

    fetchWeatherData()
  }, [city])

  if (!weatherData) return null

  const features = [
    {
      label: "Humidity",
      value: `${weatherData.current.humidity}%`,
      icon: Droplets
    },
    {
      label: "Pressure",
      value: `${weatherData.current.pressure_mb} hPa`,
      icon: Gauge
    },
    {
      label: "Temperature",
      value: `${weatherData.current.temp_c}°C`,
      icon: Thermometer
    },
    {
      label: "Feels Like",
      value: `${weatherData.current.feelslike_c}°C`,
      icon: ThermometerSun
    }
  ]

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">

      {/* 🌤️ FIRST BOX – CONDITION */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/30 backdrop-blur-lg rounded-xl p-4 shadow-sm w-full justify-center text-center sm:text-left">
        <div className="p-2 rounded-full bg-white/50">
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
            className="w-12 h-12"
          />
        </div>

        <div>
          <p className="text-sm text-gray-600">
            {weatherData.location.name}, {weatherData.location.region}
          </p>
          <p className="font-semibold text-gray-800 text-lg">
            {weatherData.current.condition.text}
          </p>
        </div>
      </div>

      {/* 📊 GRID FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/30 backdrop-blur-lg rounded-xl p-3 shadow-sm"
          >
            <div className="p-2 rounded-full bg-white/50">
              <item.icon className="w-6 h-6 text-blue-600" />
            </div>

            <div>
              <p className="text-xs text-gray-600">{item.label}</p>
              <p className="font-semibold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherFeatures