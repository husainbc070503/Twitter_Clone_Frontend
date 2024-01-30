import { Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length, onOtpChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (ind, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[ind] = value.substring(value.length - 1); // only one digit;
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");

    if (value && ind + 1 < length && inputs.current[ind + 1]) {
      inputs.current[ind + 1].focus();
    }

    if (combinedOtp.length === length) {
      onOtpChange(combinedOtp);
    }
  };

  const handleClick = (ind) => {
    // focus on empty spaces
    inputs.current[ind].setSelectionRange(1, 1);

    /* If some field is empty before current then focus there */
    if (ind > 0 && !otp[ind - 1]) {
      inputs.current[otp.indexOf("")].focus();
    }

    /* If some field is empty after current then focus there */
    if (ind < length && otp[ind + 1]) {
      inputs.current[otp.lastIndexOf("")].focus();
    }
  };

  const handleKeyDown = (ind, event) => {
    // backspaces
    const key = event.key;
    if (
      key === "Backspace" &&
      !otp[ind] &&
      ind - 1 >= 0 &&
      inputs.current[ind - 1]
    ) {
      // move to previous field if ind>0 and no input at current index and we have reference to prev field
      inputs.current[ind - 1].focus();
    }
  };

  useEffect(() => {
    if (inputs.current[0]) inputs.current[0].focus();
  }, []);

  return (
    <div>
      <Typography fontSize={18} fontWeight="bold">
        OTP
      </Typography>
      <div className="otp-container my-3">
        {otp.map((item, ind) => {
          return (
            <input
              key={ind}
              type="text"
              ref={(input) => (inputs.current[ind] = input)}
              value={item}
              className="form-control shadow-sm border broder-1 p-3 me-3 text-center"
              onChange={(e) => handleChange(ind, e.target.value)}
              onClick={(e) => handleClick(ind)}
              onKeyDown={(e) => handleKeyDown(ind, e)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OtpInput;
