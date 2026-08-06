import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import Forecast from "../components/Forecast";

import cloudySky from "../assets/background/cloudySky.mp4";
import rain from "../assets/background/rain.mp4";
import thunderStorm from "../assets/background/thunderStorms.mp4";
import clearSkySlow from "../assets/background/clearSkySlow.mp4";
import snowFall from "../assets/background/snowfall.mp4";

import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  ViewSidebarOutlined,
  SearchOutlined,
  Error,
} from "@mui/icons-material";
import { APP_CONFIG } from "../constants/config";
import { useWeather } from "../hooks/useWeather";

const drawerWidth = APP_CONFIG.UI.DRAWER_WIDTH;

const weatherVideos = {
  clear: clearSkySlow,
  clouds: cloudySky,
  thunderstorm: thunderStorm,
  rain: rain,
  drizzle: cloudySky,
  snow: snowFall,
};

function HomePage() {
  const {
    weather,
    forecast,
    city,
    loading,
    error,
    handleSearch,
    searchHistory,
    clearHistory,
    initWeather,
  } = useWeather();
  const [openDrawer, setOpenDrawer] = useState(true);

  useEffect(() => {
    initWeather();
  }, [initWeather]);

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const todayWeather = weather?.weather?.[0]?.main?.toLowerCase();
  const backgroundVideo = weatherVideos[todayWeather] || clearSkySlow;

  return (
    <Box className="relative h-screen w-full overflow-hidden">
      <video
        key={todayWeather || "default"}
        autoPlay
        loop
        muted
        playsInline
        src={backgroundVideo}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <Box className="relative min-h-screen overflow-hidden">
        <Box className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0875ea]/50 via-[#193f69]/95 to-[#143e7d] backdrop-blur-md border border-white/10" />
        <Tooltip title={openDrawer ? "Hide Sidebar" : "Open Sidebar"}>
          <IconButton
            aria-label={openDrawer ? "Hide sidebar" : "Show sidebar"}
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              top: 24,
              left: openDrawer ? drawerWidth - 20 : 20,
              zIndex: 2000,
              width: 40,
              height: 40,
              color: "#fff",
              background: "rgba(255,255,255,.12)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,.08)",
              transition: ".35s",

              "&:hover": {
                background: "rgba(255,255,255,.18)",
                borderRadius: "15px",
              },
            }}
          >
            <ViewSidebarOutlined />
          </IconButton>
        </Tooltip>

        {/* Sidebar */}
        <Drawer
          anchor="left"
          variant="persistent"
          open={openDrawer}
          sx={{
            width: drawerWidth,
            flexShrink: 1,

            "& .MuiDrawer-paper": {
              width: drawerWidth,
              padding: "10px",
              background: "#1934595a",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(4px)",
              borderRight: "1px solid rgba(255,255,255,.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,.25)",
              overflow: "auto",
            },
          }}
        >
          <Sidebar
            city={city}
            handleSearch={handleSearch}
            searchHistory={searchHistory}
            clearHistory={clearHistory}
          />
        </Drawer>

        <main
          className={`
        h-screen
        overflow-y-auto
        transition-all
        duration-500
        px-10
        py-8
      `}
          style={{
            marginLeft: openDrawer ? drawerWidth : 0,
          }}
        >
          {loading ? (
            <Box className="flex h-full items-center justify-center">
              <CircularProgress sx={{ color: "white" }} />
            </Box>
          ) : error ? (
            <Box className="flex flex-col h-full items-center justify-center text-white/80 gap-4 text-center">
              <Error sx={{ fontSize: 64, color: "#ff6b6b" }} />
              <Typography variant="h5" className="font-light">
                Oops! Something went wrong.
              </Typography>
              <Typography variant="body1" className="opacity-70">
                {error}
              </Typography>
            </Box>
          ) : !weather ? (
            <Box className="flex flex-col h-full items-center justify-center text-white/80 gap-4 text-center">
              <SearchOutlined sx={{ fontSize: 64, opacity: 0.5 }} />
              <Typography variant="h5" className="font-light">
                Search for a city
              </Typography>
            </Box>
          ) : (
            <Box className="mx-auto max-w-7xl">
              <CurrentWeather weather={weather} />

              <Box className="mt-8">
                <HourlyForecast forecast={forecast} />
              </Box>

              <Box className="mt-4">
                <Forecast forecast={forecast} />
              </Box>
            </Box>
          )}
        </main>
      </Box>
    </Box>
  );
}

export default HomePage;
