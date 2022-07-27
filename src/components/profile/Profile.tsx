import { useAuth } from "../../contexts/authContext";
import { useStorage } from "../../contexts/storageContext";

export default function Profile() {
    const storageContext = useStorage();
    //if storage exists auth MUST
    const authContext = useAuth();

    //this data is not null since this component only renders if this data is present
    const profileData = storageContext!.profileData;

    //we still need to watch out for people accessing this page directly
    if (!profileData) return;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        //upload
        const FILE = e.target.files[0];
        const TYPE = FILE.type;

        //if it really is an image (not SVG)
        if (!/image\/(png|jpg|jpeg)/.test(TYPE)) return;
    };

    return (
        <section className="w-full p-8 flex justify-center">
            <div className="w-288 bg-sp4 rounded-md shadow-lg">
                <div className="p-4">
                    <h2 className="text-4xl text-sp1 header-font border-b-sp1 border-b-2 pb-2 mb-5">Profile</h2>
                    <div className="flex gap-8">
                        <label className="img-cont w-64 h-64 block relative cursor-pointer" htmlFor="upload-image">
                            <img src={profileData!.profilePictire} alt={"profile image"} className="w-full" />
                            <input type="file" id="upload-image" className="hidden" onChange={handleImageUpload} />
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
                                <h3 className="std-label header-font">Username</h3>
                                <h4 className="text-white text-xl font-bold">{profileData.username ? profileData.username : "Not Set"}</h4>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
