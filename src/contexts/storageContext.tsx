import { CollectionReference, DocumentReference } from "firebase/firestore";
import { createContext, useContext } from "react";
import { Nullable, ReactChildren } from "./models";

/*
This context tracks the blog collection ref
                    the profile ref and doc

*/

interface StorageContextObject {
    blogRef: CollectionReference;
    profileRef: Nullable<DocumentReference>;
}
const StorageContext = createContext<Nullable<StorageContextObject>>(null);

export const useStorage = () => {
    return useContext(StorageContext);
};

export function StorageProvider({ children }: ReactChildren) {
    return <StorageContext.Provider value={null}>{children}</StorageContext.Provider>;
}
