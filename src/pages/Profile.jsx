import React from "react";
import { useGlobalContext } from "../contexts/TwitterContext";
import "../components/Profile/Profile.css";
import ProfileTop from "../components/Profile/ProfileTop";
import ProfileMid from "../components/Profile/ProfileMid";
import ProfileTabs from "../components/Profile/ProfileTabs";

const Profile = () => {
  const { user, users, posts, replies } = useGlobalContext();
  const myPosts = posts?.filter((item) => item?.user?._id === user?.user?._id);

  const myReplies = replies?.filter(
    (item) =>
      item?.replies?.find((e) => e?.user?._id === user?.user?._id) ||
      (item?.user?._id === user?.user?._id && item?.parentReply === undefined)
  );

  const likedPosts = posts?.filter((item) =>
    item?.likes?.find((e) => e?._id === user?.user?._id)
  );

  return (
    <div className="border border-bottom-0">
      <ProfileTop name={user?.user?.name} />
      <ProfileMid person={user?.user} users={users} />
      <ProfileTabs
        posts={myPosts}
        replies={myReplies}
        likedPosts={likedPosts}
      />
    </div>
  );
};

export default Profile;
