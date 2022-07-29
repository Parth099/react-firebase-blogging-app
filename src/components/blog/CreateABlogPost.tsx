import React, { useRef, useState } from "react";
import TagsField from "./TagsField";

//db imports
import { database } from "../../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import useModal from "../../hooks/useModal";
import CancelCreationModal from "./CancelCreationModal";
import { Nullable } from "../../contexts/models";
/*
component used to add a new blog post to the db

blog fields:
_______________________________

    title
    blog_content
    date_created *
    date_edited  *
    tags

* - attrs that are not user defined
*/

export default function CreateABlogPost() {
    //required for obtaining the username of the person that submitted the blog post
    const authContext = useAuth();

    //pointers for html text collection
    const titleRef = useRef<Nullable<HTMLTextAreaElement>>(null);
    const contentRef = useRef<Nullable<HTMLTextAreaElement>>(null);

    //state for blog tags
    const [blogTags, setBlogTags] = useState<Array<string>>([]);

    //blocks the spam of "save to db" requests
    const [sendingToDB, setSendingToDB] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleBlogPostCreation = (e: React.MouseEvent) => {
        //collect information
        const title = titleRef.current?.value;
        const content = contentRef.current?.value;

        //if a db request is already being sent
        if (sendingToDB) return;

        //all fields MUST be filled
        if (!title || !content || blogTags.length === 0) return;

        const createdBy = authContext?.currentUser?.email;
        if (!createdBy) return;

        const TIMESTAMP = new Date();

        const collectionRef = collection(database, "main:blogs");

        setSendingToDB(true);
        //promise.then().catch().then()
        //this pattern allows me to catch errors and also commit an action based on sucess or failure
        addDoc(collectionRef, {
            title,
            content,
            blogTags,
            created: TIMESTAMP,
            edited: TIMESTAMP,
            createdBy,
        })
            .then(() => {
                //reroute to profile page (not been created yet)
                //navigate("/");
                console.log("submitted");
            })
            .catch((e) => console.error(e))
            .then(() => {
                //request is finished loading
                setSendingToDB(false);
            });
    };

    const cancelCreationOfBlogPost = () => {
        navigate("/"); //change to profile later
    };

    const [cancelModalStatus, cancelModalOpen, cancelModalClose] = useModal();

    return (
        <div className="create-blog flex justify-center">
            <section className="w-288">
                <div className="p-5 mt-5 bg-sp4 rounded-sm shadow-lg flex flex-col">
                    <h2 className="text-3xl text-sp1 header-font border-b-sp1 border-b-2 pb-2 my-5">Create a Blog Post</h2>
                    <label htmlFor="blog-title" className="std-label mb-2">
                        Post Title
                    </label>
                    <textarea id="blog-title" className="input-field text-2xl font-bold" rows={1} ref={titleRef} />
                    <label htmlFor="blog-content" className="std-label mb-2 mt-3">
                        Blog Content
                    </label>
                    <textarea id="blog-content" className="input-field whitespace-pre-wrap" rows={6} ref={contentRef} />
                    <label htmlFor="blog-tags" className="std-label mb-2 mt-3">
                        Tags
                    </label>
                    <TagsField id="blog-tags" tags={blogTags} setTags={setBlogTags} />
                </div>
                <div className="btn-container flex flex-row-reverse gap-2">
                    <button className="px-6 py-2 bg-sp1 mt-2 rounded-sm font-bold hover:bg-yellow-500" onClick={handleBlogPostCreation}>
                        Submit Post
                    </button>
                    <button className="px-6 py-2 bg-red-600 mt-2 rounded-sm font-bold hover:bg-red-500" onClick={cancelModalOpen}>
                        Cancel
                    </button>
                    {cancelModalStatus && <CancelCreationModal closeModal={cancelModalClose} cancelCreation={cancelCreationOfBlogPost} />}
                </div>
            </section>
        </div>
    );
}
