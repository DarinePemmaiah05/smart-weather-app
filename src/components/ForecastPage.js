import { useEffect, useState } from "react";

const getIcon = (main, description) => {
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

function ForecastPage({ city, darkMode, unit }) {
  const [forecast, setForecast] = useState([]);

  const convertTemp = (temp) => {
    return unit === "F" ? (temp * 9) / 5 + 32 : temp;
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3aa5e2280ee5d8bbab407015b4d1ca7a&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "200" && data.list) {
          const daily = data.list.filter((_, i) => i % 8 === 0);
          setForecast(daily.slice(0, 5));
        }
      });
  }, [city]);

  const styles = {
    container: {
      width: "100%",
      marginTop: "20px",
       // 🔥 IMPORTANT FIX
    },

    title: {
      textAlign: "center",
      color: darkMode ? "#f1f5f9" : "#ffffff",
      marginBottom: "15px",
      fontSize: "18px",
      fontWeight: "600",
    },

    list: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      //width: "100%",
    },

    card: {
      width: "100%", // 🔥 FORCE FULL WIDTH
      boxSizing: "border-box",

      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
      borderRadius: "15px",

      background: darkMode
        ? "rgba(30, 41, 59, 0.7)"
        : "rgba(255, 255, 255, 0.7)",

      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.2)",

      color: darkMode ? "#f1f5f9" : "#0f172a",

      boxShadow: darkMode
        ? "0 8px 20px rgba(0,0,0,0.4)"
        : "0 8px 15px rgba(0,0,0,0.1)",
    },

    day: {
      fontWeight: "600",
      width: "60px",
    },

    center: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flex: 1,
      justifyContent: "center",
    },

    icon: {
      fontSize: "22px",
    },

    temp: {
      fontWeight: "600",
    },

    condition: {
      fontSize: "13px",
      opacity: 0.8,
      textTransform: "capitalize",
    },
  };

  return (
  <div style={styles.container}>
    <h3 style={styles.title}>📅 5-Day Forecast</h3>

    <div style={styles.list}>
      {forecast.map((item, index) => (
        <div key={index} style={styles.card}>
          
          {/* Day */}
          <span style={styles.day}>
            <div>
              <p>
                {new Date(item.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>

              <p style={{ fontSize: "12px", opacity: 0.7 }}>
                {new Date(item.dt_txt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          </span>

          {/* Center */}
          <div style={styles.center}>
            <span style={styles.icon}>
              {getIcon(
                item.weather[0].main,
                item.weather[0].description
              )}
            </span>

            <span style={styles.temp}>
              {convertTemp(item.main.temp).toFixed(0)}°{unit}
            </span>
          </div>

          {/* Condition */}
          <span style={styles.condition}>
            {item.weather[0].description}
          </span>
        </div>
      ))}
    </div>
  </div>
);
}

export default ForecastPage;