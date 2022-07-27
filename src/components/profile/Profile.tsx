import React from "react";
import { useStorage } from "../../contexts/storageContext";

export default function Profile() {
    const storageContext = useStorage();
    console.log(storageContext);

    return <div>Profile</div>;
}
