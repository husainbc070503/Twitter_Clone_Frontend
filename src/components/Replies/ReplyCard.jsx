import { Avatar, Grid, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyForm from "./ReplyForm";
import Replies from "./Replies";
import { useGlobalContext } from "../../contexts/TwitterContext";

const ReplyCard = ({
  repliedUser,
  replies,
  likes,
  text,
  repliedOn,
  post,
  _id,
  parentReply,
}) => {
  const [open, setOpen] = useState(false);
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

  const { likeReply, unlikeReply, user, deleteReply } = useGlobalContext();

  return (
    <div className="border-top">
      <Grid container className="p-3" spacing={1}>
        <Grid item md={1} xs={12}>
          <Avatar src={repliedUser?.profile} alt={repliedUser?.name} />
        </Grid>
        <Grid item md={11} xs={12} alignItems="center">
          <Link className="link" to={`../user/${repliedUser?._id}`}>
            <Typography
              display="inline-block"
              fontSize={18}
              color="secondary"
              fontWeight="bold"
            >
              {repliedUser?.name}
            </Typography>
          </Link>
          <VerifiedIcon color="primary" className="me-2 ms-1 fs-5" />
          <Typography color="GrayText" display="inline-block">
            @{repliedUser?.twitterId} / {moment(repliedOn).fromNow()}
          </Typography>
          {parentReply && (
            <Typography>Replied to {parentReply?.user?.name}</Typography>
          )}
          <Typography color="secondary" fontSize={18}>
            {text}
          </Typography>
          <Grid container py={2} alignItems="center">
            <Grid item md={2} xs={2} textAlign="start">
              <Tooltip title="Reply" placement="bottom">
                <div>
                  <i
                    className="icon fa-regular fa-comment text-secondary fs-5"
                    onClick={() => setOpen(!open)}
                  ></i>
                  <Typography
                    display="inline-block"
                    className="ms-1"
                    color="GrayText"
                  >
                    {replies?.length}
                  </Typography>
                </div>
              </Tooltip>
            </Grid>
            <Grid item md={2} xs={2} textAlign="start">
              <Tooltip title="Like" placement="bottom">
                {likes?.find((item) => item?._id === user?.user?._id) ? (
                  <FavoriteIcon
                    className="icon"
                    color="error"
                    onClick={() => unlikeReply(_id, parentReply?._id)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="icon text-secondary"
                    onClick={() => likeReply(_id, parentReply?._id)}
                  />
                )}
                <Typography
                  display="inline-block"
                  className="ms-1"
                  color="GrayText"
                >
                  {likes?.length}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item md={2} xs={2} textAlign="start">
              <Tooltip title="Share Reply" placement="bottom">
                <ShareIcon className="icon text-secondary" />
              </Tooltip>
            </Grid>
            {repliedUser?._id === user?.user?._id && (
              <Grid item md={2} xs={2} textAlign="start">
                <Tooltip title="Delete Reply" placement="bottom">
                  <DeleteIcon
                    className="icon text-secondary"
                    onClick={() =>
                      deleteReply(_id, post?._id, parentReply?._id)
                    }
                  />
                </Tooltip>
              </Grid>
            )}
          </Grid>
          {open && (
            <Typography fontSize={18} color="GrayText">
              {formatDate(repliedOn)}
            </Typography>
          )}
        </Grid>
      </Grid>
      {open && (
        <div className="w-100">
          <ReplyForm
            postId={post?._id}
            fromReply={true}
            parentReply={_id}
            parentUserName={repliedUser?.name}
          />
          <Replies replies={replies} />
        </div>
      )}
    </div>
  );
};

export default ReplyCard;
