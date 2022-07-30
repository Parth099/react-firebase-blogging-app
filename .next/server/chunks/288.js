"use strict";
exports.id = 288;
exports.ids = [288];
exports.modules = {

/***/ 1216:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fs": () => (/* binding */ database),
/* harmony export */   "l2": () => (/* binding */ app),
/* harmony export */   "tO": () => (/* binding */ storage)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3392);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_storage__WEBPACK_IMPORTED_MODULE_2__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_storage__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTAWf19XUtFxaylypBNQQiKJMle-IS9fo",
    authDomain: "react-firebase-blogging-app.firebaseapp.com",
    projectId: "react-firebase-blogging-app",
    storageBucket: "react-firebase-blogging-app.appspot.com",
    messagingSenderId: "1046778962501",
    appId: "1:1046778962501:web:ff60eeaad6872c5605b92c"
};
// Initialize Firebase
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const database = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(app);
const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.getStorage)(app);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6288:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ AuthProvider),
/* harmony export */   "a": () => (/* binding */ useAuth)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _firebase_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1216);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(401);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_firebase_config__WEBPACK_IMPORTED_MODULE_2__, firebase_auth__WEBPACK_IMPORTED_MODULE_3__]);
([_firebase_config__WEBPACK_IMPORTED_MODULE_2__, firebase_auth__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




//holds the context data
const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
//function provides contest to other components with useContext
//returns the current value of the context
const useAuth = ()=>{
    //this is a pattern
    //if we didnt use this pattern we would have to export the AuthContext and thats messy
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);
};
function AuthProvider({ children  }) {
    //auth for our firebase project
    const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.getAuth)(_firebase_config__WEBPACK_IMPORTED_MODULE_2__/* .app */ .l2);
    const { 0: currentUser , 1: setCurrentUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: firstLoadCompleted , 1: setFirstLoadCompleted  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const unsub = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.onAuthStateChanged)(auth, (firebaseUser)=>{
            setCurrentUser(firebaseUser);
            setFirstLoadCompleted(true);
        });
        return unsub;
    }, []);
    //functions
    const signIn = (email, password)=>{
        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.signInWithEmailAndPassword)(auth, email, password);
    };
    const createAccount = (email, password)=>{
        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.createUserWithEmailAndPassword)(auth, email, password);
    };
    const logOut = ()=>{
        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.signOut)(auth);
    };
    const value = {
        currentUser,
        signIn,
        createAccount,
        logOut,
        firstLoadCompleted
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthContext.Provider, {
        value: value,
        children: children
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;