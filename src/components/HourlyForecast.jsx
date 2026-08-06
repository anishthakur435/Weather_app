import { Box, Typography } from "@mui/material";
import React from "react";

function HourlyForecast({ forecast }) {
  console.log("forecast", forecast);

  const hourlyForecast = forecast?.list?.slice(0, 15) || [];
  const timezoneOffSet = forecast?.city?.timezone;
  return (
    <Box
      component="section"
      className="apple-glass rounded-3xl p-5 shadow-lg max-w-full my-6 bg-[#193459]/50 text-red-50"
    >
      <Typography
        variant="caption"
        className="block text-xs font-semibold uppercase tracking-wider opacity-60 mb-4 border-b border-white/10 pb-2"
      >
        3 Hour Forecast
      </Typography>

      <Box className="flex flex-row gap-8 overflow-auto scrollbar-none ">
        {hourlyForecast.map((hour) => {
          const temp = Math.round(hour.main?.temp);
          return (
            <Box
              key={hour.dt}
              className="flex flex-col items-center justify-between p-3 min-w-fit"
            >
              <Typography
                variant="body2"
                className="font-light opacity-90 text-sm"
              >
                {new Date((hour.dt + timezoneOffSet) * 1000).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    timeZone: "UTC",
                    hour12: true,
                  },
                )}
              </Typography>

              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
                className="w-12 h-12"
              />

              <Typography variant="body1" className="font-semibold text-base">
                {temp}°
              </Typography>

              <Typography
                variant="caption"
                className="opacity-60 text-[10px] uppercase font-medium mt-1 truncate"
              >
                {hour.weather[0].main}
              </Typography>
              {/* <Typography variant="caption">
                {new Date(hour.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </Typography> */}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default HourlyForecast;
