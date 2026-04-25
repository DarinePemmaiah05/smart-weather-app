import React from "react";

const outfitImages = {
  // 👕 TOP
  "Shirt": require("../hawaiian-shirt.png"),
  "T-shirt": require("../clothes.png"),
  "Jacket": require("../jacket.png"),

  // 👖 BOTTOM
  "Jeans": require("../jeans.png"),
  "Shorts": require("../denim-shorts.png"),
  "Warm pants": require("../pants.png"),

  // 👟 FOOTWEAR
  "Sneakers": require("../sneakers.png"),
  "Shoes": require("../sport-shoe.png"),
  "Boots": require("../boots.png"),

  // 🎒 EXTRA
  "Umbrella": require("../weather.png"),
  "Sunscreen": require("../sun-block.png"),
};

function OutfitCard({ outfit, darkMode }) {
  const styles = {
  card: {
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    color: "#ffffff",
    borderRadius: "18px",
    padding: "14px",              // 🔽 reduced
    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
    maxWidth: "320px",            // 🔥 THIS MAKES IT NARROW
    margin: "0 auto",             // center align
  },

  title: {
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "16px",             // 🔽 smaller
    textAlign: "center",
  },

  item: {
  background: "rgba(255, 255, 255, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  padding: "10px",
  textAlign: "center",
  color: "#ffffff",
  fontSize: "12px",
  maxWidth: "120px",   // 🔥 prevents stretching
  margin: "0 auto",    // 🔥 centers each box
},

  img: {
  width: "30px",
  height: "30px",
  objectFit: "contain",
  marginBottom: "5px",
},
};

  // 🔥 Build items dynamically (no empty boxes)
  const items = [
    outfit.top && { key: "top", value: outfit.top },
    outfit.bottom && { key: "bottom", value: outfit.bottom },
    outfit.footwear && { key: "footwear", value: outfit.footwear },
    outfit.extra && { key: "extra", value: outfit.extra },
  ].filter(Boolean);

  const isThreeItems = items.length === 3;

  // 🔥 Smart message logic
  const extras = Array.isArray(outfit.extra)
    ? outfit.extra
    : outfit.extra
    ? [outfit.extra]
    : [];

  const hasUmbrella = extras.includes("Umbrella");
  const hasWarm = outfit.top === "Jacket";

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Today's Outfit</h3>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // balanced layout
    gap: "12px",
    padding: "0 10px", // 🔥 adds side breathing space
  }}
>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div
              key={item.key}
              style={{
                ...styles.item,
                gridColumn:
                  isThreeItems && isLast ? "1 / span 2" : "auto",
                justifySelf:
                  isThreeItems && isLast ? "center" : "stretch",
                width:
                  isThreeItems && isLast ? "60%" : "100%",
              }}
            >
              <img
                style={styles.img}
                src={outfitImages[item.value]}
                alt={item.value}
              />
              <p>{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* 🔥 Smart Message */}
      <p
        style={{
          marginTop: "15px",
          fontSize: "13px",
          textAlign: "center",
          padding: "10px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.1)",
          fontWeight: "500",
        }}
      >
        {hasUmbrella
          ? "Rain expected — stay dry ☔"
          : hasWarm
          ? "It's cold — stay warm 🧥"
          : "Comfortable weather — dress light 👕"}
      </p>
    </div>
  );
}

export default OutfitCard;