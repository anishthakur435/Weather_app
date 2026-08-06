import React from "react";
import { Box, Typography, Card } from "@mui/material";

function Forecast({ forecast }) {
  
  const temperature = 25;
  return (
    <>
      <Box className="forecast flex flex-col gap-4 p-4">
        <Typography variant="h5">Forecast</Typography>
        <Box className="flex flex-row gap-4 flex-wrap ">
          <Card className="flex flex-col items-center justify-center gap-2 p-4 bg-[#bbe1e678]">
            <Typography variant="h6" component="h3">
              Monday
            </Typography>
            <Typography variant="body1">{temperature}°C</Typography>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-2 p-4 bg-[#bbe1e678]">
            <Typography variant="h6" component="h3">
              Tuesday
            </Typography>
            <Typography variant="body1">{temperature + 1}°C</Typography>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-2 p-4 bg-[#bbe1e678]">
            <Typography variant="h6" component="h3">
              Wednesday
            </Typography>
            <Typography variant="body1">{temperature + 2}°C</Typography>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default Forecast;
