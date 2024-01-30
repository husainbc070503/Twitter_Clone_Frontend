import { Avatar, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useGlobalContext } from "../../contexts/TwitterContext";

const ListCard = ({
  backgroundImage,
  name,
  user,
  members,
  followers,
  fromNewList,
  fromPinnedList,
  _id,
}) => {
  const { pinList, unpinList } = useGlobalContext();

  return (
    <div className="p-3 border-top">
      <Grid container spacing={2} alignItems="center">
        <Grid item md={1} xs={2}>
          <Avatar src={backgroundImage} alt={name} />
        </Grid>
        <Grid
          item
          md={fromNewList || fromPinnedList ? 10 : 11}
          xs={fromNewList || fromPinnedList ? 10 : 10}
        >
          <Typography
            fontSize={18}
            fontWeight="bold"
            color="secondary"
            display="inline-block"
          >
            {name} .
          </Typography>
          <Typography display="inline-block" className="ms-1" color="GrayText">
            Created by {user?.name}
          </Typography>
          <Typography color="GrayText">
            {members?.length} members . {followers?.length} followers
          </Typography>
        </Grid>
        {fromNewList && (
          <Grid item md={1} xs={1}>
            <Tooltip title="Pin List" placement="bottom">
              <PushPinIcon
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  pinList(_id);
                }}
              />
            </Tooltip>
          </Grid>
        )}
        {fromPinnedList && (
          <Grid item md={1} xs={1}>
            <Tooltip title="Unpin List" placement="bottom">
              <PushPinIcon
                color="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  unpinList(_id);
                }}
              />
            </Tooltip>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ListCard;
