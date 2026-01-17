import React,{ useState } from "react"
import WeatherContext from "./WeatherContext.js"

const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState(null)

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        weatherData,
        setWeatherData
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherProvider
