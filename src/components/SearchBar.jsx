import React, { useState, useEffect } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { TextField, InputAdornment, IconButton } from "@mui/material";

function SearchBar({ initialCity, onSearch }) {
  const [inputValue, setInputValue] = useState(initialCity || "");

  useEffect(() => {
    setInputValue(initialCity || "");
  }, [initialCity]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <TextField
      fullWidth
      placeholder="Search city"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      variant="outlined"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSearchClick}
                size="small"
                sx={{
                  color: "rgba(255,255,255,.65)",
                }}
              >
                <SearchRoundedIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "30px",
          background: "rgba(255,255,255,.08)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "1px solid rgba(255,255,255,.08)",
          color: "#fff",
          transition: ".3s",

          "&:hover": {
            background: "rgba(255,255,255,.12)",
          },

          "&.Mui-focused": {
            background: "rgba(255,255,255,.14)",
          },

          "& fieldset": {
            border: "none",
          },
        },

        "& input": {
          color: "#fff",
          fontSize: "16px",
          fontWeight: 400,
        },

        "& input::placeholder": {
          color: "rgba(255,255,255,.6)",
          opacity: 0,
        },
      }}
    />
  );
}

export default SearchBar;
