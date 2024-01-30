import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import "./RightSidebar.css";
import SearchBox from "./SearchBox";
import { useGlobalContext } from "../../contexts/TwitterContext";
import UserCard from "../User/UserCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styled from "@emotion/styled";

const ExpandMore = styled(ExpandMoreIcon)`
  display: none;

  @media only screen and (max-width: 890px) {
    display: block;
    position: absolute;
    right: 14px;
    top: 10px;
    font-size: 34px;
  }
`;

const RightSidebar = () => {
  const [search, setSearch] = useState("");
  const { users, user } = useGlobalContext();

  const filteredUsers = users?.filter(
    (item) =>
      item?._id !== user?.user?._id &&
      (!item?.followers?.find((e) => e?._id === user?.user?._id) ||
        item?.followers?.length === 0)
  );

  const data = [
    {
      id: 1,
      subtitle: "Trending In India",
      title: "HAPPY B'DAY WINNER MUNAWAR",
      posts: `${Math.floor(Math.random() * 500)} posts`,
    },
    {
      id: 2,
      subtitle: "Trending In India",
      title: "Siraj Bumrah",
      posts: `${Math.floor(Math.random() * 500)} posts`,
    },
    {
      id: 1,
      subtitle: "Trending In India",
      title: "#IND VS ENG",
      posts: `${Math.floor(Math.random() * 500)} posts`,
    },
    {
      id: 1,
      subtitle: "Trending In India",
      title: "#MunawarFaraqui",
      posts: `${Math.floor(Math.random() * 500)} posts`,
    },
    {
      id: 1,
      subtitle: "Trending In India",
      title: "#FilmfareAwards2024",
      posts: `${Math.floor(Math.random() * 500)} posts`,
    },
  ];

  const [openRightNav, setOpenRightNav] = useState(false);

  return (
    <>
      <ExpandMore onClick={() => setOpenRightNav(true)} />
      <div className={`p-2 right-sidebar ${openRightNav && "openNav"}`}>
        <div className="close-icon" onClick={() => setOpenRightNav(false)}>
          <ExpandLessIcon />
        </div>
        <SearchBox
          title="Search user to follow"
          search={search}
          handleChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <div className="users rounded-5 mt-3 whats-happening">
          <Typography
            color="secondary"
            className="p-3"
            fontSize={22}
            fontWeight="bold"
          >
            Relevant Peoples
          </Typography>
          {filteredUsers
            ?.filter((item) => item?.name?.toLowerCase()?.includes(search))
            ?.map((item) => {
              const { name, profile, joinedOn, twitterId, _id } = item;
              return (
                <UserCard
                  profile={profile}
                  name={name}
                  _id={_id}
                  twitterId={twitterId}
                  joinedOn={joinedOn}
                  fromUsers={true}
                />
              );
            })}
        </div>
        <div className="whats-happening my-3 p-3 rounded-5">
          <Typography fontWeight="bold" fontSize={22} mb={1}>
            Subscribe to Premium
          </Typography>
          <Typography fontSize={16} textAlign="justify" color="GrayText" mb={2}>
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className="Button sub-btn"
          >
            Subscribe
          </Button>
        </div>
        <div className="mt-4 p-3 whats-happening rounded-5">
          <Typography fontSize={22} fontWeight="bold" mb={1}>
            What's happening
          </Typography>
          {data.map((item) => {
            const { id, title, subtitle, posts } = item;
            return (
              <div className="mb-4" key={id}>
                <Typography color="GrayText" fontSize={15}>
                  {subtitle}
                </Typography>
                <Typography fontSize={18} fontWeight="bold">
                  {title}
                </Typography>
                <Typography color="GrayText" fontSize={15}>
                  {posts}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
