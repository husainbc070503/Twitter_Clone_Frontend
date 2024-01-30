import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import EditProfile from "./EditProfile";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";
import { useGlobalContext } from "../../contexts/TwitterContext";

const ProfileMid = ({ person, users, fromUser }) => {
  const { followUser, unFollowUser, user } = useGlobalContext();

  const followers = users?.filter((item) =>
    item?.following?.find((e) => e?._id === person?._id)
  );

  const followings = users?.filter((item) =>
    item?.followers?.find((e) => e?._id === person?._id)
  );

  return (
    <div>
      <div className="profile-back-image border-top border-bottom">
        <img src={person?.backgroundImage} alt={person?.name} />
      </div>
      <Grid container className="p-3 position-relative">
        <Grid item md={6} xs={6}>
          <div className="profile-image">
            <img src={person?.profile} alt={person?.name} />
          </div>
        </Grid>
        <Grid item md={6} xs={6} textAlign="end">
          {fromUser ? (
            !followers.find((item) => item?._id === user?.user?._id) ? (
              <Button
                variant="contained"
                className="Button follow-btn"
                onClick={() => followUser(person?._id)}
              >
                Follow
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                className="Button follow-btn"
                onClick={() => unFollowUser(person?._id)}
              >
                Unfollow
              </Button>
            )
          ) : (
            <EditProfile person={person} />
          )}
        </Grid>
      </Grid>
      <div className="border-bottom px-3 pb-3 pt-2">
        <Typography fontSize={28} fontWeight="bold">
          {person?.name}
        </Typography>
        <Typography fontSize={20} color="GrayText">
          @{person?.twitterId}
        </Typography>
        <Typography fontSize={17} color="GrayText" my={1}>
          <CalendarMonthIcon className="fs-5" /> Joined{" "}
          {moment(new Date(person?.joinedOn)).fromNow()}
        </Typography>
        <Typography
          color="secondary"
          className="mt-2 me-4"
          fontSize={18}
          display="inline-block"
        >
          <span className="fw-bold">{followers?.length}</span> Followers
        </Typography>
        <Typography
          color="secondary"
          className="mt-2"
          fontSize={18}
          display="inline-block"
        >
          <span className="fw-bold">{followings?.length}</span> Followings
        </Typography>
      </div>
    </div>
  );
};

export default ProfileMid;
