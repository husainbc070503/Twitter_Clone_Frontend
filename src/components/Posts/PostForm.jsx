import { Avatar, Button, CardMedia, Grid } from "@mui/material";
import React, { useState } from "react";
import { useGlobalContext } from "../../contexts/TwitterContext";
import InputField from "../InputField";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./Posts.css";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

const initialState = {
  description: "",
  media: "",
  mediaType: "",
};

const PostForm = ({ fromOpen, setOpen }) => {
  const { user, addPost } = useGlobalContext();
  const [postDetails, setPostDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value });

  const handleImageUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error(`Please upload profile pic`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only JPEG or PNG images are accepted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "twitter-clone");
      data.append("cloud", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const finalRes = await res.json();
      if (finalRes) {
        toast.success("Image Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setPostDetails({
          ...postDetails,
          media: finalRes.url,
          mediaType: "image",
        });
      } else {
        toast.error("Failed to upload image! Try again later!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error(`Please upload profile pic`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (file.type !== "video/mp4") {
      toast.error("Only mp4 videos are accepted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/video/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "twitter-clone");
      data.append("cloud", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const finalRes = await res.json();
      if (finalRes) {
        toast.success("Video Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setPostDetails({
          ...postDetails,
          media: finalRes.url,
          mediaType: "video",
        });
      } else {
        toast.error("Failed to upload video! Try again later!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <Grid container alignItems="flex-start">
        <Grid item md={1} xs={2}>
          <Avatar src={user?.user?.profile} alt={user?.user?.name} />
        </Grid>
        <Grid item md={11} xs={10}>
          <InputField
            type="text"
            multiline={true}
            rows={2}
            fromPost={true}
            placeholder="What is happening?!"
            others="description"
            value={postDetails.description}
            onChange={handleChange}
          />
          {postDetails.media !== "" ? (
            postDetails.mediaType === "video" ? (
              <div className="position-relative my-4">
                <CardMedia
                  component="video"
                  image={postDetails.media}
                  className="mt-3 rounded-5"
                  controls={true}
                />
                <div className="position-absolute top-0 mx-3 my-3 end-0 bg-light icon p-2 rounded-circle d-flex align-items-center justify-content-center">
                  <CloseIcon
                    onClick={() =>
                      setPostDetails({
                        ...postDetails,
                        media: "",
                        mediaType: "",
                      })
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="position-relative my-4">
                <CardMedia
                  component="img"
                  image={postDetails.media}
                  className="mt-3 rounded-5"
                />
                <div className="position-absolute top-0 mx-3 my-3 end-0 bg-light icon p-2 rounded-circle d-flex align-items-center justify-content-center">
                  <CloseIcon
                    onClick={() =>
                      setPostDetails({
                        ...postDetails,
                        media: "",
                        mediaType: "",
                      })
                    }
                  />
                </div>
              </div>
            )
          ) : (
            ""
          )}
          <Grid container alignItems="center">
            <Grid item md={8} xs={6}>
              <label htmlFor="media">
                <AddPhotoAlternateIcon className="icon" color="primary" />
              </label>
              <input
                type="file"
                id="media"
                accept="image/*,video/*"
                style={{ display: "none" }}
                onChange={(e) =>
                  e.target.files[0].type === "video/mp4"
                    ? handleVideoUpload(e.target.files[0])
                    : handleImageUpload(e.target.files[0])
                }
              />
            </Grid>
            <Grid item md={4} xs={6} textAlign="end">
              <Button
                variant="contained"
                className="Button post-btn"
                disabled={loading}
                onClick={() =>
                  addPost(
                    postDetails,
                    setLoading,
                    setPostDetails,
                    initialState,
                    fromOpen && fromOpen,
                    fromOpen && setOpen
                  )
                }
              >
                Post
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostForm;
