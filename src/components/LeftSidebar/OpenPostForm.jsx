import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PostForm from "../Posts/PostForm";

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        className="Button left-btn"
      >
        Post
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={24} fontWeight="bold" mb={1}>
            Create Post
          </Typography>
          <PostForm fromOpen={true} setOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
}
