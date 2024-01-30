import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";

const PasswordField = ({ title, others, value, onChange, isFromLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl fullWidth className="mb-4">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item md={isFromLogin ? 6 : 12} xs={isFromLogin ? 6 : 12}>
          <Typography fontSize={16} fontWeight="bold">
            {title}
          </Typography>
        </Grid>
        {isFromLogin && (
          <Grid item md={6} xs={6} textAlign="end">
            <ForgotPassword />
          </Grid>
        )}
      </Grid>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        name={others}
        placeholder={title}
        value={value}
        onChange={onChange}
        required
      />
    </FormControl>
  );
};

export default PasswordField;
