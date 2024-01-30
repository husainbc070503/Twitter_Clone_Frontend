import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import X from "../assets/twitter.png";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import { useGlobalContext } from "../contexts/TwitterContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  profile: "",
  twitterId: "",
};

const Authentication = () => {
  const [openReg, setOpenReg] = useState(false);
  const [authDetails, setAuthDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { registerUser, loginUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setAuthDetails({ ...authDetails, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);

    if (openReg) {
      if (authDetails.password !== authDetails.cpassword) {
        toast.error("Mismatch between passwords!!", {
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
        const data = await registerUser(authDetails);
        if (data.success) {
          toast.success("Account created. Please Login", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setOpenReg(false);
          setAuthDetails(initialState);
        } else {
          toast.error(data.message, {
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
    } else {
      try {
        const data = await loginUser(authDetails);
        if (data.success) {
          toast.success("Welcome to Twitter!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          localStorage.setItem("twitter-clone-user", JSON.stringify(data.user));
          setAuthDetails(initialState);
          navigate("/");
        } else {
          toast.error(data.message, {
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
    }
  };

  const handleUpload = async (file) => {
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

        setAuthDetails({ ...authDetails, profile: finalRes.url });
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

  return (
    <Container maxWidth="lg" className="auth-container">
      <Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item md={6} xs={12}>
            <div className="auth-image">
              <img src={X} alt="twitter" />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography
              fontSize={window.innerWidth > 890 ? 70 : 50}
              fontWeight="bold"
              color="secondary"
              mb={3}
            >
              Happening now
            </Typography>
            <Typography
              fontSize={window.innerWidth > 890 ? 40 : 30}
              fontWeight="bold"
              mb={4}
            >
              Join today.
            </Typography>

            <div className={openReg && "reg-form"}>
              {openReg && (
                <>
                  <InputField
                    type="text"
                    title="Name"
                    others="name"
                    value={authDetails.name}
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    title="Twitter ID"
                    others="twitterId"
                    value={authDetails.twitterId}
                    onChange={handleChange}
                  />
                </>
              )}

              <InputField
                type="email"
                title="Email Address"
                others="email"
                value={authDetails.email}
                onChange={handleChange}
              />
              <PasswordField
                title="Password"
                others="password"
                value={authDetails.password}
                onChange={handleChange}
                isFromLogin={true}
              />

              {openReg && (
                <>
                  <PasswordField
                    title="Repeat Password"
                    others="cpassword"
                    value={authDetails.cpassword}
                    onChange={handleChange}
                  />
                  <InputField
                    type="file"
                    title="Profile Picture"
                    onChange={(e) => handleUpload(e.target.files[0])}
                  />
                </>
              )}
            </div>

            <Button
              className="w-100"
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {openReg ? "Sign Up" : "Sign In"}
            </Button>

            <Grid container spacing={2} alignItems="center" mt={2} mb={3}>
              <Grid item md={5} xs={5}>
                <div className="line"></div>
              </Grid>
              <Grid item md={2} xs={2} textAlign="center">
                <Typography color="GrayText">or</Typography>
              </Grid>
              <Grid item md={5} xs={5}>
                <div className="line"></div>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              onClick={() => setOpenReg(!openReg)}
              className="w-100"
            >
              {openReg ? "Already have an account?" : "Create Account"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Authentication;
