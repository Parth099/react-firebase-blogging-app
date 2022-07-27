import { doc, DocumentReference, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { database, storage } from "../../firebase-config";
import { useAuth } from "./authContext";
import { Nullable, ReactChildren } from "./models";

/*
This context tracks the profile ref and doc
*/

interface ProfileData {
    email: string;
    username: string;
    profilePictire: string;
    dateCreated: Date;
}

interface StorageContextObject {
    profileData: Nullable<ProfileData>;
}
const StorageContext = createContext<Nullable<StorageContextObject>>(null);

export const useStorage = () => {
    return useContext(StorageContext);
};

export function StorageProvider({ children }: ReactChildren) {
    //need this to locate profile
    const authContext = useAuth();

    //for FILE storage

    const [profileData, setProfileData] = useState<Nullable<ProfileData>>(null);

    const DocumentExists = async (ref: DocumentReference) => {
        const docSnap = await getDoc(ref);
        //if exists we return data
        return docSnap.exists() ? docSnap.data() : false;
    };

    const getImageUrlFromStorage = async (path: string) => {
        console.log("tried");
        //obtain a reference to the image in storage
        const imageRef = ref(storage, path);
        const URL = await getDownloadURL(imageRef);
        return URL;
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
                //set up default pfp
                getImageUrlFromStorage("default_pfp.jpg").then((url) => {
                    //create it with the current data
                    setDoc(profileRef, {
                        email,
                        dateCreated: new Date(),
                        username: "",
                        profilePicture: url,
                    });
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

    const value: StorageContextObject = {
        profileData: profileData,
    };

    return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}
