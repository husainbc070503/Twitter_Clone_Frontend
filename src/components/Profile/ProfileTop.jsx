import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileTop = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div className="border-bottom-0  px-3 py-2">
      <Grid container spacing={2} alignItems="center">
        <Grid item md={1} xs={2}>
          <ArrowBackIcon
            color="secondary"
            className="icon"
            onClick={() => navigate(-1)}
          />
        </Grid>
        <Grid item md={11} xs={10}>
          <Typography fontSize={22} fontWeight="bold" color="secondary">
            {name}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileTop;
