import { Container, Grid } from "@mui/material";
import React from "react";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <Container maxWidth="xl">
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-start"
        pb={4}
      >
        <Grid item md={2} xs={12}>
          <LeftSidebar />
        </Grid>
        <Grid item md={6} xs={12} className="Grid mobile-grid">
          <Outlet />
        </Grid>
        <Grid item md={3} xs={12}>
          <RightSidebar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
