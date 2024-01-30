import React from "react";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import moment from "moment";
import "./UserCard.css";
import { useGlobalContext } from "../../contexts/TwitterContext";
import { Link } from "react-router-dom";

const UserCard = ({
  profile,
  name,
  twitterId,
  _id,
  joinedOn,
  fromFollowings,
  fromUsers,
}) => {
  const { followUser, unFollowUser, user } = useGlobalContext();

  return (
    <div className="border-top p-3">
      <Grid container spacing={2} alignItems="center">
        <Grid item md={fromUsers ? 2 : 1} xs={fromUsers ? 2 : 2}>
          <Avatar src={profile} alt={name} />
        </Grid>
        <Grid
          item
          md={fromFollowings ? 8 : fromUsers ? 10 : 11}
          xs={fromFollowings ? 8 : fromUsers ? 10 : 10}
        >
          {_id !== user?.user?._id ? (
            <Link className="link" to={`/user/${_id}`}>
              <Typography
                display="inline-block"
                fontSize={18}
                color="secondary"
                fontWeight="bold"
              >
                {name}
              </Typography>
            </Link>
          ) : (
            <Typography
              display="inline-block"
              fontSize={18}
              color="secondary"
              fontWeight="bold"
            >
              {name}
            </Typography>
          )}
          <Typography color="GrayText" display="inline-block" className="ms-1">
            @{twitterId}
          </Typography>
          <Typography color="GrayText">
            Joined {moment(joinedOn).fromNow()}
          </Typography>
        </Grid>
        {fromFollowings && (
          <Grid item md={3} textAlign="end" xs={3}>
            <Button
              color="secondary"
              variant="contained"
              className="Button btn"
              onClick={() => unFollowUser(_id)}
            >
              Unfollow
            </Button>
          </Grid>
        )}
        {fromUsers && (
          <Grid item md={3} textAlign="end" xs={3}>
            <Button
              variant="contained"
              className="Button btn"
              onClick={() => followUser(_id)}
            >
              Follow
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default UserCard;
