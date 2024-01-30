import React, { useState } from "react";
import { useGlobalContext } from "../../contexts/TwitterContext";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import InputField from "../InputField";

const ReplyForm = ({ postId, fromReply, parentReply, parentUserName }) => {
  const { user, addReply, addReplyToReply } = useGlobalContext();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="border-top w-100">
      <Grid
        container
        alignItems={fromReply ? "center" : "flex-start"}
        className="p-3"
      >
        <Grid item md={1} xs={2}>
          <Avatar src={user?.user?.profile} alt={user?.user?.name} />
        </Grid>
        <Grid item md={9} xs={10}>
          {fromReply && (
            <Typography color="secondary" mb={1}>
              Replying to {parentUserName}
            </Typography>
          )}
          <InputField
            type="text"
            placeholder="Post you reply"
            fromPost={true}
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline={true}
            rows={1}
          />
        </Grid>
        <Grid item md={2} xs={12} textAlign="end">
          <Button
            className="Button post-btn"
            variant="contained"
            disabled={loading}
            onClick={() =>
              !fromReply
                ? addReply(text, postId, setLoading, setText)
                : addReplyToReply(
                    text,
                    postId,
                    parentReply,
                    setLoading,
                    setText
                  )
            }
          >
            Reply
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReplyForm;
