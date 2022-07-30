"use strict";
exports.id = 333;
exports.ids = [333];
exports.modules = {

/***/ 7333:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ StorageProvider),
/* harmony export */   "y": () => (/* binding */ useStorage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3392);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _firebase_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1216);
/* harmony import */ var _authContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6288);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6555);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_storage__WEBPACK_IMPORTED_MODULE_2__, _firebase_config__WEBPACK_IMPORTED_MODULE_4__, _authContext__WEBPACK_IMPORTED_MODULE_5__, uuid__WEBPACK_IMPORTED_MODULE_6__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_storage__WEBPACK_IMPORTED_MODULE_2__, _firebase_config__WEBPACK_IMPORTED_MODULE_4__, _authContext__WEBPACK_IMPORTED_MODULE_5__, uuid__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const StorageContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_3__.createContext)(null);
const useStorage = ()=>{
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(StorageContext);
};
function StorageProvider({ children  }) {
    //need this to locate profile
    const authContext = (0,_authContext__WEBPACK_IMPORTED_MODULE_5__/* .useAuth */ .a)();
    //kept in state to trigger rerenders later
    const { 0: profileData , 1: setProfileData  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const DocumentExists = async (ref)=>{
        const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDoc)(ref);
        //if exists we return data
        return docSnap.exists() ? docSnap.data() : false;
    };
    //see method name
    const getImageUrlFromStorage = async (path)=>{
        //obtain a reference to the image in storage
        const imageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.ref)(_firebase_config__WEBPACK_IMPORTED_MODULE_4__/* .storage */ .tO, path);
        const URL = await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.getDownloadURL)(imageRef);
        return URL;
    };
    //sends a document update, works on all fields except date
    const sendProfileDocUpdate = async (email, key, value)=>{
        const updateRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_firebase_config__WEBPACK_IMPORTED_MODULE_4__/* .database */ .Fs, `main:profiles/${email}`);
        const exists = await DocumentExists(updateRef);
        //if somehow the document doesnt exists, dont do anything
        if (!exists) return false;
        return await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.updateDoc)(updateRef, {
            [key]: value
        });
    };
    //updates userpfp by replacing existing image
    const updatePfp = (newPfp, userUUID)=>{
        const storageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.ref)(_firebase_config__WEBPACK_IMPORTED_MODULE_4__/* .storage */ .tO, `${userUUID}`);
        return (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.uploadBytes)(storageRef, newPfp);
    };
    //returns if a username is taken
    const isUsernameAreadyUsed = async (username)=>{
        const profilesRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_firebase_config__WEBPACK_IMPORTED_MODULE_4__/* .database */ .Fs, "main:profiles");
        const existsUsernameQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)(profilesRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)("username", "==", username));
        const docs = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(existsUsernameQuery);
        return docs.size === 0;
    };
    //returns the data given and ID
    const getDocDataById = async (id)=>{
        const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_firebase_config__WEBPACK_IMPORTED_MODULE_4__/* .database */ .Fs, "main:blogs", id);
        return await DocumentExists(docRef);
    };
    //updates a doc in firestore given a ID and a update object, it is kind of like useState
    const updateDocumentById = async (id, updateInfo)=>{
        const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_firebase_config__WEBPACK_IMPORTED_MODULE_4__/* .database */ .Fs, "main:blogs", id);
        return await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.updateDoc)(docRef, updateInfo);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        //if there is a user logged in
        if (authContext?.currentUser && authContext.currentUser.email) {
            //var for email as it is a KEY identifer
            const email = authContext.currentUser.email;
            const profileRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_firebase_config__WEBPACK_IMPORTED_MODULE_4__/* .database */ .Fs, `main:profiles/${email}`);
            DocumentExists(profileRef).then((isExists)=>{
                //if doc exists we dont need to do anything
                if (isExists) return;
                //set up default pfp
                //create it with the current data
                (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.setDoc)(profileRef, {
                    email,
                    dateCreated: new Date(),
                    username: "",
                    profilePictureName: "default_pfp.jpg",
                    uuid: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)()
                });
            });
        }
    }, [
        authContext
    ]);
    //per a change in the profile state in firebase OUR state will be updated
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        //if no current user exists dont run anything
        if (!authContext?.currentUser) return;
        const email = authContext.currentUser.email;
        //r-val is a listener remover
        return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.onSnapshot)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_firebase_config__WEBPACK_IMPORTED_MODULE_4__/* .database */ .Fs, `main:profiles/${email}`), (doc)=>{
            const data = doc.data();
            if (data) {
                //fool typescript
                const profileData = {
                    email: data.email,
                    username: data.username,
                    profilePictureName: data.profilePictureName,
                    dateCreated: data.dateCreated,
                    uuid: data.uuid
                };
                setProfileData(profileData);
            }
        });
    }, [
        authContext
    ]);
    const value = {
        profileData: profileData,
        getImageUrlFromStorage,
        updatePfp,
        sendProfileDocUpdate,
        isUsernameAreadyUsed,
        //we will not give a ref to the main:blogs/$email since this will produce FUN state errors
        blogsRef: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_firebase_config__WEBPACK_IMPORTED_MODULE_4__/* .database */ .Fs, `main:blogs`),
        getDocDataById,
        updateDocumentById
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StorageContext.Provider, {
        value: value,
        children: children
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;