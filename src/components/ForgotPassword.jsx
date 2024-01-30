import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import { toast } from "react-toastify";
import { api } from "../constants/Api";
import OtpInput from "./OtpInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  maxWidth: "96%",
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
  maxWidth: "94%",
};

const initialState = {
  email: "",
  otp: "",
  password: "",
  cpassword: "",
};

const ForgotPassword = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openPass, setOpenPass] = React.useState(false);
  const [details, setDetails] = React.useState(initialState);
  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const onOtpChange = (otp) => setDetails({ ...details, otp });

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/user/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      if (data.success) {
        toast.info("OTP Send. Check your mail", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOpenPass(true);
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
  };

  const updatePassword = async () => {
    setLoading(true);
    if (details.password !== details.cpassword) {
      toast.error("Mismatch password and re-entered password!", {
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
      const res = await fetch(`${api}/api/user/updatePassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Password Updated. Please Login", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOpenPass(false);
        setDetails(initialState);
        setOpen(false);
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
  };

  return (
    <div>
      <Typography
        fontSize={14}
        color="GrayText"
        sx={{ cursor: "pointer" }}
        onClick={() => setOpen(true)}
      >
        Forgot Password?
      </Typography>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={24} fontWeight="bold" mb={3}>
            {openPass ? "Update Password" : "Enter email to send OTP"}
          </Typography>
          {!openPass ? (
            <InputField
              type="email"
              title="Email Address"
              others="email"
              value={details.email}
              onChange={handleChange}
              autoFocus={true}
            />
          ) : (
            <>
              <OtpInput length={4} onOtpChange={onOtpChange} />
              <PasswordField
                title="Password"
                others="password"
                value={details.password}
                onChange={handleChange}
              />
              <PasswordField
                title="Re-enter Password"
                others="cpassword"
                value={details.cpassword}
                onChange={handleChange}
              />
            </>
          )}
          <Button
            color="primary"
            className="mt-3"
            variant="contained"
            onClick={!openPass ? sendOtp : updatePassword}
            disabled={loading}
          >
            {openPass ? "Update" : "Send OTP"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
