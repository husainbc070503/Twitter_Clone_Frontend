import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "@mui/material/Tabs";
import React from "react";
import Posts from "../Posts/Posts";
import Replies from "../Replies/Replies";

const ProfileTabs = ({ posts, replies, likedPosts }) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width"
        className="border-bottom"
      >
        <Tab label="Posts" className="fw-bold fs-6" value="1" />
        <Tab label="Replies" className="fw-bold fs-6" value="2" />
        <Tab label="Likes" className="fw-bold fs-6" value="3" />
      </Tabs>
      <TabPanel value="1" className="p-0">
        <Posts posts={posts} />
      </TabPanel>
      <TabPanel value="2" className="p-0">
        <Replies replies={replies} />
      </TabPanel>
      <TabPanel value="3" className="p-0">
        <Posts posts={likedPosts} />
      </TabPanel>
    </TabContext>
  );
};

export default ProfileTabs;
