import React from "react";
import { Link } from "react-router-dom";
import { Nullable } from "../../contexts/models";

export default function BlogList(props: { blogs: Nullable<any[]> }) {
    //render nothing data is empty or null
    const { blogs } = props;
    if (!blogs) {
        //return a fragment if no data is there
        return <></>;
    }

    return (
        <div className="blog-list-container">
            {blogs.map((blog) => {
                const created: Date = blog.created.toDate();

                return (
                    <Link to={`/edit-post/${blog.id}`} key={blog.id}>
                        <div className="blog-list-element flex flex-col text-white p-3 ml-4 border-l-2 border-l-white hover:border-l-sp1">
                            <h3 className="title text-2xl font-bold">{blog.title}</h3>
                            <p className="text-md">{created.toLocaleString()}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
