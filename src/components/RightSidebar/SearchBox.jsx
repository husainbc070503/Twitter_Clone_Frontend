import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ title, search, handleChange }) => {
  return (
    <FormControl fullWidth>
      <OutlinedInput
        id="outlined-adornment-search"
        type="text"
        startAdornment={
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        placeholder={title}
        value={search}
        onChange={handleChange}
        sx={{ borderRadius: "50px" }}
      />
    </FormControl>
  );
};

export default SearchBox;
