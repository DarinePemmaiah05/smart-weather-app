const getIcon = (condition) => {
  if (condition === "Clear") return "☀️";
  if (condition === "Clouds") return "☁️";
  if (condition === "Rain" || condition === "Drizzle") return "🌧️";
  if (condition === "Thunderstorm") return "⛈️";
  return "🌤️";
};

function WeatherCard({ temp, feelsLike, condition, humidity, wind, darkMode, unit }) {
  const styles = {
    card: {
      background: "rgba(255, 255, 255, 0.22)", // Slightly more opaque for better glass effect
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.35)",
      color: "#ffffff",
      padding: "25px",
      borderRadius: "24px", // Smoother corners like the reference
      textAlign: "center",
      marginBottom: "20px",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      transform: "translateY(0)",
      zIndex: 2,
    },
    temp: {
      fontSize: "42px", // Bigger font for the primary data
      fontWeight: "700",
      margin: 0,
      color: "#ffffff",
      textShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    condition: {
      color: "rgba(255, 255, 255, 0.9)",
      fontSize: "20px",
      marginTop: "5px",
      fontWeight: "500",
      textTransform: "capitalize"
    },
    feels: {
      marginTop: "8px",
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.7)",
    },
    row: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "20px",
      paddingTop: "15px",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    },
    label: {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "13px",
      marginBottom: "4px",
    },
    value: {
      color: "#ffffff",
      fontWeight: "600",
      fontSize: "16px",
    },
  };

  const convertTemp = (temp) => {
  return unit === "F" ? (temp * 9) / 5 + 32 : temp;
};

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <h1 style={styles.temp}>
        {getIcon(condition)} {convertTemp(temp).toFixed(1)}°{unit}
      </h1>
      <p style={styles.condition}>{condition}</p>
      <p style={styles.feels}>Feels like Feels like {convertTemp(feelsLike).toFixed(1)}°{unit}</p>

      <div style={styles.row}>
        <div>
          <p style={styles.label}>💧 Humidity</p>
          <p style={styles.value}>{humidity}%</p>
        </div>
        <div>
          <p style={styles.label}>🌬️ Wind</p>
          <p style={styles.value}>{wind} km/h</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;