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

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB").replaceAll("/", "-");
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
    <div className="max-w-[1200px] mx-auto font-sans">
      <section className="flex flex-col lg:flex-row gap-12 p-4">
        {/* Weather & Market Table */}
        <div className="w-full lg:w-1/3 space-y-10">
          <div className="shadow-md border border-[#d9c9b5] rounded-xl p-6 bg-white max-w-sm mx-auto">
            <h3 className="text-center text-xl font-bold text-[#5b4636] flex justify-center items-center gap-2">
              {getWeatherEmoji(weather?.weather?.[0]?.main)} Weather in {weather?.name || location}
            </h3>
            {editing ? (
              <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center gap-2 mt-3 mb-5"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter city"
                  className="px-3 py-2 rounded-md border border-[#c4b49a] w-2/3 outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#a1866f] text-white px-3 py-2 rounded-md"
                >
                  Update
                </button>
              </form>
            ) : (
              <p
                onClick={() => setEditing(true)}
                className="text-center text-sm text-[#8b6f47] underline cursor-pointer my-2"
              >
                Change Location
              </p>
            )}

            {loading ? (
              <p className="text-center text-gray-600">Loading weather...</p>
            ) : error ? (
              <p className="text-red-500 text-center">⚠️ {error}</p>
            ) : (
              <div className="flex justify-between items-center bg-[#fdf6e3] rounded-lg px-4 py-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#8b6f47]">
                    {Math.round(weather.main?.temp)}°C
                  </div>
                  <div className="text-xs text-[#5b4636] capitalize mt-1">
                    {weather.weather?.[0]?.description}
                  </div>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
                  alt="weather icon"
                  className="w-[70px] object-cover"
                />
                <div className="text-xs text-right text-[#5b4636]">
                  <p><strong>Day:</strong> {Math.round(weather.main?.temp_max)}°</p>
                  <p><strong>Night:</strong> {Math.round(weather.main?.temp_min)}°</p>
                  <p className="text-[10px] text-[#7a5c39] mt-1">💨 {weather.wind?.speed} m/s</p>
                </div>
              </div>
            )}
          </div>

          <div className="shadow-md border border-gray-200 rounded-xl p-6 bg-white w-full">
            <h2 className="text-xl font-bold text-blue-900 border-b border-gray-200 pb-2">📊 Market Overview</h2>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-blue-100 text-blue-900 font-bold">
                  <tr>
                    <th className="px-3 py-2">PRODUCT</th>
                    <th className="px-3 py-2">TYPE</th>
                    <th className="px-3 py-2">SEASON</th>
                  </tr>
                </thead>
                <tbody>
                  {market.map((row, i) => (
                    <tr key={i} className="border-t border-gray-200">
                      <td className="px-3 py-2 font-medium">{row.item}</td>
                      <td className="px-3 py-2">{row.type}</td>
                      <td className="px-3 py-2">{row.season}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full lg:w-2/3 mt-20 ">
        <div className="shadow-md border border-gray-200 rounded-xl p-8 bg-white">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">📈 Commodity Prices</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketBar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="item" />
                <YAxis unit="₵" />
                <Tooltip />
                <Bar dataKey="price" fill="#4caf50" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          </div>

          <div className="mt-10 text-center text-lg text-[#5b4636] font-semibold">
            Current Season: <span className="font-bold">{currentSeason}</span><br />
            Today: <span>{formattedDate}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
