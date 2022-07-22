import React from "react";
import { Link } from "react-router-dom";

/*
Nav bar will contain the login and logout button as well as redirection
*/

export default function Navbar() {
    return (
        <nav className="flex justify-between p-4 text-sp1 border-t-4 border-sp1 border-b-[#f2f2f2] border-b-2 shadow-sm">
            <h1 className="header-font text-4xl font-bold">Blogging App</h1>
            <div className="button-container flex gap-8 text-black">
                <Link to={"/sign-in"} className="auth-btn self-center font-bold text-xl hover:text-sp1">
                    Login
                </Link>
                <Link to={"/sign-out"} className="auth-btn self-center font-bold text-xl hover:text-sp1">
                    Log out
                </Link>
            </div>
        </nav>
    );
}
