import { Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../contexts/TwitterContext";
import ListCard from "./ListCard";
import { Link } from "react-router-dom";

const PinnedLists = () => {
  const { pinnedLists } = useGlobalContext();

  return (
    <div className="border-top-0">
      <Typography
        color="secondary"
        className="p-3"
        fontSize={24}
        fontWeight="bold"
      >
        Pinned Lists
      </Typography>
      {pinnedLists?.length > 0 ? (
        pinnedLists?.map((list) => {
          const { backgroundImage, _id, name, followers, members, user } = list;
          return (
            <Link to={`../lists/${_id}`} key={_id} className="link">
              <ListCard
                backgroundImage={backgroundImage}
                name={name}
                followers={followers}
                members={members}
                user={user}
                fromPinnedList={true}
                _id={_id}
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
          Nothing to see here yet — pin your favorite Lists to access them
          quickly.
        </Typography>
      )}
    </div>
  );
};

export default PinnedLists;
