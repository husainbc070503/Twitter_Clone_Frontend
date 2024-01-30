import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../contexts/TwitterContext";
import ListCard from "./ListCard";
import { Link } from "react-router-dom";

const NewLists = () => {
  const { lists, user, pinnedLists } = useGlobalContext();
  const newLists = lists?.filter(
    (item) =>
      item?.user?._id !== user?.user?._id &&
      !pinnedLists?.find((e) => e?._id === item?._id)
  );

  return (
    <div className="border-top">
      <Typography
        color="secondary"
        className="p-3"
        fontSize={24}
        fontWeight="bold"
      >
        Discover New Lists
      </Typography>
      {newLists?.length > 0 ? (
        newLists?.map((list) => {
          const { backgroundImage, _id, name, followers, members, user } = list;
          return (
            <Link to={`../lists/${_id}`} key={_id} className="link">
              <ListCard
                backgroundImage={backgroundImage}
                name={name}
                followers={followers}
                members={members}
                user={user}
                fromNewList={true}
                _id={_id}
              />
            </Link>
          );
        })
      ) : (
        <Typography color="GrayText" textAlign="justify" className="p-3 border-top">
          None of users created lists. Be first to create. Or might be you pinned lists
        </Typography>
      )}
    </div>
  );
};

export default NewLists;
