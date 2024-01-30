import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Grid } from "@mui/material";
import InputField from "../InputField";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../contexts/TwitterContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  maxWidth: "96%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const EditProfile = ({ person }) => {
  const { editProfile } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const [authperson, setAuthperson] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) =>
    setAuthperson({ ...authperson, [e.target.name]: e.target.value });

  const handleUploadBackImage = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error(`Please upload profile background`, {
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
        toast.success("Background Picture Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setAuthperson({ ...authperson, backgroundImage: finalRes.url });
      } else {
        toast.error("Failed to upload picture! Try again later!", {
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

  const handleUploadProfileImage = async (file) => {
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
        toast.success("Profile Picture Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setAuthperson({ ...authperson, profile: finalRes.url });
      } else {
        toast.error("Failed to upload picture! Try again later!", {
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

  React.useEffect(() => {
    setAuthperson(person);
  }, [person]);

  return (
    <div>
      <Button
        color="secondary"
        onClick={() => setOpen(true)}
        variant="outlined"
        className="Button edit-btn"
      >
        Edit Profile
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={24} fontWeight="bold" mb={1}>
            Edit Profile
          </Typography>
          <div className="edit-form">
            <div className="profile-back-image border-top border-bottom">
              <img src={authperson?.backgroundImage} alt={authperson?.name} />
              <label htmlFor="back-img" className="add-label">
                <AddAPhotoIcon className="icon text-light" />
              </label>
              <input
                type="file"
                accept="image/*"
                id="back-img"
                style={{ display: "none" }}
                onChange={(e) => handleUploadBackImage(e.target.files[0])}
              />
            </div>
            <Grid container className="p-3 position-relative">
              <Grid item md={6} xs={6}>
                <div className="profile-image editing">
                  <img src={authperson?.profile} alt={authperson?.name} />
                  <label htmlFor="back-img" className="add-label">
                    <AddAPhotoIcon className="icon text-light" />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="back-img"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleUploadProfileImage(e.target.files[0])
                    }
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={6}></Grid>
            </Grid>
            <Grid container spacing={2} mt={4}>
              <Grid item md={6} xs={12}>
                <InputField
                  type="text"
                  title="Name"
                  others="name"
                  value={authperson?.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputField
                  type="email"
                  title="Email"
                  others="email"
                  value={authperson?.email}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <InputField
              title="Bio"
              type="text"
              others="bio"
              multiline={true}
              rows={3}
              value={authperson?.bio}
              onChange={handleChange}
            />
            <InputField
              title="Location"
              type="text"
              others="location"
              value={authperson?.location}
              onChange={handleChange}
            />
            <InputField
              title="Website"
              type="text"
              others="website"
              value={authperson?.website}
              onChange={handleChange}
            />
          </div>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => editProfile(authperson, setLoading, setOpen)}
            disabled={loading}
          >
            Edit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditProfile;
