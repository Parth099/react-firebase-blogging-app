import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import useModal from "../hooks/useModal";
import Logout from "./auth/Logout";

/*
Nav bar will contain the login and logout button as well as redirection
*/

export default function Navbar() {
    const [logOutModalStatus, openLogOutModal, closeLogOutModal] = useModal();
    const authContext = useAuth();

    const isLoggedIn = authContext?.currentUser;

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
                    <a className="auth-btn self-center font-bold text-xl hover:text-sp1 cursor-pointer" onClick={openLogOutModal}>
                        Log out
                    </a>
                )}
                {logOutModalStatus != 0 && (
                    <div className="overlay">
                        <Logout closeLogOutModal={closeLogOutModal} />
                    </div>
                )}
            </div>
        </nav>
    );
}
