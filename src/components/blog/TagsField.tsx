import React, { useRef } from "react";

interface TagProps {
    id: string;
    tags: string[];
    setTags?: any;
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
        addTag(tagSubmitted);
    };

    const handleTagRemoval = (e: React.MouseEvent) => {
        if (!props.setTags) return;
        //get span that called this event
        const target = e.target as HTMLSpanElement;

        //get the parent of the span that HAS the tag we are removing
        const tagHolder = target.previousSibling;

        ///this cant happen but will appease ts
        if (!tagHolder) return;
        if (!tagHolder.textContent) return;

        //initiate removal
        removeTag(tagHolder.textContent);
    };

    //add / rm for blogTags
    const addTag = (tagName: string) => {
        if (!props.setTags) return;
        const tagExists = props.tags.findIndex((tag) => tag === tagName);
        //do not add dupe tags
        if (tagExists >= 0) return;

        props.setTags((currblogTags: string) => [...currblogTags, tagName]);
    };

    const removeTag = (tagName: string) => {
        if (!props.setTags) return;
        const newTags = [...props.tags];
        const rmIndex = newTags.findIndex((tag) => tag === tagName);

        //if somehow we dont have the tag we want to delete in here we ignore the request
        if (rmIndex < 0) return;

        //remove one element starting at the index its found (aka remove the element)
        newTags.splice(rmIndex, 1);
        props.setTags(newTags);
    };

    return (
        <div>
            {props.setTags && (
                <input
                    type="text"
                    id={props.id}
                    className="input-field w-full"
                    placeholder="Type in tag names and hit enter"
                    onKeyDown={handleTagInput}
                />
            )}
            <div className="tags-collection mt-2">
                {props.tags.map((value) => {
                    return (
                        <p className="tag-element" key={value}>
                            {value}
                            {props.setTags && (
                                <span className="ml-1 cursor-pointer" onClick={handleTagRemoval}>
                                    {"\u2716"}
                                </span>
                            )}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}
