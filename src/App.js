import { getOutfit } from "./utils/OutfitLogic";
import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import OutfitCard from "./components/OutfitCard";
import SettingsPage from "./components/SettingsPage";
import ForecastPage from "./components/ForecastPage";
import HourlyForecast from "./components/HourlyForecast";
import "./App.css";
import morning1 from "./morning1.jpeg";
import morning2 from "./morning2.jpeg";
import afternoon from "./afternoon.jpeg";
import evening from "./evening1.jpeg";
import night from "./night.jpeg";
import cloudy from "./cloudy.jpeg";

const DEFAULT_CITY = "Bangalore";

function App() {
const [searchTimeout, setSearchTimeout] = useState(null);
  // ✅ FIX 1: move function to top + pass weather
  const getBackgroundImage = (weather) => {
    if (!weather || !weather.weather) return morning1;

    const main = weather.weather[0].main.toLowerCase();
    const desc = weather.weather[0].description.toLowerCase();
    
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const time = hour + minutes / 60;

    if (
      main.includes("rain") ||
      main.includes("drizzle") ||
      main.includes("thunderstorm")
    ) return cloudy;

    if (
      desc.includes("overcast") ||
      desc.includes("broken clouds")
    ) return cloudy;

    if (time >= 5.75 && time < 8) return morning1;
    if (time >= 8 && time < 11) return morning2;
    if (time >= 11 && time < 18) return afternoon;
    if (time >= 18 && time < 19.5) return evening;

    return night;
  };

  const [darkMode, setDarkMode] = useState(false);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(
    () => localStorage.getItem("city") || DEFAULT_CITY
  );
  const [input, setInput] = useState("");
  const [page, setPage] = useState("home");
  const [forecast, setForecast] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const [fade, setFade] = useState(false);

  // ✅ FIX 2: safe default
  const [bgImage, setBgImage] = useState(morning1);

  const convertTemp = (temp) =>
    unit === "F" ? (temp * 9) / 5 + 32 : temp;

  const navItem = (active) => ({
    cursor: "pointer",
    color: active ? "#ffffff" : "rgba(255,255,255,0.5)",
    fontSize: "22px",
    transform: active ? "scale(1.2)" : "scale(1)",
    transition: "0.3s",
  });

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3aa5e2280ee5d8bbab407015b4d1ca7a&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          setWeather(null);
        } else {
          setWeather(data);
        }
      })
      .catch(() => {
  setWeather(null);
  setLoading(false);
});

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3aa5e2280ee5d8bbab407015b4d1ca7a&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.list) {
          const daily = data.list.filter((_, i) => i % 8 === 0);
          setForecast(daily.slice(0, 3));
        } else {
          setForecast([]);
        }
      })
      .catch(() => setForecast([]));

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3aa5e2280ee5d8bbab407015b4d1ca7a&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setHourlyData(data?.list?.slice(0, 6) || []);
        setLoading(false);
      })
      .catch(() => {
        setHourlyData([]);
        setLoading(false);
      });
  }, [city]);

  useEffect(() => {
    if (city) localStorage.setItem("city", city);
  }, [city]);

  // ✅ FIX 3: correct usage
  useEffect(() => {
    const newBg = getBackgroundImage(weather);

    if (newBg !== bgImage) {
      setFade(true);

      setTimeout(() => {
        setBgImage(newBg);
        setFade(false);
      }, 300);
    }
  }, [weather, bgImage]);

  useEffect(() => {
    if (!localStorage.getItem("city")) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&limit=1&appid=3aa5e2280ee5d8bbab407015b4d1ca7a`
            );
            const data = await res.json();
            setCity(data?.[0]?.name || DEFAULT_CITY);
          } catch {
            setCity(DEFAULT_CITY);
          }
        },
        () => setCity(DEFAULT_CITY)
      );
    }
  }, []);

  const formatTime = (dt) =>
    new Date(dt).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });

  const getWeatherEmoji = (main, description = "") => {
    description = description.toLowerCase();

    if (main === "Clear") return "☀️";

    if (main === "Clouds") {
      if (description.includes("few")) return "🌤️";
      if (description.includes("scattered")) return "⛅";
      if (description.includes("broken")) return "🌥️";
      return "☁️";
    }

    if (main === "Rain") return "🌧️";
    if (main === "Drizzle") return "🌦️";
    if (main === "Thunderstorm") return "⛈️";
    if (main === "Snow") return "❄️";
    if (["Mist", "Fog", "Haze"].includes(main)) return "🌫️";

    return "🌤️";
  };

  return (
  // 🔥 OUTER WRAPPER (full screen)
  <div
    style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#000",
    }}
  >
    {/* 🔥 APP CONTAINER */}
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "420px",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* OLD BG */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "left 20% top",
          backgroundRepeat: "no-repeat",
          transition: "opacity 0.5s ease",
          opacity: fade ? 0 : 1,
          zIndex: 0,
        }}
      />

      {/* NEW BG */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: "cover",
          backgroundPosition: "left 20% top",
          backgroundRepeat: "no-repeat",
          transition: "opacity 0.5s ease",
          opacity: fade ? 1 : 0,
          zIndex: 0,
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "20px",
          paddingBottom: "100px",
        }}
      >
        <h2 style={{
  textAlign: "center",
  color: "#fff",
  fontWeight: "700",
  letterSpacing: "1px"
}}>
  SkyCast 
</h2>
<p style={{
  textAlign: "center",
  color: "rgba(255,255,255,0.7)",
  marginBottom: "10px",
  fontSize: "13px"
}}>
  Smart weather insights🧠
</p>

        {page === "home" && (
          <div classname="page">
          <>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <input
  value={input}
  onChange={(e) => {
    const value = e.target.value;
    setInput(value);

    if (searchTimeout) clearTimeout(searchTimeout);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=3aa5e2280ee5d8bbab407015b4d1ca7a`
        );

        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    setSearchTimeout(timeout);
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter" && input.trim()) {
      setCity(input);
      setInput("");
      setSuggestions([]);
    }
  }}
  placeholder="Enter city..."
  className="glass-input"
