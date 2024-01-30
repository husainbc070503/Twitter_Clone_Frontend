import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TwitterContext } from "./contexts/TwitterContext";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Post from "./components/Posts/Post";
import Bookmarks from "./pages/Bookmarks";
import Lists from "./pages/Lists";
import List from "./components/Lists/List";
import Profile from "./pages/Profile";
import User from "./pages/User";
import Index from "./pages/Index";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1d9bf0",
      },
      secondary: {
        main: "#0f1419",
      },
    },
    typography: {
      fontFamily: "Outfit",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <TwitterContext>
          <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route path="/" element={<Index />}>
              <Route path="/" element={<Home />} index />
              <Route path="post/:id" element={<Post />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="lists" element={<Lists />} />
              <Route path="lists/:id" element={<List />} />
              <Route path="profile" element={<Profile />} />
              <Route path="user/:id" element={<User />} />
            </Route>
          </Routes>
        </TwitterContext>
      </BrowserRouter>
      <ToastContainer transition={Zoom} />
    </ThemeProvider>
  );
}

export default App;
