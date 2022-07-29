import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useStorage } from "../../contexts/storageContext";
import SquareSpinnerHOC from "../../util/SquareSpinnerHOC";
import EditableField from "../../util/EditableField";
import { BlogData, Nullable } from "../../contexts/models";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import BlogList from "./BlogList";

export default function Profile() {
    const storageContext = useStorage();
    //if storage exists auth MUST
    const authContext = useAuth();

    //this data is not null since this component only renders if this data is present
    const profileData = storageContext!.profileData;

    const [updatedPFP, setUpdatedPFP] = useState(1);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        //upload
        const FILE = e.target.files[0];
        const TYPE = FILE.type;

        //if it really is an image (not SVG)
        if (!/image\/(png|jpg|jpeg)/.test(TYPE)) return;

        const uuid = profileData!.profilePictureName;

        storageContext!.updatePfp(FILE, uuid).then(() => {
            const email = authContext?.currentUser?.email;
            if (!email) return; //if somehow there is no auth

            //update the field, then trigger a rerender with the image
            storageContext!.sendProfileDocUpdate(email, "profilePictureName", uuid).then(() => setUpdatedPFP((value) => value + 1));
        });
    };

    const [pfpLinK, setPfpLinK] = useState<string>("");

    useEffect(() => {
        if (!profileData) return;
        //obtain the pfp link per rerender incase they change their pfp
        storageContext!.getImageUrlFromStorage(profileData.profilePictureName).then((url) => {
            setPfpLinK(url);
        });
    }, [profileData, updatedPFP]);

    //we still need to watch out for people accessing this page directly

    //for editing username
    const [usernameEditorMode, setUsernameEditorMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const validateAndUpdateUsername = (username: string) => {
        const email = authContext?.currentUser?.email;
        if (!email) return; //if somehow there is no auth

        //only alpha numeric
        if (!/[0-9a-z\_]+/.test(username)) {
            setErrorMessage("Only letters, numbers and underscores allowed");
            return;
        }

        //if username is unique then trigger update
        storageContext!.isUsernameAreadyUsed(username).then((isUsable) => {
            //ensure the user knows what they are doing
            if (username === profileData?.username) {
                setUsernameEditorMode(false);
                return;
            }

            //already in use, do not update profile doc
            if (!isUsable) {
                setErrorMessage(`${username} already in use`);
                return;
            }
            storageContext?.sendProfileDocUpdate(email, "username", username);
            setUsernameEditorMode(false); //close editor
            setErrorMessage("");
        });
    };

    //holds the array of blogs from a snapshot
    const [blogPosts, setBlogPosts] = useState<Nullable<any[]>>(null);
    console.log(blogPosts);
    //load in blogPosts ONCE
    useEffect(() => {
        //we require a valid auth
        if (!authContext?.currentUser?.email) return;

        //required a valid red
        if (!storageContext?.blogsRef) return;

        //query for matching blog posts
        const userBlogQuery = query(storageContext.blogsRef, where("createdBy", "==", authContext.currentUser.email), orderBy("created", "desc"));

        getDocs(userBlogQuery).then((blogArray) => {
            const allPosts: any[] = [];
            blogArray.forEach((blog) => {
                const blogData = blog.data();
                allPosts.push({ ...blogData, id: blog.id });
            });
            setBlogPosts(allPosts);
        });
    }, [authContext, storageContext]);

    //render nothing if profile data is invalid
    //wait for load for auth and storage
    if (!profileData) {
        return <></>;
    }

    return (
        <section className="w-full p-8 flex justify-center">
            <div className="w-288 bg-sp4 rounded-md shadow-lg">
                <div className="p-4">
                    <h2 className="text-4xl text-sp1 header-font border-b-sp1 border-b-2 pb-2 mb-5">Profile</h2>
                    <div className="flex gap-8">
                        <label className="img-cont w-64 h-64 block relative cursor-pointer border-white border-2" htmlFor="upload-image">
                            <input type="file" id="upload-image" className="hidden" onChange={handleImageUpload} />
                            <SquareSpinnerHOC displaySpinner={pfpLinK === "" /* if there is a valid link then render the pfp */}>
                                {updatedPFP > 0 && <img src={pfpLinK} alt={"profile image"} className="w-full h-full text-sp4 " />}
                            </SquareSpinnerHOC>
                            <div className="upload-cont absolute w-full bottom-0 left-0 light-overlay p-3 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                    <path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm18-1h-4v7h-4v-7h-4l6-6 6 6z" />
                                </svg>
                                <span className="pl-3 self-center font-bold header-font text-lg">Upload</span>
                            </div>
                        </label>
                        <div className="info-col flex flex-col gap-4 justify-center">
                            <section>
                                <h3 className="std-label header-font">Email</h3>
                                <h4 className="text-white text-xl font-bold">{authContext?.currentUser?.email}</h4>
                            </section>
                            <section>
                                <div className="flex gap-2 items-center">
                                    <h3 className="std-label header-font">Username</h3>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="fill-sp1 hover:fill-sp2"
                                        onClick={() => {
                                            //flip state
                                            setUsernameEditorMode((val) => !val);
                                        }}
                                    >
                                        <path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z" />
                                    </svg>
                                </div>
                                <div className="w-76">
                                    <EditableField
                                        editorMode={usernameEditorMode}
                                        updateValue={validateAndUpdateUsername}
                                        value={profileData!.username}
                                        defaultValue="Not set"
                                        errorMessage={errorMessage}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                    <>
                        <h2 className="text-4xl text-sp1 header-font border-b-sp1 border-b-2 pb-2 my-5">Your Blog Posts</h2>
                        <BlogList blogs={blogPosts} />
                    </>
                </div>
            </div>
        </section>
    );
}
