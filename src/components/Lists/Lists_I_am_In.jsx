import { Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../contexts/TwitterContext";
import { Link } from "react-router-dom";
import ListCard from "./ListCard";

const Lists_I_am_In = () => {
  const { lists, user } = useGlobalContext();
  const listsIAmIn = lists?.filter(
    (item) =>
      item?.members?.find((e) => e?._id === user?.user?._id) ||
      item?.user?._id === user?.user?._id
  );

  return (
    <div className="border-top ">
      <Typography
        color="secondary"
        className="p-3"
        fontSize={24}
        fontWeight="bold"
      >
        Lists I'm In
      </Typography>
      {listsIAmIn?.length > 0 ? (
        listsIAmIn?.map((list) => {
          const { backgroundImage, _id, name, followers, members, user } = list;
          return (
            <Link to={`../lists/${_id}`} key={_id} className="link">
              <ListCard
                backgroundImage={backgroundImage}
                name={name}
                followers={followers}
                members={members}
                user={user}
              />
            </Link>
          );
        })
      ) : (
        <Typography
          color="GrayText"
          textAlign="justify"
          className="p-3 border-top"
        >
          None of users added you as a member in your list.
        </Typography>
      )}
    </div>
  );
};

export default Lists_I_am_In;
