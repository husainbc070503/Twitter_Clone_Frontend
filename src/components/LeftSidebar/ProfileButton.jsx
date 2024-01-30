import React from "react";
import { useGlobalContext } from "../../contexts/TwitterContext";
import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ProfileButton = () => {
  const { user, handleLogout } = useGlobalContext();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <Grid
      container
      alignItems="center"
      spacing={2}
      position="absolute"
      bottom={window.innerWidth <= 890 ? 30 : 10}
    >
      <Grid item md={2} xs={2}>
        <Avatar src={user?.user?.profile} alt={user?.user?.name} />
      </Grid>
      <Grid item md={8} xs={7}>
        <Typography fontSize={18} color="secondary">
          {user?.user?.name}
        </Typography>
        <Typography fontSize={16} color="secondary">
          @{user?.user?.twitterId}
        </Typography>
      </Grid>
      <Grid item md={1} xs={2}>
        <div>
          <IconButton onClick={handleOpenUserMenu} className="IconButton">
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography onClick={handleLogout}>Logout</Typography>
            </MenuItem>
          </Menu>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProfileButton;
