import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

//this component will handle sign in
export default function SignIn() {
    //dom pointers
    const emailRef = useRef<HTMLInputElement | null>(null);
    const pwRef = useRef<HTMLInputElement | null>(null);

    //event when submit is hit
    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault(); //do not refresh page
    };

    return (
        <section className="w-full mt-12 flex justify-center">
            <div className="w-176 bg-sp4 p-4 rounded-lg shadow-lg">
                <h2 className="header-font text-sp1 text-3xl pb-2 border-b-2 border-b-sp1">Login</h2>
                <form className="login-form flex flex-col mt-6" onSubmit={handleSumbit}>
                    <label htmlFor="email" className="text-sp1 text-xl font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="text-lg py-2 px-2 bg-sp3 text-white border-b-2 border-b-white"
                        placeholder="Type in email"
                        ref={emailRef}
                    />
                    <label htmlFor="password" className="text-sp1 text-xl font-bold">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="text-lg py-2 px-2 bg-sp3 text-white border-b-2 border-b-white"
                        placeholder="Type in password"
                        ref={pwRef}
                    />
                    <button type="submit" className="login-submit-btn mt-5 p-2 text-2xl font-bold ">
                        Sign in
                    </button>
                    <p className="text-center mt-2 text-white text-lg">
                        Need to{" "}
                        <Link to={"/sign-up"} className="text-sp1 italic hover:underline">
                            create an account
                        </Link>
                        ?
                    </p>
                </form>
            </div>
        </section>
    );
}
