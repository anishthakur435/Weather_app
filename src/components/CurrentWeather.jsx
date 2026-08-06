import { Box, CircularProgress, Typography } from "@mui/material";

function CurrentWeather({ weather, loading }) {
  if (loading || !weather || !weather.main) {
    return (
      <Box className="current-weather flex items-center justify-center p-8">
        <CircularProgress />
      </Box>
    );
  }

  const cityName = weather?.name ?? "City";
  const country = weather?.sys?.country ? `, ${weather.sys.country}` : "";
  const temperature = Math.round(weather?.main?.temp ?? 0);
  const feelsLike = Math.round(weather?.main?.feels_like ?? 0);
  const weatherDescription =
    weather?.weather?.[0]?.description ??
    weather?.weather?.[0]?.main ??
    "Clear";
  const iconCode = weather?.weather?.[0]?.icon ?? "01d";

  const timezoneOffset = weather?.timezone ?? 0;

  const date = weather?.dt
    ? new Date((weather.dt + timezoneOffset) * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      })
    : "Date unavailable";

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const localDate = new Date((timestamp + timezoneOffset) * 1000);
    return localDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  const sunrise = formatTime(weather?.sys?.sunrise);
  const sunset = formatTime(weather?.sys?.sunset);

  return (
    <Box className="apple-glass rounded-3xl p-6 max-w-md mx-auto transition-all duration-300 shadow-lg bg-[#193459]/50 text-white">
      <Box className="flex flex-col items-center justify-center text-center">
        <Typography
          variant="h4"
          component="h2"
          className="font-medium tracking-wide"
        >
          {cityName}
          {country}
        </Typography>

        <Typography
          variant="caption"
          className="opacity-60 mt-1 block tracking-wider uppercase font-semibold"
        >
          {date}
        </Typography>

        <Box className="flex items-center justify-center my-4 gap-2">
          <img
            src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
            alt={weatherDescription}
            className="w-16 h-16"
          />
          <Typography
            variant="h2"
            component="div"
            className="text-6xl font-thin tracking-tighter"
          >
            {temperature}°
          </Typography>
        </Box>

        <Typography variant="h6" className="capitalize font-medium mb-3">
          {weatherDescription}
        </Typography>

        <Box className="w-full flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-3 text-sm opacity-80">
          <Typography variant="body2" className="font-light">
            Feels Like: <span className="font-medium">{feelsLike}°C</span>
          </Typography>
          <Box className="flex flex-row justify-between gap-7">
            <Typography variant="body2" className="font-light">
              Sunrise: <span className="font-medium">{sunrise}</span>
            </Typography>
            <Typography variant="body2" className="font-light">
              Sunset: <span className="font-medium">{sunset}</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CurrentWeather;