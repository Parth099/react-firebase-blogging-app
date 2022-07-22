import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function SignUp() {
    //pointers to DOM
    const emailRef = useRef<HTMLInputElement | null>(null);
    const pwRef = useRef<HTMLInputElement | null>(null);
    const confirmPwRef = useRef<HTMLInputElement | null>(null);

    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault(); //do not refresh page
    };

    return (
        <section className="w-full mt-12 flex justify-center">
            <div className="w-176 bg-sp4 p-4 rounded-lg shadow-lg">
                <h2 className="header-font text-sp1 text-3xl pb-2 border-b-2 border-b-sp1">Create an Account</h2>
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
                    <label htmlFor="password-conf" className="text-sp1 text-xl font-bold">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="password-conf"
                        className="text-lg py-2 px-2 bg-sp3 text-white border-b-2 border-b-white"
                        placeholder="Type in password"
                        ref={confirmPwRef}
                    />
                    <button type="submit" className="login-submit-btn mt-5 p-2 text-2xl font-bold ">
                        Sign Up
                    </button>
                    <p className="text-center mt-2 text-white text-lg">
                        Aready have an account?{" "}
                        <Link to={"/sign-in"} className="text-sp1 font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}