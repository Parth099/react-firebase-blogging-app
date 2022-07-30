import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useStorage } from "../../contexts/storageContext";
import SquareSpinnerHOC from "../../util/SquareSpinnerHOC";
import HomepageBlogList from "./HomepageBlogList";

export default function AllPosts() {
    //import storage functions
    const storageContext = useStorage();

    //state to later force renders
    const [allPosts, setAllPosts] = useState<DocumentData[]>([]);

    //fetch all user data
    useEffect(
        () => {
            if (!storageContext?.getAllDocsFromCollectionName) return;
            storageContext.getAllDocsFromCollectionName("main:blogs").then((docDataArr) => {
                setAllPosts(docDataArr);
            });
        },
        //need context incase user changes
        [storageContext]
    );

    return (
        <div className="p-4 text-white">
            <div className="min-w-full bg-sp4 p-4 shadow-xl rounded-lg">
                <div className="text-3xl header-font text-sp1 pb-2 border-b-2 border-b-sp1">Homepage</div>
                <div className="all-posts-container pt-4">
                    <SquareSpinnerHOC displaySpinner={allPosts.length === 0}>
                        {allPosts.length > 0 && <HomepageBlogList docArr={allPosts} />}
                    </SquareSpinnerHOC>
                </div>
            </div>
        </div>
    );
}
