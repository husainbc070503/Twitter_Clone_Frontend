import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGlobalContext } from "../contexts/TwitterContext";
import { Avatar, CardMedia, Grid, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import moment from "moment";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Bookmarks = () => {
  const { bookmarks, removeBookmark } = useGlobalContext();
  const navigate = useNavigate();

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
              Bookmarks
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className="border-top">
        {bookmarks?.map((item, ind) => {
          const { user, description, media, _id, postedOn, mediaType } = item;
          return (
            <div className="border border-top-0 p-3" key={ind}>
              <Grid container spacing={2}>
                <Grid item md={1} xs={12}>
                  <Avatar src={user?.profile} alt={user?.name} />
                </Grid>
                <Grid item md={11} xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item md={11} xs={11}>
                      <Link className="link" to={`../user/${user?._id}`}>
                        <Typography
                          display="inline-block"
                          fontSize={18}
                          color="secondary"
                          fontWeight="bold"
                        >
                          {user?.name}
                        </Typography>
                      </Link>
                      <VerifiedIcon
                        color="primary"
                        className="me-2 ms-1 fs-5"
                      />
                      <Typography color="GrayText" display="inline-block">
                        @{user?.twitterId} / {moment(postedOn).fromNow()}
                      </Typography>
                      <Typography color="secondary" fontSize={18}>
                        {description}
                      </Typography>
                    </Grid>
                    <Grid item md={1} xs={1}>
                      <Tooltip placement="bottom" title="Remove from bookmarks">
                        <BookmarkIcon
                          color="secondary"
                          className="icon"
                          onClick={() => removeBookmark(_id)}
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>

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
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmarks;
