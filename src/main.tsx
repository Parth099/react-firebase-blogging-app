import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";

//auth
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateABlogPost from "./components/blog/CreateABlogPost";
import Profile from "./components/profile/Profile";
import EditBlogPost from "./components/blog/EditBlogPost";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter basename="/react-firebase-blogging-app">
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/sign-in" element={<SignIn />}></Route>
                    <Route path="/sign-up" element={<SignUp />}></Route>
                    <Route path="/create-blog-post" element={<CreateABlogPost />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/edit-post/:blogID" element={<EditBlogPost />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
