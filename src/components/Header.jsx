import React from "react";
import { CloudOutlined, WbSunnyOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <Box>
        <p className="text-white/60 text-sm tracking-[0.25em] uppercase">
          Weather
        </p>

        <h1 className="text-3xl font-light text-white">Chandigarh</h1>
      </Box>

      <Box className="flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-2xl border border-white/10 px-4 py-2">
        <CloudOutlined className="text-white/70" />

        <span className="text-white text-sm">Live Forecast</span>
      </Box>
    </header>
  );
}

export default Header;
