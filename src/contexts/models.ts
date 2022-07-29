export interface ReactChildren {
    children: React.ReactNode;
}

export type Nullable<T> = T | null;

//unused
export interface BlogData {
    title: string;
    content: string;
    blogTags: Array<string>;
    created: Date;
    edited: Date;
    createdBy: string;
}
