import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const News = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("Accra, GH");
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const fetchWeather = async (loc) => {
    const apiKey = "0730b63b64e600e6b80bbe6df53c9296";
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
        setLocation(loc);
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setLoading(true);
      fetchWeather(inputValue);
      setEditing(false);
      setInputValue("");
    }
  };

  const getWeatherEmoji = (main) => {
    switch (main?.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️";
      case "thunderstorm":
        return "⛈️";
      case "snow":
        return "❄️";
      case "mist":
      case "haze":
        return "🌫️";
      case "fog":
        return "🌁";
      default:
        return "🌤️";
    }
  };

  const market = [
    { item: "Maize", type: "Cereal", season: "Rainy" },
    { item: "Castor", type: "Seed", season: "Dry" },
    { item: "Ginger", type: "Spice", season: "Rainy" },
    { item: "Groundnut", type: "Legume", season: "Rainy" },
    { item: "Soya Bean", type: "Legume", season: "Dry" },
    { item: "Cashew", type: "Nut", season: "Dry" },
    { item: "Shea Seeds", type: "Seed", season: "Rainy" },
    { item: "Tigernut", type: "Nut", season: "Dry" },
  ];

  const marketBar = [
    { item: "Castor", price: 310 },
    { item: "Maize", price: 420 },
    { item: "Ginger", price: 530 },
    { item: "Groundnut", price: 460 },
    { item: "Soya Bean", price: 1041.75 },
    { item: "Cashew", price: 620 },
    { item: "Shea Seeds", price: 390 },
    { item: "Tigernut", price: 280 },
  ];

  // Date and season logic
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB").replaceAll("/", "-"); // dd-mm-yyyy
  const month = today.getMonth() + 1;

  let currentSeason = "";
  if ([3, 4, 5].includes(month)) {
    currentSeason = "Spring";
  } else if ([6, 7, 8].includes(month)) {
    currentSeason = "Summer";
  } else if ([9, 10, 11].includes(month)) {
    currentSeason = "Autumn";
  } else {
    currentSeason = "Winter";
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Weather Section */}
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "50px",
          padding: "5px",
          width: "100%",
        }}
      >
        <div style={{ width: "30%", maxWidth: "360px" }}>
          <div
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              border: "1px solid #d9c9b5",
              borderRadius: "12px",
              padding: "24px",
              backgroundColor: "#fff",
              maxWidth: "280px",
              height: "auto",
              margin: "0 auto 40px",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#5b4636",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {getWeatherEmoji(weather?.weather?.[0]?.main)} Weather in {weather?.name || location}
            </h3>

            {editing ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "12px",
                  marginBottom: "20px",
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter city"
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #c4b49a",
                    width: "65%",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#a1866f",
                    color: "#fff",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Update
                </button>
              </form>
            ) : (
              <p
                onClick={() => setEditing(true)}
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#8b6f47",
                  textDecoration: "underline",
                  cursor: "pointer",
                  marginTop: "8px",
                  marginBottom: "20px",
                }}
              >
                Change Location
              </p>
            )}

            {loading ? (
              <p style={{ textAlign: "center", color: "#666" }}>
                Loading weather...
              </p>
            ) : error ? (
              <p style={{ color: "red", textAlign: "center" }}>⚠️ {error}</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#fdf6e3",
                  borderRadius: "10px",
                  padding: "5px 10px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#8b6f47" }}>
                    {Math.round(weather.main?.temp)}°C
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#5b4636",
                      textTransform: "capitalize",
                      marginTop: "4px",
                    }}
                  >
                    {weather.weather?.[0]?.description}
                  </div>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
                  alt="weather icon"
                  style={{ width: "70px", objectFit: "cover", zIndex: 1 }}
                />
                <div style={{ fontSize: "12px", textAlign: "right", color: "#5b4636" }}>
                  <p>
                    <strong>Day:</strong> {Math.round(weather.main?.temp_max)}°
                  </p>
                  <p>
                    <strong>Night:</strong> {Math.round(weather.main?.temp_min)}°
                  </p>
                  <p style={{ fontSize: "10px", color: "#7a5c39", marginTop: "4px" }}>
                    💨 {weather.wind?.speed} m/s
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "24px",
              backgroundColor: "#fff",
              width: "100%",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#1e3a8a",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "8px",
              }}
            >
              📊 Market Overview
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  fontSize: "14px",
                  borderCollapse: "collapse",
                  marginTop: "12px",
                }}
              >
                <thead style={{ backgroundColor: "#dbeafe", color: "#1e3a8a", fontWeight: "bold" }}>
                  <tr>
                    <th style={{ padding: "8px" }}>PRODUCT</th>
                    <th style={{ padding: "8px" }}>TYPE</th>
                    <th style={{ padding: "8px" }}>SEASON</th>
                  </tr>
                </thead>
                <tbody>
                  {market.map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "8px", fontWeight: "500" }}>{row.item}</td>
                      <td style={{ padding: "8px" }}>{row.type}</td>
                      <td style={{ padding: "8px" }}>{row.season}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "50px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "60px 24px",
            backgroundColor: "#fff",
            width: "65%",
            height: "300px",
            marginLeft: "40px",
          }}
        >
          <h3
            style={{ fontSize: "20px", fontWeight: "600", color: "#1e3a8a", marginBottom: "16px" }}
          >
            📈 Commodity Prices
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketBar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="item" />
              <YAxis unit="₵" />
              <Tooltip />
              <Bar dataKey="price" fill="#4caf50" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
              fontSize: "18px",
              color: "#5b4636",
              fontWeight: "600",
            }}
          >
            Current Season: <span style={{ fontWeight: "bold" }}>{currentSeason}</span><br />
            Today: <span>{formattedDate}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