/>

                {suggestions.length > 0 && (
                  <div className="suggestions-box">
                    {suggestions.map((item, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => {
                          setCity(item.name);
                          setInput(item.name);
                          setSuggestions([]);
                        }}
                      >
                        {item.name}, {item.country}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (input.trim()) {
                    setCity(input);
                    setInput("");
                  }
                }}
                className="glass-button"
              >
                Search
              </button>
            </div>

            <h3 style={{ textAlign: "center", color: "#fff" }}>
              📍 {city}
            </h3>

            {loading ? (
  <div style={{ textAlign: "center", color: "white" }}>
    <p>Loading weather...</p>
  </div>
) : !weather ? (
  <div style={{ textAlign: "center", color: "white" }}>
    <p>❌ City not found</p>
    <button
      className="glass-button"
      onClick={() => setCity(DEFAULT_CITY)}
    >
      Retry
    </button>
  </div>
) : (
              <>
                <WeatherCard
                  temp={weather.main.temp}
                  feelsLike={weather.main.feels_like}
                  condition={weather.weather[0].description}
                  humidity={weather.main.humidity}
                  wind={weather.wind.speed}
                  darkMode={darkMode}
                  unit={unit}
                />

                <HourlyForecast
                  hourly={hourlyData}
                  darkMode={darkMode}
                  unit={unit}
                  formatTime={formatTime}
                />

                <div style={{ marginTop: "20px" }}>
                  <OutfitCard
                    outfit={getOutfit(
                      weather.main.temp,
                      weather.weather[0].description
                    )}
                    darkMode={darkMode}
                  />
                </div>

                <h4 style={{ color: "#fff", marginTop: "20px" }}>
                  3-Day Forecast
                </h4>

                <div style={{ display: "flex", gap: "10px" }}>
                  {forecast.map((item, i) => (
                    <div key={i} className="glass-card">
                      <p>
                        {new Date(item.dt_txt).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </p>

                      <p style={{ fontSize: "22px", margin: "5px 0" }}>
                        {getWeatherEmoji(
                          item.weather[0].main,
                          item.weather[0].description
                        )}
                      </p>

                      <p>
                        {convertTemp(item.main.temp).toFixed(0)}°{unit}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        </div>
        )}

        {page === "forecast" && (
          <div classname ="page">
          <ForecastPage city={city} darkMode={darkMode} unit={unit} />
        </div>
        )}

        {page === "settings" && (
          <div classname ="page">
          <SettingsPage
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            unit={unit}
            setUnit={setUnit}
          />
          </div>
        )}

        <div className="glass-nav">
          <div onClick={() => setPage("home")} style={navItem(page === "home")}>
            🏠
          </div>
          <div
            onClick={() => setPage("forecast")}
            style={navItem(page === "forecast")}
          >
            📅
          </div>
          <div
            onClick={() => setPage("settings")}
            style={navItem(page === "settings")}
          >
            ⚙️
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default App;