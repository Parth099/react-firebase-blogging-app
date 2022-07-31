import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nullable } from "../../contexts/models";
import { useStorage } from "../../contexts/storageContext";
import SquareSpinnerHOC from "../../util/SquareSpinnerHOC";
import TagsField from "./TagsField";

export default function ViewPost() {
    //obtain URL id
    const params = useParams();
    const storageContext = useStorage();
    //used to force render
    const [blogPost, setBlogPost] = useState<Nullable<DocumentData>>(null);

    //used to display useremail or username
    const [creatorInfo, setCreatorInfo] = useState<string>("");

    console.log(blogPost);

    useEffect(() => {
        if (!params.blogID) return;

        //potential data
        storageContext?.getDocDataById(params.blogID).then((potData) => {
            if (!potData) return;
            setBlogPost(potData);
        });
    }, [params]);

    useEffect(() => {
        //exit if profile has not been loaded
        if (!storageContext?.profileData || !blogPost) return;

        if (!blogPost.createdBy) return;

        storageContext.getCreatorData(blogPost.createdBy).then((creator) => {
            console.log(creator);
            if (!creator) return;
            if (creator.username) {
                setCreatorInfo(creator.username);
            } else {
                setCreatorInfo(blogPost.createdBy);
            }
        });
    }, [blogPost, storageContext]);

    return (
        <div className="create-blog flex justify-center">
            <section className="w-288">
                <div className="p-5 mt-5 bg-sp4 rounded-lg shadow-lg">
                    <SquareSpinnerHOC displaySpinner={!blogPost}>
                        {blogPost && (
                            <div className="post-info-container flex flex-col gap-3 relative">
                                <section className="title-detail">
                                    <h2 className="text-3xl text-sp1 header-font">Title</h2>
                                    <h2 className="text-xl text-white font-bold">{blogPost.title}</h2>
                                </section>
                                <section className="content-detail">
                                    <h2 className="text-3xl text-sp1 header-font">Content</h2>
                                    <div className="text-xl text-white font-bold whitespace-pre-wrap px-4 py-2 bg-sp3 rounded-lg mt-2">
                                        {blogPost.content}
                                    </div>
                                </section>
                                <section className="tag-detail">
                                    <h2 className="text-3xl text-sp1 header-font">Tags</h2>
                                    <TagsField tags={blogPost.blogTags} id="" />
                                </section>
                                {creatorInfo !== "" && (
                                    <p className="text-white absolute top-0 right-0">
                                        <span className="font-bold text-sp1">By: </span>
                                        {creatorInfo} on {blogPost.created.toDate().toDateString()}
                                    </p>
                                )}
                            </div>
                        )}
                    </SquareSpinnerHOC>
                </div>
            </section>
        </div>
    );
}
