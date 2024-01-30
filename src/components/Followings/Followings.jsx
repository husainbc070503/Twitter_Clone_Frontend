import React from "react";
import { useGlobalContext } from "../../contexts/TwitterContext";
import { Box, Typography } from "@mui/material";
import UserCard from "../User/UserCard";

const Followings = () => {
  const { users, user } = useGlobalContext();
  const followings = users?.filter((item) =>
    item?.followers?.find((e) => e?._id === user?.user?._id)
  );

  const followers = users?.filter((item) =>
    item?.following?.find((e) => e?._id === user?.user?._id)
  );

  return (
    <div>
      <div className="border-bottom">
        {followings?.length > 0 ? (
          <>
            <Typography
              color="secondary"
              className="p-3"
              fontSize={20}
              fontWeight="bold"
            >
              Followings
            </Typography>
            {followings?.map((item) => {
              const { name, profile, joinedOn, twitterId, _id } = item;
              return (
                <UserCard
                  profile={profile}
                  name={name}
                  _id={_id}
                  twitterId={twitterId}
                  joinedOn={joinedOn}
                  fromFollowings={true}
                />
              );
            })}
          </>
        ) : (
          <Typography className="p-3" fontSize={20}>
            No Followings
          </Typography>
        )}
      </div>
      <div className="border-bottom">
        {followers?.length > 0 && (
          <>
            <Typography
              color="secondary"
              className="p-3"
              fontSize={20}
              fontWeight="bold"
            >
              Followers
            </Typography>
            {followers?.map((item) => {
              const { name, profile, joinedOn, twitterId, _id } = item;
              return (
                <UserCard
                  profile={profile}
                  name={name}
                  _id={_id}
                  twitterId={twitterId}
                  joinedOn={joinedOn}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Followings;
