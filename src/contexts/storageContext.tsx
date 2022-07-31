import {
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    DocumentData,
    DocumentReference,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, UploadResult } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { database, storage } from "../../firebase-config";
import { useAuth } from "./authContext";
import { Nullable, ReactChildren } from "./models";
import { v4 as uuidv4 } from "uuid";

/*
This context tracks the profile ref and doc
*/

interface ProfileData {
    email: string;
    username: string;
    profilePictureName: string;
    dateCreated: Date;
    uuid: string;
}

interface StorageContextObject {
    profileData: Nullable<ProfileData>;
    getImageUrlFromStorage: (path: string) => Promise<string>;
    sendProfileDocUpdate: (email: string, key: string, value: string) => Promise<false | void>;
    updatePfp: (newPfp: File, userUUID: string) => Promise<UploadResult>;
    isUsernameAreadyUsed: (username: string) => Promise<boolean>;
    blogsRef: CollectionReference;
    getDocDataById: (id: string) => Promise<false | DocumentData>;
    updateDocById: (id: string, updateInfo: {}) => Promise<void>;
    getAllDocsFromCollectionName: (collectionName: string) => Promise<DocumentData[]>;
    deleteDocById: (id: string) => Promise<void>;
    getCreatorData: (email: string) => Promise<false | DocumentData>;
}

//core context onject
const StorageContext = createContext<Nullable<StorageContextObject>>(null);

//pattern to reduce imports
export const useStorage = () => {
    return useContext(StorageContext);
};

export function StorageProvider({ children }: ReactChildren) {
    //need this to locate profile
    const authContext = useAuth();

    //kept in state to trigger rerenders later
    const [profileData, setProfileData] = useState<Nullable<ProfileData>>(null);

    const DocumentExists = async (ref: DocumentReference) => {
        const docSnap = await getDoc(ref);
        //if exists we return data
        return docSnap.exists() ? docSnap.data() : false;
    };

    //see method name
    const getImageUrlFromStorage = async (path: string) => {
        //obtain a reference to the image in storage
        const imageRef = ref(storage, path);
        const URL = await getDownloadURL(imageRef);
        return URL;
    };

    //sends a document update, works on all fields except date
    const sendProfileDocUpdate = async (email: string, key: string, value: string) => {
        const updateRef = doc(database, `main:profiles/${email}`);
        const exists = await DocumentExists(updateRef);

        //if somehow the document doesnt exists, dont do anything
        if (!exists) return false;

        return await updateDoc(updateRef, { [key]: value });
    };

    //updates userpfp by replacing existing image
    const updatePfp = (newPfp: File, userUUID: string) => {
        const storageRef = ref(storage, `${userUUID}`);
        return uploadBytes(storageRef, newPfp);
    };

    //returns if a username is taken
    const isUsernameAreadyUsed = async (username: string) => {
        const profilesRef = collection(database, "main:profiles");
        const existsUsernameQuery = query(profilesRef, where("username", "==", username));
        const docs = await getDocs(existsUsernameQuery);

        return docs.size === 0;
    };

    //gets doc by id
    const getDocDataById = async (id: string) => {
        const docRef = doc(database, "main:blogs", id);
        return await DocumentExists(docRef);
    };

    //updates doc by id
    const updateDocById = async (id: string, updateInfo: {}) => {
        const docRef = doc(database, "main:blogs", id);
        return await updateDoc(docRef, updateInfo);
    };

    //see title
    const getAllDocsFromCollectionName = async (collectionName: string) => {
        const docRef = collection(database, collectionName);
        const docs = await getDocs(docRef);
        const allDocs: DocumentData[] = [];

        //push all data from db into memory
        docs.forEach((doc) => {
            const data = doc.data();
            allDocs.push({ ...data, id: doc.id });
        });

        return allDocs;
    };

    //delete via edit page
    const deleteDocById = async (id: string) => {
        const docRef = doc(database, "main:blogs", id);
        return await deleteDoc(docRef);
    };

    //get someone else profile data
    const getCreatorData = async (email: string) => {
        const docRef = doc(database, "main:profiles", email);
        return await DocumentExists(docRef);
    };

    //init a profile on NEW login
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

                //create it with the current data
                setDoc(profileRef, {
                    email,
                    dateCreated: new Date(),
                    username: "",
                    profilePictureName: "default_pfp.jpg",
                    uuid: uuidv4(),
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
                    profilePictureName: data.profilePictureName as string,
                    dateCreated: data.dateCreated,
                    uuid: data.uuid,
                };

                setProfileData(profileData);
            }
        });
    }, [authContext]);

    //obj that is global under the StorageContext.Provider
    const value: StorageContextObject = {
        profileData: profileData,
        getImageUrlFromStorage,
        updatePfp,
        sendProfileDocUpdate,
        isUsernameAreadyUsed,
        updateDocById,
        getDocDataById,
        getAllDocsFromCollectionName,
        deleteDocById,
        getCreatorData,

        //we will not give a ref to the main:blogs/$email since this will produce FUN state errors
        blogsRef: collection(database, `main:blogs`),
    };

    return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}
