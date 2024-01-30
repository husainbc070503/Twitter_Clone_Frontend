import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../contexts/TwitterContext";
import "./Posts.css";
import PostCard from "./PostCard";

const Post = () => {
  const { id } = useParams();
  const { posts, replies } = useGlobalContext();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  const postReplies = replies?.filter(
    (item) => item?.post?._id === id && item?.parentReply === undefined
  );

  useEffect(() => {
    setPost(posts?.filter((item) => item?._id === id)[0]);
  }, [posts, id]);

  return (
    <div>
      <div className="top-navbar border border-bottom-0 top-0 p-3">
        <Grid container spacing={2}>
          <Grid item md={1} xs={2}>
            <ArrowBackIcon
              color="secondary"
              className="icon"
              onClick={() => navigate(-1)}
            />
          </Grid>
          <Grid item md={11} xs={10}>
            <Typography fontSize={20} fontWeight="bold" color="secondary">
              Post
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className="border">
        <PostCard
          postUser={post?.user}
          likes={post?.likes}
          description={post?.description}
          media={post?.media}
          mediaType={post?.mediaType}
          postedOn={post?.postedOn}
          postReplies={postReplies}
          fromSinglePost={true}
          _id={id}
        />
      </div>
    </div>
  );
};

export default Post;
