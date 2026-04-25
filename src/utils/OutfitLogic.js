export const getOutfit = (temp, condition) => {
  condition = condition.toLowerCase();

  let outfit = {
    top: "",
    bottom: "",
    footwear: "",
    extra: "",
  };

  // 🔥 TOP
  if (temp > 28) outfit.top = "T-shirt";
  else if (temp > 20) outfit.top = "Shirt";
  else outfit.top = "Jacket";

  // 🔥 BOTTOM
  if (temp > 28) outfit.bottom = "Shorts";
  else if (temp > 20) outfit.bottom = "Jeans";
  else outfit.bottom = "Warm pants";

  // 🔥 FOOTWEAR
  outfit.footwear = "Sneakers";

  // 🔥 EXTRA (THIS FIXES YOUR PROBLEM)
  if (
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("thunderstorm")
  ) {
    outfit.extra = "Umbrella";
  } else if (
    condition.includes("clear") ||
    condition.includes("sun") ||
    condition.includes("few clouds") ||
    condition.includes("scattered clouds")
  ) {
    outfit.extra = "Sunscreen";
  } else {
    outfit.extra = "Sunscreen"; // default fallback
  }

  return outfit;
};