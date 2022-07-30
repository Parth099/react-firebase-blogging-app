"use strict";
exports.id = 249;
exports.ids = [249];
exports.modules = {

/***/ 249:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Logout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contexts_authContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6288);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_contexts_authContext__WEBPACK_IMPORTED_MODULE_1__]);
_contexts_authContext__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


//this will handle the model logout prompt
function Logout(props) {
    //for the signout function
    const authContext = (0,_contexts_authContext__WEBPACK_IMPORTED_MODULE_1__/* .useAuth */ .a)();
    //funcs to handle logout choice
    const handleNo = ()=>{
        props.closeLogOutModal();
    };
    const handleYes = ()=>{
        //logout
        if (authContext?.logOut) {
            authContext.logOut();
        }
        //close modal
        handleNo();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "w-176 bg-sp4 px-8 py-8 rounded-lg shadow-lg",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: "text-2xl",
                children: [
                    "Are you sure you want to ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "header-font inline text-sp1",
                        children: "Log out"
                    }),
                    " ?"
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex mt-8 text-xl gap-4",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: "model-selection",
                        onClick: handleNo,
                        children: "No"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: "model-selection",
                        onClick: handleYes,
                        children: "Yes"
                    })
                ]
            })
        ]
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;