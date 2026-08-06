import { Box, Card, Typography } from "@mui/material";
import React from "react";

function WeatherHighlights({ weather }) {
  const windSpeed = weather?.wind?.speed || 5;
  const humidity = weather?.main?.humidity || 60;
  const visibility = weather?.visibility ? (weather.visibility / 1100).toFixed(2) : 10;
  return (
    <Box className="weather-highlights flex flex-col gap-4 p-4">
      <Typography variant="h5">Weather Highlights</Typography>
      <Box className="flex flex-row gap-4">
        <Card className="flex flex-col items-center justify-center gap-2 p-4 bg-[#bbe1e678]">
          <Typography variant="h6" component="h3">
            Wind Status
          </Typography>
          <Typography variant="body1">{windSpeed} m/s</Typography>
        </Card>
        <Card className="flex flex-col items-center justify-center gap-2 p-4 bg-[#bbe1e678]">
          <Typography variant="h6" component="h3">
            Humidity
          </Typography>
          <Typography variant="body1">{humidity}%</Typography>
        </Card>
        <Card className="flex flex-col items-center justify-center gap-2 p-4 bg-[#bbe1e678]">
          <Typography variant="h6" component="h3">
            Visibility
          </Typography>
          <Typography variant="body1">{visibility} km</Typography>
        </Card>
      </Box>
    </Box>
  );
}

export default WeatherHighlights;
