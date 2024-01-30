import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../contexts/TwitterContext";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Lists.css";
import Posts from "../Posts/Posts";
import NewListForm from "./NewListModal";

const List = () => {
  const { id } = useParams();
  const { lists, user, posts, followList, unfollowList } = useGlobalContext();
  const navigate = useNavigate();
  const [list, setList] = useState({});
  const [allMembersPosts, setAllMembersPosts] = useState([]);

  useEffect(() => {
    setList(lists?.filter((item) => item?._id === id)[0]);
  }, [lists, id]);

  useEffect(() => {
    setAllMembersPosts([
      posts?.filter((item) => {
        if (
          list?.members?.find((e) => item?.user?._id === e._id) ||
          item?.user?._id === list?.user?._id
        )
          return item;
      }),
    ]);
  }, [list, id, posts]);

  return (
    <div className="border border-bottom-0">
      <div className="border-bottom-0 px-3 py-1">
        <Grid container spacing={2} alignItems="center">
          <Grid item md={1} xs={2}>
            <ArrowBackIcon
              color="secondary"
              className="icon"
              onClick={() => navigate(-1)}
            />
          </Grid>
          <Grid item md={11} xs={10}>
            <Typography fontSize={22} fontWeight="bold" color="secondary">
              {list?.name}
            </Typography>
            <Typography color="GrayText">{list?.user?.twitterId}</Typography>
          </Grid>
        </Grid>
      </div>
      <div className="list-back-image border-top border-bottom">
        <img src={list?.backgroundImage} alt={list?.name} />
      </div>
      <div className="text-center py-3">
        <Typography fontSize={26} fontWeight="bold" color="secondary" mb={1}>
          {list?.name}
        </Typography>
        <div className="d-flex align-items-center justify-content-center">
          <Avatar src={list?.user?.profile} alt={list?.user?.name} />
          <span className="fs-6 mx-1 fw-bold">{list?.user?.name}</span>
          <span className="fs-6 mx-1">{list?.user?.twitterId}</span>
        </div>

        <div className="d-flex align-items-center justify-content-center mt-3">
          <Typography fontSize={18} className="mx-3">
            <span className="fw-bold">{list?.members?.length}</span> Members
          </Typography>
          <Typography fontSize={18} className="mx-3">
            <span className="fw-bold">{list?.followers?.length}</span> Followers
          </Typography>
        </div>

        {list?.user?._id === user?.user?._id ? (
          <NewListForm fromEdit={true} list={list} />
        ) : (
          <>
            {!list?.followers?.find(
              (item) => item?._id === user?.user?._id
            ) && (
              <Button
                className="Button list-btn pad mt-3"
                variant="contained"
                color="primary"
                onClick={() => followList(id)}
              >
                Follow
              </Button>
            )}

            {list?.followers?.find((item) => item?._id === user?.user?._id) && (
              <Button
                className="Button list-btn pad mt-3"
                variant="contained"
                color="error"
                onClick={() => unfollowList(id)}
              >
                UnFollow
              </Button>
            )}
          </>
        )}
      </div>
      <Posts posts={[...new Set(allMembersPosts)][0]} />
    </div>
  );
};

export default List;
