import { DocumentData } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";

interface HomepageBlogListProps {
    docArr: DocumentData[];
}

export default function HomepageBlogList(props: HomepageBlogListProps) {
    //ext doc arr
    const { docArr } = props;

    return (
        <div className="homepage-blog-list-container">
            {docArr.map((doc) => {
                const created = doc.created.toDate();

                return (
                    <Link to={`/blog-post/${doc.id}`} key={doc.id}>
                        <div className="blog-list-element flex flex-col text-white p-3 ml-4 border-l-2 border-l-white hover:border-l-sp1">
                            <h3 className="title text-2xl font-bold">{doc.title}</h3>
                            <p className="text-md">{created.toLocaleString()}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
