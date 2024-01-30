import { Avatar, CardMedia, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ReplyForm from "../Replies/ReplyForm";
import Replies from "../Replies/Replies";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useGlobalContext } from "../../contexts/TwitterContext";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const PostCard = ({
  postUser,
  _id,
  description,
  media,
  postedOn,
  likes,
  postReplies,
  fromSinglePost,
  mediaType,
}) => {
  const {
    user,
    likePost,
    unlikePost,
    deletePost,
    addBookmark,
    bookmarks,
    removeBookmark,
  } = useGlobalContext();

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Date(date).toLocaleString(undefined, options);
  };

  return (
    <div className="border-bottom">
      <Grid container spacing={0.5} className="p-3">
        <Grid item md={1} xs={12}>
          <Avatar src={postUser?.profile} alt={postUser?.name} />
        </Grid>
        <Grid item md={11} xs={12} alignItems="center">
          {postUser?._id !== user?.user?._id ? (
            <Link className="link" to={`../user/${postUser?._id}`}>
              <Typography
                display="inline-block"
                fontSize={18}
                color="secondary"
                fontWeight="bold"
              >
                {postUser?.name}
              </Typography>
            </Link>
          ) : (
            <Typography
              display="inline-block"
              fontSize={18}
              color="secondary"
              fontWeight="bold"
            >
              {postUser?.name}
            </Typography>
          )}
          <VerifiedIcon color="primary" className="me-2 ms-1 fs-5" />
          <Typography color="GrayText" display="inline-block">
            @{postUser?.twitterId} / {moment(postedOn).fromNow()}
          </Typography>
          <Typography color="secondary" fontSize={18}>
            {description}
          </Typography>
          <Link to={`../post/${_id}`} className="link">
            {mediaType === "image" ? (
              <CardMedia
                component="img"
                image={media}
                className="mt-3 rounded-5"
              />
            ) : (
              <CardMedia
                component="video"
                image={media}
                className="mt-3 rounded-5"
                controls={true}
              />
            )}
          </Link>
          <Grid
            container
            justifyContent="space-between"
            py={2}
            alignItems="center"
          >
            <Grid item md={2} xs={2} textAlign="center">
              <Link to={`../post/${_id}`} className="link">
                <Tooltip title="Reply" placement="bottom">
                  <div>
                    <i className="icon fa-regular fa-comment text-secondary fs-5"></i>
                    <Typography
                      display="inline-block"
                      className="ms-1"
                      color="GrayText"
                    >
                      {postReplies?.length}
                    </Typography>
                  </div>
                </Tooltip>
              </Link>
            </Grid>
            {user?.user?._id !== postUser?._id && (
              <Grid item md={2} xs={2} textAlign="center">
                <Tooltip title="Repost" placement="bottom">
                  <AutorenewIcon className="icon text-secondary" />
                  <Typography
                    display="inline-block"
                    className="ms-1"
                    color="GrayText"
                  >
                    {Math.floor(Math.random() * 5)}
                  </Typography>
                </Tooltip>
              </Grid>
            )}
            <Grid item md={2} xs={2} textAlign="center">
              {likes?.find((item) => item?._id === user?.user?._id) ? (
                <Tooltip title="Like" placement="bottom">
                  <FavoriteIcon
                    className="icon"
                    color="error"
                    onClick={(e) => unlikePost(_id)}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Dislike" placement="bottom">
                  <FavoriteBorderIcon
                    className="icon text-secondary"
                    onClick={(e) => likePost(_id)}
                  />
                </Tooltip>
              )}
              <Typography
                display="inline-block"
                className="ms-1"
                color="GrayText"
              >
                {likes?.length}
              </Typography>
            </Grid>
            <Grid item md={2} xs={2} textAlign="center">
              {bookmarks.find((item) => item?._id === _id) ? (
                <Tooltip title="Remove Bookmark" placement="bottom">
                  <BookmarkIcon
                    className="icon text-secondary"
                    onClick={() => removeBookmark(_id)}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Bookmark Post" placement="bottom">
                  <BookmarkBorderIcon
                    className="icon text-secondary"
                    onClick={() => addBookmark(_id)}
                  />
                </Tooltip>
              )}
            </Grid>
            <Grid item md={2} xs={2} textAlign="center">
              <Tooltip title="Share Post" placement="bottom">
                <ShareIcon className="icon text-secondary" />
              </Tooltip>
            </Grid>
            {postUser?._id === user?.user?._id && (
              <Grid item md={2} xs={2} textAlign="center">
                <Tooltip title="Delete Post" placement="bottom">
                  <DeleteIcon
                    className="icon text-secondary"
                    onClick={() => deletePost(_id)}
                  />
                </Tooltip>
              </Grid>
            )}
          </Grid>
          {fromSinglePost && (
            <>
              <Typography color="GrayText" fontSize={17} my={1}>
                {formatDate(postedOn)}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      {fromSinglePost && (
        <div className="w-100">
          <ReplyForm postId={_id} />
          <Replies replies={postReplies} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
