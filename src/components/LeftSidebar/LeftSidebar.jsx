import { Box } from "@mui/material";
import React, { useState } from "react";
import "./LeftSidebar.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/twitter.png";
import LeftNavlink from "./LeftNavlink";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Person2Icon from "@mui/icons-material/Person2";
import MoreIcon from "@mui/icons-material/More";
import ProfileButton from "./ProfileButton";
import OpenPostForm from "./OpenPostForm";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styled from "@emotion/styled";
import WestIcon from "@mui/icons-material/West";

const links = [
  {
    to: "/",
    icon: (
      <div className="home-icon">
        <HomeIcon className="fs-3" />
      </div>
    ),
    title: "Home",
  },
  {
    to: "../explore",
    icon: <SearchIcon className="fs-3" />,
    title: "Explore",
  },
  {
    to: "../notification",
    icon: <NotificationsIcon className="fs-3" />,
    title: "Notifications",
  },
  {
    to: "../messages",
    icon: <MailOutlineIcon className="fs-3" />,
    title: "Messages",
  },
  {
    to: "../bookmarks",
    icon: <BookmarkBorderIcon className="fs-3" />,
    title: "Bookmarks",
  },
  {
    to: "../lists",
    icon: <ListAltIcon className="fs-3" />,
    title: "Lists",
  },
  {
    to: "../profile",
    icon: <Person2Icon className="fs-3" />,
    title: "Profile",
  },
  {
    to: "../more",
    icon: <MoreIcon className="fs-3" />,
    title: "More",
  },
];

const RightArrow = styled(ArrowRightAltIcon)`
  display: none;

  @media only screen and (max-width: 890px) {
    display: block;
    position: absolute;
    left: 14px;
    top: 10px;
    font-size: 34px;
  }
`;

const LeftSidebar = () => {
  const [openLeftNav, setOpenLeftNav] = useState(false);

  return (
    <Box>
      <RightArrow onClick={() => setOpenLeftNav(true)} />
      <nav className={`left-side-nav ${openLeftNav && "open-nav"}`}>
        <div className="logo">
          <Link className="link" to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <div className="close-icon" onClick={() => setOpenLeftNav(false)}>
            <WestIcon />
          </div>
        </div>
        <div className="nav-links">
          {links.map((item, ind) => (
            <LeftNavlink
              key={ind}
              to={item.to}
              icon={item.icon}
              title={item.title}
            />
          ))}

          <OpenPostForm />
          <ProfileButton />
        </div>
      </nav>
    </Box>
  );
};

export default LeftSidebar;
