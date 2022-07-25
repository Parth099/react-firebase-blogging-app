import React, { useRef } from "react";

interface TagProps {
    id: string;
    addTag: (tagName: string) => void;
    removeTag: (tagName: string) => void;
    tags: Array<string>;
}

const ENTERKEY = "Enter";

//component will keep the tags in memory and contain the tag collection event
export default function TagsField(props: TagProps) {
    const handleTagInput = (e: React.KeyboardEvent) => {
        if (e.key !== ENTERKEY) return;

        //i could use a ref here but I am getting the target anyway from the event; no need to use ref
        const target = e.target as HTMLInputElement;

        const tagSubmitted = target.value;

        //throwout empty calls
        if (!tagSubmitted) return;

        //at this point it has passed all checks and is valid
        target.value = "";
        props.addTag(tagSubmitted);
    };

    const handleTagRemoval = (e: React.MouseEvent) => {
        //get span that called this event
        const target = e.target as HTMLSpanElement;

        //get the parent of the span that HAS the tag we are removing
        const tagHolder = target.previousSibling;

        ///this cant happen but will appease ts
        if (!tagHolder) return;
        if (!tagHolder.textContent) return;

        //initiate removal
        props.removeTag(tagHolder.textContent);
    };

    return (
        <div>
            <input
                type="text"
                id={props.id}
                className="input-field w-full"
                placeholder="Type in tag names and hit enter"
                onKeyDown={handleTagInput}
            />
            <div className="tags-collection mt-2">
                {props.tags.map((value) => {
                    return (
                        <p className="tag-element" key={value}>
                            {value}
                            <span className="ml-1 cursor-pointer" onClick={handleTagRemoval}>
                                {"\u2716"}
                            </span>
                        </p>
                    );
                })}
            </div>
        </div>
    );
}
