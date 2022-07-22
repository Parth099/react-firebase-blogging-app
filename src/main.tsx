import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";

//auth
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/sign-in" element={<SignIn />}></Route>
                    <Route path="/sign-up" element={<SignUp />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
