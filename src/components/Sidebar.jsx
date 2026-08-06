import { Box } from "@mui/material";
import SearchBar from "./SearchBar";

export default function Sidebar({ city, handleSearch, weather }) {
  return (
    <Box className="flex flex-col text-white p-4 ">
      <SearchBar initialCity={city} onSearch={handleSearch} />
    </Box>
  );
}
