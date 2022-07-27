import React, { useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import useModal from "../hooks/useModal";
import Logout from "./auth/Logout";

/*
Nav bar will contain the login and logout button as well as redirection
*/

export default function Navbar() {
    //hook for logout "are you sure" modal
    const [logOutModalStatus, openLogOutModal, closeLogOutModal] = useModal();

    //to display the correct set of buttons based on loggged in status
    const authContext = useAuth();

    const isLoggedIn = authContext?.currentUser;
    const navigate = useNavigate();
    const location = useLocation();

    //used to force a sign in
    useEffect(() => {
        //if firebase has not even loaded the session do not force a sign in
        if (!authContext?.firstLoadCompleted) {
            return;
        }
        const pwd = location.pathname;
        if (!isLoggedIn && pwd != "/sign-in" && pwd != "/sign-up") {
            navigate("/sign-in");
        }

        //dpd array has location hook, useEffect is ran each time a new url loaded
        //dpd array has auth context, we will run this effect on a user change (sign-out)
    }, [location, authContext]);

    //give the user to close modal if they click outside of it
    const handleOverlayClicks = (e: React.MouseEvent<HTMLDivElement>) => {
        let containsOverlayClass = (e.target as Element).classList.contains("overlay");
        if (containsOverlayClass) {
            closeLogOutModal();
        }
    };

    return (
        <nav className="flex justify-between p-4 text-sp1 border-t-4 border-sp1 border-b-sp2 border-b-2 shadow-xl bg-sp4">
            <Link to={"/"} className="header-font text-4xl font-bold">
                Blogging App
            </Link>
            <div className="button-container flex gap-8 text-white">
                {!isLoggedIn /* render if no one is logged in */ && (
                    <Link to={"/sign-in"} className="auth-btn self-center font-bold text-xl hover:text-sp1">
                        Sign in
                    </Link>
                )}
                {isLoggedIn /* render if  logged in */ && (
                    <>
                        <Link to={"/create-blog-post"} className="auth-btn self-center font-bold text-xl hover:text-sp1">
                            Create a Blog Post
                        </Link>
                        <Link to={"/profile"} className="auth-btn self-center font-bold text-xl hover:text-sp1">
                            My Profile
                        </Link>
                        <a className="auth-btn self-center font-bold text-xl hover:text-sp1 cursor-pointer" onClick={openLogOutModal}>
                            Log out
                        </a>
                    </>
                )}
                {logOutModalStatus && (
                    <div className="overlay" onClick={handleOverlayClicks}>
                        <Logout closeLogOutModal={closeLogOutModal} />
                    </div>
                )}
            </div>
        </nav>
    );
}
