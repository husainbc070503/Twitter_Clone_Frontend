import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import SearchBox from "../RightSidebar/SearchBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NewListForm from "./NewListModal";

const ListsTop = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <div>
      <div className="py-2 px-3">
        <Grid container spacing={2} alignItems="center">
          <Grid item md={1} xs={2}>
            <ArrowBackIcon
              color="secondary"
              className="icon"
              onClick={() => navigate(-1)}
            />
          </Grid>
          <Grid item md={11} xs={10}>
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item md={11} xs={10}>
                <SearchBox
                  title="Search Lists"
                  search={search}
                  handleChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              <Grid item md={1} xs={2}>
                <NewListForm />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ListsTop;
