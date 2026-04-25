import React from "react";

function HourlyForecast({ hourly, darkMode, unit }) {
  const convertTemp = (temp) =>
    unit === "F" ? (temp * 9) / 5 + 32 : temp;

  // 🔥 IMPROVED ICON LOGIC (DAY/NIGHT + TYPES)
  const getEmoji = (main, description, dt) => {
    if (!main) return "🌡️";

    const hour = new Date(dt * 1000).getHours();
    const isNight = hour < 6 || hour >= 18;

    description = description?.toLowerCase() || "";

    if (main === "Clear") return isNight ? "🌙" : "☀️";

    if (main === "Clouds") {
      if (description.includes("few")) return isNight ? "🌙☁️" : "🌤️";
      if (description.includes("scattered")) return "⛅";
      if (description.includes("broken")) return "🌥️";
      return "☁️";
    }

    if (main === "Rain") return "🌧️";
    if (main === "Drizzle") return "🌦️";
    if (main === "Thunderstorm") return "⛈️";
    if (main === "Snow") return "❄️";
    if (["Mist", "Fog", "Haze"].includes(main)) return "🌫️";

    return isNight ? "🌙" : "🌤️";
  };

  return (
    <div
      style={{
        background: darkMode
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.2)",
        borderRadius: "20px",
        padding: "12px",
        marginTop: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "10px",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
        }}
        className="hide-scrollbar"
      >
        {hourly.map((item, index) => (
          <div
            key={index}
            style={{
              minWidth: "60px", // smaller
              flex: "0 0 auto",
              textAlign: "center",
              padding: "6px",
              borderRadius: "12px",

              // 🔥 FULLY TRANSPARENT
              background: "transparent",
              boxShadow: "none",

              color: "#ffffff",
              scrollSnapAlign: "start",
            }}
          >
            {/* 🕒 TIME (12H FORMAT) */}
            <p style={{ margin: 0, fontSize: "11px", opacity: 0.7 }}>
              {index === 0
                ? "Now"
                : new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
            </p>

            {/* 🌤 ICON */}
            <p style={{ fontSize: "18px", margin: "3px 0" }}>
              {getEmoji(
                item.weather[0].main,
                item.weather[0].description,
                item.dt
              )}
            </p>

            {/* 🌡 TEMP */}
            <p style={{ margin: 0, fontSize: "12px", fontWeight: "600" }}>
              {Math.round(convertTemp(item.main.temp))}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;