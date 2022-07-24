import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function SignUp() {
    //pointers to DOM
    const emailRef = useRef<HTMLInputElement | null>(null);
    const pwRef = useRef<HTMLInputElement | null>(null);
    const confirmPwRef = useRef<HTMLInputElement | null>(null);

    const authContext = useAuth();
    const navigate = useNavigate();

    const handleSumbit = (e: React.FormEvent) => {
        //prevent refresh
        e.preventDefault();

        const email = emailRef.current?.value;
        const pw = pwRef.current?.value;
        const confpw = confirmPwRef.current?.value;

        //MUST fill in each field
        if (!email || !pw || !confpw) return;

        //passwords must be the same
        if (pw != confpw) return;

        //at this point we can attempt to genrate an account
        if (!authContext?.createAccount) return;

        authContext
            .createAccount(email, pw)
            .then(() => {
                //do some navigation in here
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <section className="w-full mt-12 flex justify-center">
            <div className="w-176 bg-sp4 p-4 rounded-lg shadow-lg">
                <h2 className="header-font text-sp1 text-3xl pb-2 border-b-2 border-b-sp1">Create an Account</h2>
                <form className="login-form flex flex-col mt-6" onSubmit={handleSumbit}>
                    <label htmlFor="email" className="std-label">
                        Email
                    </label>
                    <input type="email" id="email" className="input-field" placeholder="Type in email" ref={emailRef} required={true} />
                    <label htmlFor="password" className="std-label">
                        Password
                    </label>
                    <input type="password" id="password" className="input-field" placeholder="Type in password" ref={pwRef} required={true} />
                    <label htmlFor="password-conf" className="std-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="password-conf"
                        className="input-field"
                        placeholder="Type in password"
                        ref={confirmPwRef}
                        required={true}
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
