import { Box } from "@mui/material";
import SearchBar from "./SearchBar";

export default function Sidebar({ city, setCity, handleSearch, weather }) {
  const selectCity = (cityName) => {
    setCity(cityName);
  };

  return (
    <Box className="flex flex-col text-white p-4 ">
      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
    </Box>
  );
}
