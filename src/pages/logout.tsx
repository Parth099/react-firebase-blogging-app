import { useAuth } from "../contexts/authContext";

interface LogoutProps {
    closeLogOutModal: () => void;
}

//this will handle the model logout prompt
export default function Logout(props: LogoutProps) {
    //for the signout function
    const authContext = useAuth();

    //funcs to handle logout choice
    const handleNo = () => {
        props.closeLogOutModal();
    };
    const handleYes = () => {
        //logout
        if (authContext?.logOut) {
            authContext.logOut();
        }
        //close modal
        handleNo();
    };

    return (
        <div className="w-176 bg-sp4 px-8 py-8 rounded-lg shadow-lg">
            <p className="text-2xl">
                Are you sure you want to <span className="header-font inline text-sp1">Log out</span> ?
            </p>
            <div className="flex mt-8 text-xl gap-4">
                <button className="model-selection" onClick={handleNo}>
                    No
                </button>
                <button className="model-selection" onClick={handleYes}>
                    Yes
                </button>
            </div>
        </div>
    );
}
