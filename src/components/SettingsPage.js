import { useState } from "react";

function SettingsPage({ darkMode, setDarkMode, unit, setUnit }) {
  const [alerts, setAlerts] = useState(true);

  const styles = {
    container: {
      width: "100%", // 🔥 FIX
      boxSizing: "border-box", // 🔥 FIX

      marginTop: "20px",
      padding: "20px",

      background: darkMode
        ? "rgba(30, 41, 59, 0.7)"
        : "rgba(255,255,255,0.2)",

      backdropFilter: "blur(12px)",
      borderRadius: "20px",

      color: "#ffffff",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    },

    section: {
      width: "100%", // 🔥 FIX
      boxSizing: "border-box",

      marginBottom: "20px",
      padding: "15px",
      borderRadius: "15px",
      background: "rgba(255,255,255,0.1)",
    },

    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "10px",
    },

    button: {
      padding: "6px 12px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      marginLeft: "5px",
    },
  };

  return (
  <div style={styles.container}>
    <h3 style={{ marginBottom: "15px", textAlign: "center" }}>
      ⚙ Settings
    </h3>

    {/* 🌙 DARK MODE */}
    <div style={styles.section}>
      <p>🌙 Dark Mode</p>
      <div style={styles.row}>
        <span>{darkMode ? "Enabled" : "Disabled"}</span>

        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>

    {/* 🌡 TEMPERATURE UNIT */}
    <div style={styles.section}>
      <p>🌡 Temperature Unit</p>
      <div style={styles.row}>
        <span>
          {unit === "C" ? "Celsius (°C)" : "Fahrenheit (°F)"}
        </span>

        <div>
          <button
            style={{
              ...styles.button,
              background: unit === "C" ? "#3b82f6" : "#555",
              color: "white",
            }}
            onClick={() => setUnit("C")}
          >
            °C
          </button>

          <button
            style={{
              ...styles.button,
              background: unit === "F" ? "#3b82f6" : "#555",
              color: "white",
            }}
            onClick={() => setUnit("F")}
          >
            °F
          </button>
        </div>
      </div>
    </div>

    {/* 🔔 WEATHER ALERTS */}
    <div style={styles.section}>
      <p>🔔 Weather Alerts</p>
      <div style={styles.row}>
        <span>{alerts ? "Enabled" : "Disabled"}</span>

        <label className="switch">
          <input
            type="checkbox"
            checked={alerts}
            onChange={() => setAlerts(!alerts)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>

    {/* 📱 APP INFO */}
    <div style={styles.section}>
      <p>📱 App Info</p>
      <div style={{ marginTop: "10px", fontSize: "14px", opacity: 0.8 }}>
        <p>Version: 1.0.0</p>
        <p>Built with ❤️ using React</p>
      </div>
    </div>
  </div>
);
}

export default SettingsPage;