import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

//this component will handle sign in
export default function SignIn() {
    //dom pointers
    const emailRef = useRef<HTMLInputElement | null>(null);
    const pwRef = useRef<HTMLInputElement | null>(null);

    const authContext = useAuth();
    const navigate = useNavigate();

    //event when submit is hit
    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault(); //do not refresh page

        //fetch pointer values
        const email = emailRef.current?.value;
        const password = pwRef.current?.value;

        //both values are REQUIRED
        if (!email || !password) return;

        //use context's signin function from auth
        const signIn = authContext?.signIn;

        if (!signIn) return; //ts things

        //attempt a sign-in
        signIn(email, password)
            .then(() => {
                console.log("signed in");
                navigate("/"); //navigate to home on successful login
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <section className="w-full mt-12 flex justify-center">
            <div className="w-176 bg-sp4 px-4 py-8 rounded-lg shadow-lg">
                <h2 className="header-font text-sp1 text-3xl pb-2 border-b-2 border-b-sp1">Login</h2>
                <form className="login-form flex flex-col mt-6" onSubmit={handleSumbit}>
                    <label htmlFor="email" className="std-label">
                        Email
                    </label>
                    <input type="email" id="email" className="input-field" placeholder="Type in email" ref={emailRef} required={true} />
                    <label htmlFor="password" className="std-label">
                        Password
                    </label>
                    <input type="password" id="password" className="input-field" placeholder="Type in password" ref={pwRef} required={true} />
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
