import { collection, CollectionReference, doc, DocumentReference, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../../firebase-config";
import { useAuth } from "./authContext";
import { Nullable, ReactChildren } from "./models";

/*
This context tracks the blog collection ref
                    the profile ref and doc

*/

interface ProfileData {
    email: string;
    username: string;
    profilePictire: string;
    dateCreated: Date;
}

interface StorageContextObject {
    blogRef: CollectionReference;
    profileData: Nullable<ProfileData>;
}
const StorageContext = createContext<Nullable<StorageContextObject>>(null);

export const useStorage = () => {
    return useContext(StorageContext);
};

export function StorageProvider({ children }: ReactChildren) {
    //need this to locate profile
    const authContext = useAuth();

    const [profileData, setProfileData] = useState<Nullable<ProfileData>>(null);

    //initial value of db
    const value: StorageContextObject = {
        blogRef: collection(database, "main:blogs"),
        profileData: profileData,
    };

    const DocumentExists = async (ref: DocumentReference) => {
        const docSnap = await getDoc(ref);
        //if exists we return data
        return docSnap.exists() ? docSnap.data() : false;
    };

    useEffect(() => {
        //if there is a user logged in
        if (authContext?.currentUser && authContext.currentUser.email) {
            //var for email as it is a KEY identifer
            const email = authContext.currentUser.email;

            const profileRef = doc(database, `main:profiles/${email}`);
            DocumentExists(profileRef).then((isExists) => {
                //if doc exists we dont need to do anything
                if (isExists) return;

                //create it with the current data
                setDoc(profileRef, {
                    email,
                    dateCreated: new Date(),
                    username: "",
                    profilePicture: "",
                });
            });
        }
    }, [authContext]);

    //per a change in the profile state in firebase OUR state will be updated
    useEffect(() => {
        //if no current user exists dont run anything
        if (!authContext?.currentUser) return;

        const email = authContext.currentUser.email;
        //r-val is a listener remover
        return onSnapshot(doc(database, `main:profiles/${email}`), (doc) => {
            const data = doc.data();
            if (data) {
                //fool typescript
                const profileData = {
                    email: data.email as string,
                    username: data.username as string,
                    profilePictire: data.profilePicture as string,
                    dateCreated: data.dateCreated,
                };

                setProfileData(profileData);
            }
        });
    }, [authContext]);

    return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}
