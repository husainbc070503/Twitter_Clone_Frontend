import React from "react";
import ReplyCard from "./ReplyCard";

const Replies = ({ replies }) => {
  return (
    <div>
      {replies?.map((item, ind) => {
        const {
          text,
          post,
          user,
          repliedOn,
          _id,
          replies,
          likes,
          parentReply,
        } = item;

        return (
          <ReplyCard
            key={ind}
            repliedUser={user}
            repliedOn={repliedOn}
            replies={replies}
            likes={likes}
            text={text}
            post={post}
            _id={_id}
            parentReply={parentReply}
          />
        );
      })}
    </div>
  );
};

export default Replies;
