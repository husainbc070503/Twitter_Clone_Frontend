import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/TwitterContext";
import PostCard from "./PostCard";

const Posts = ({ posts }) => {
  const { replies } = useGlobalContext();

  return (
    <div className="border-top">
      {posts?.map((item, ind) => {
        const { media, description, user, _id, likes, postedOn, mediaType } =
          item;
        const postReplies = replies?.filter(
          (item) => item?.post?._id === _id && item?.parentReply === undefined
        );

        return (
          <PostCard
            key={ind}
            postUser={user}
            _id={_id}
            likes={likes}
            postReplies={postReplies}
            media={media}
            description={description}
            postedOn={postedOn}
            mediaType={mediaType}
          />
        );
      })}
    </div>
  );
};

export default Posts;
