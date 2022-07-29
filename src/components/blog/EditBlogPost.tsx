import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Nullable } from "../../contexts/models";
import { useStorage } from "../../contexts/storageContext";
import SquareSpinnerHOC from "../../util/SquareSpinnerHOC";
import TagsField from "./TagsField";

export default function EditBlogPost() {
    //read the doc id fro url
    const { blogID } = useParams();
    const storageContext = useStorage();

    //blog object from db by ID
    const [blogData, setBlogData] = useState<any>(null);

    //tags
    const [blogTags, setBlogTags] = useState<Array<string>>([]);

    //load the data based on the load of storage context
    useEffect(() => {
        if (!storageContext?.getDocDataById || !blogID) return;

        storageContext.getDocDataById(blogID).then((docData) => {
            if (!docData) return;

            setBlogData(docData);
            setBlogTags(docData.blogTags);
        });
    }, [storageContext]);

    //pointers
    const contentRef = useRef<Nullable<HTMLTextAreaElement>>(null);

    return (
        <div className="create-blog flex justify-center">
            <section className="w-288">
                <div className="p-5 mt-5 bg-sp4 rounded-sm shadow-lg flex flex-col">
                    <SquareSpinnerHOC displaySpinner={!blogData}>
                        {blogData && (
                            <>
                                <h2 className="border-b-sp1 border-b-2 pb-2 my-5 text-white text-3xl">
                                    <p className="text-sp1 header-font inline">Edit Blog Post:</p>
                                    <p className="font-bold inline text-2xl"> {blogData.title}</p>
                                </h2>
                                <label htmlFor="blog-content" className="std-label mb-2">
                                    Blog Content
                                </label>
                                <textarea
                                    id="blog-content"
                                    className="input-field whitespace-pre-wrap"
                                    rows={6}
                                    ref={contentRef}
                                    defaultValue={blogData.content}
                                />
                                <label htmlFor="blog-tags" className="std-label mb-2 mt-3">
                                    Tags
                                </label>
                                <TagsField id="blog-tags" tags={blogTags} setTags={setBlogTags} />
                            </>
                        )}
                    </SquareSpinnerHOC>
                </div>
            </section>
        </div>
    );
}
