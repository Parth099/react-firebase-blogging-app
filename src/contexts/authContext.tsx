import { createContext, useContext, useEffect, useState } from "react";

import { app } from "../../firebase-config";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    User as FirebaseUser,
    UserCredential,
} from "firebase/auth";
import { Nullable, ReactChildren } from "./models";

//boring TS Typing area

type EmailPasswordPromise = (a: string, b: string) => Promise<UserCredential>;

interface AuthContextObject {
    currentUser: FirebaseUser | null; //allow user to be null for conditional rendering
    signIn: EmailPasswordPromise;
    createAccount: EmailPasswordPromise;
    logOut: () => Promise<void>;
    firstLoadCompleted: boolean;
}

//holds the context data
const AuthContext = createContext<Nullable<AuthContextObject>>(null);

//function provides contest to other components with useContext
//returns the current value of the context
export const useAuth = () => {
    //this is a pattern
    //if we didnt use this pattern we would have to export the AuthContext and thats messy
    return useContext(AuthContext);
};

export function AuthProvider({ children }: ReactChildren) {
    //auth for our firebase project
    const auth = getAuth(app);

    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setCurrentUser(firebaseUser);
            setFirstLoadCompleted(true);
        });

        return unsub;
    }, []);

    //functions
    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const createAccount = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    const value = {
        currentUser,
        signIn,
        createAccount,
        logOut,
        firstLoadCompleted,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
