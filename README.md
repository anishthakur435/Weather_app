# 🌤️ Modern React Weather Dashboard

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

A production-ready, beautifully designed Weather Dashboard built with React and Vite. It utilizes the OpenWeather API to provide real-time weather data, an interactive 5-day forecast, and dynamic background videos based on current weather conditions. 

This project was built with a strong emphasis on **Clean Architecture**, **Custom Hooks**, and **Performance**.

## ✨ Features

- **📍 Geolocation Support:** Instantly fetches the local weather for the user's current location upon load.
- **🕒 Search History:** Persists recent searches to `localStorage` for quick, one-click access.
- **📅 Dynamic 5-Day Forecast:** Parses a complex 40-item API response into a clean, daily forecast view.
- **🎨 Glassmorphic UI:** Features a premium, modern aesthetic with translucent panels and dynamic video backgrounds tailored to the weather.
- **🛡️ Error Handling:** Gracefully falls back on geolocation denial and renders polished empty/error states on failed API requests.
- **⚡ Optimized Performance:** Implements debounce-like patterns (fetching only on submit), removes unnecessary re-renders, and is fully strict-mode compliant and lint-free.

## 🏗️ Architecture & Concepts

This application strictly adheres to modern React best practices:
- **Separation of Concerns:** Business logic (API calls, state management, local storage) is completely decoupled from presentation components using custom hooks (`useWeather`, `useSearchHistory`).
- **Centralized Configuration:** Magic strings and numbers are extracted into a central `constants/config.js` file.
- **Reusable API Layer:** Axios requests are centralized in `services/weatherApi.js` to ensure the UI layer remains agnostic of network implementation details.
- **Accessibility (A11Y):** Built-in `aria-labels` and semantic markup for screen readers.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- An API Key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your OpenWeather API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
   *Note: Never commit your `.env` file to GitHub.*

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment (Vercel)

If deploying to Vercel, you **must** configure your environment variables in the Vercel Dashboard *before* triggering the build.

1. Go to your Vercel Project Settings > Environment Variables.
2. Add a new variable with the key `VITE_OPENWEATHER_API_KEY` and your actual API key as the value.
3. Trigger a redeployment.

*(Failure to add this variable will result in a `401 Unauthorized` error in production, as Vite requires the `VITE_` prefix to inject variables at build time).*
