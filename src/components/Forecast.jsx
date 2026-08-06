import { Box, Typography } from "@mui/material";

function Forecast({ forecast }) {
  if (!forecast || !forecast.list) return null;

  const dailyForecasts = [];
  const addedDays = new Set();

  const timezoneOffset = forecast.city?.timezone || 0;

  forecast.list.forEach((item) => {
    const localDate = new Date((item.dt + timezoneOffset) * 1000);
    const day = localDate.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });

    if (!addedDays.has(day)) {
      dailyForecasts.push(item);
      addedDays.add(day);
    }
  });

  const next5Days = dailyForecasts.slice(0, 5);

  return (
    <Box
      component="section"
      className="apple-glass rounded-3xl p-5 shadow-lg max-w-full my-6 bg-[#193459]/50 text-white"
    >
      <Typography
        variant="caption"
        className="block text-xs font-semibold uppercase tracking-wider opacity-60 mb-4 border-b border-white/10 pb-2"
      >
        5-Day Forecast
      </Typography>

      <Box className="flex flex-col gap-2">
        {next5Days.map((item, index) => {
          const temp = Math.round(item.main.temp);
          const iconCode = item.weather[0].icon;
          const description = item.weather[0].main;
          const localDate = new Date((item.dt + timezoneOffset) * 1000);
          const dayName =
            index === 0
              ? "Today"
              : localDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  timeZone: "UTC",
                });

          return (
            <Box
              key={item.dt}
              className="flex flex-row items-center justify-between py-2 border-b border-white/5 last:border-0"
            >
              <Typography variant="body1" className="w-28 font-medium">
                {dayName}
              </Typography>

              <Box className="flex items-center gap-2 flex-1 justify-center">
                <img
                  src={`https://openweathermap.org/img/wn/${iconCode}.png`}
                  alt={description}
                  className="w-10 h-10"
                />
                <Typography
                  variant="body2"
                  className="opacity-80 hidden sm:block capitalize"
                >
                  {description}
                </Typography>
              </Box>

              <Typography variant="h6" className="w-16 text-right font-light">
                {temp}°
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Forecast;
