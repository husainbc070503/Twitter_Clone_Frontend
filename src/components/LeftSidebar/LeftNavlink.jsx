import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const LeftNavlink = ({ icon, title, to }) => {
  return (
    <Box className="Box left-link-box">
      <NavLink to={to} className="link left-nav-link">
        <Grid container columnSpacing={2} alignItems="center">
          <Grid item md={2.5}>
            {icon}
          </Grid>
          <Grid item md={8.5}>
            <Typography fontSize={22} color="secondary" className="Typography">
              {title}
            </Typography>
          </Grid>
        </Grid>
      </NavLink>
    </Box>
  );
};

export default LeftNavlink;
