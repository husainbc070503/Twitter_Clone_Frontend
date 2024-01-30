import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "@mui/material/Tabs";
import PostForm from "../components/Posts/PostForm";
import Posts from "../components/Posts/Posts";
import { useGlobalContext } from "../contexts/TwitterContext";
import Followings from "../components/Followings/Followings";

const Home = () => {
  const [value, setValue] = React.useState("1");
  const { posts } = useGlobalContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="home-container w-100 border border-bottom-0">
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
          <Tab label="For You" className="fw-bold fs-6" value="1" />
          <Tab label="Following" className="fw-bold fs-6" value="2" />
        </Tabs>
        <TabPanel value="1" className="p-0">
          <PostForm />
          <Posts posts={posts} />
        </TabPanel>
        <TabPanel value="2" className="p-0">
          <Followings />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Home;
