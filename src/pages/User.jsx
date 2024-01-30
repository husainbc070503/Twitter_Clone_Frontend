import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/TwitterContext";
import ProfileTop from "../components/Profile/ProfileTop";
import ProfileMid from "../components/Profile/ProfileMid";
import ProfileTabs from "../components/Profile/ProfileTabs";

const User = () => {
  const { id } = useParams();
  const { users, posts, replies } = useGlobalContext();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(users?.filter((item) => item?._id === id)[0]);
  }, [id, users]);

  const myPosts = posts?.filter((item) => item?.user?._id === user?._id);

  const myReplies = replies?.filter(
    (item) =>
      item?.replies?.find((e) => e?.user?._id === user?._id) ||
      (item?.user?._id === user?._id && item?.parentReply === undefined)
  );

  const likedPosts = posts?.filter((item) =>
    item?.likes?.find((e) => e?._id === user?._id)
  );

  return (
    <div className="border border-bottom-0">
      <ProfileTop name={user?.name} />
      <ProfileMid person={user} users={users} fromUser={true} />
      <ProfileTabs
        posts={myPosts}
        replies={myReplies}
        likedPosts={likedPosts}
      />
    </div>
  );
};

export default User;
