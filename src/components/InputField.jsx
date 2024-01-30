import styled from "@emotion/styled";
import { FormControl, TextField, Typography } from "@mui/material";
import React from "react";

const StyledField = styled(TextField)({
  ".MuiOutlinedInput-input::placeholder": {
    fontSize: "24px",
  },

  ".MuiOutlinedInput-root": {
    padding: "4px",
    fontSize: "24px",
    fieldset: {
      border: 0,
      outline: 0,
    },

    "&:hover fieldset": {
      border: 0,
    },

    "&.Mui-focused fieldset": {
      border: 0,
    },
  },
});

const InputField = ({
  type,
  others,
  autoFocus,
  title,
  value,
  onChange,
  multiline,
  rows,
  fromPost,
  placeholder,
}) => {
  return (
    <FormControl fullWidth className="mb-4">
      <Typography fontSize={18} fontWeight="bold">
        {title}
      </Typography>
      {fromPost ? (
        <StyledField
          placeholder={placeholder}
          type={type}
          multiline={multiline}
          rows={rows}
          name={others}
          id={others}
          value={value}
          onChange={onChange}
        />
      ) : (
        <TextField
          type={type}
          name={others}
          id={others}
          autoFocus={autoFocus}
          placeholder={title}
          value={value}
          onChange={onChange}
          multiline={multiline}
          rows={rows}
          required
        />
      )}
    </FormControl>
  );
};

export default InputField;
