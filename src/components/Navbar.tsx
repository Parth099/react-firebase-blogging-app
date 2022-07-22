import { Link } from "react-router-dom";

/*
Nav bar will contain the login and logout button as well as redirection
*/

export default function Navbar() {
    return (
        <nav className="flex justify-between p-4 text-sp1 border-t-4 border-sp1 border-b-sp2 border-b-2 shadow-xl bg-sp4">
            <Link to={"/"} className="header-font text-4xl font-bold">
                Blogging App
            </Link>
            <div className="button-container flex gap-8 text-white">
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
