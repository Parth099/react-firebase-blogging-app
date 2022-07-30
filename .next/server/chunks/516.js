"use strict";
exports.id = 516;
exports.ids = [516];
exports.modules = {

/***/ 2557:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CancelCreationModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function CancelCreationModal(props) {
    const handleNo = ()=>{
        props.closeModal();
    };
    const handleYes = ()=>{
        props.confirmAction();
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "overlay",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "w-176 bg-sp4 px-8 py-8 rounded-lg shadow-lg text-white",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    className: "text-2xl",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "header-font inline text-sp1",
                            children: "Discard"
                        }),
                        " this post?"
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
        })
    });
};


/***/ }),

/***/ 9188:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ TagsField)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const ENTERKEY = "Enter";
//component will keep the tags in memory and contain the tag collection event
function TagsField(props) {
    const handleTagInput = (e)=>{
        if (e.key !== ENTERKEY) return;
        //i could use a ref here but I am getting the target anyway from the event; no need to use ref
        const target = e.target;
        const tagSubmitted = target.value;
        //throwout empty calls
        if (!tagSubmitted) return;
        //at this point it has passed all checks and is valid
        target.value = "";
        addTag(tagSubmitted);
    };
    const handleTagRemoval = (e)=>{
        //get span that called this event
        const target = e.target;
        //get the parent of the span that HAS the tag we are removing
        const tagHolder = target.previousSibling;
        ///this cant happen but will appease ts
        if (!tagHolder) return;
        if (!tagHolder.textContent) return;
        //initiate removal
        removeTag(tagHolder.textContent);
    };
    //add / rm for blogTags
    const addTag = (tagName)=>{
        const tagExists = props.tags.findIndex((tag)=>tag === tagName);
        //do not add dupe tags
        if (tagExists >= 0) return;
        props.setTags((currblogTags)=>[
                ...currblogTags,
                tagName
            ]);
    };
    const removeTag = (tagName)=>{
        const newTags = [
            ...props.tags
        ];
        const rmIndex = newTags.findIndex((tag)=>tag === tagName);
        //if somehow we dont have the tag we want to delete in here we ignore the request
        if (rmIndex < 0) return;
        //remove one element starting at the index its found (aka remove the element)
        newTags.splice(rmIndex, 1);
        props.setTags(newTags);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                type: "text",
                id: props.id,
                className: "input-field w-full",
                placeholder: "Type in tag names and hit enter",
                onKeyDown: handleTagInput
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "tags-collection mt-2",
                children: props.tags.map((value)=>{
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "tag-element",
                        children: [
                            value,
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "ml-1 cursor-pointer",
                                onClick: handleTagRemoval,
                                children: "✖"
                            })
                        ]
                    }, value);
                })
            })
        ]
    });
};


/***/ }),

/***/ 7653:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

// type modalFunction = () => void;
// type useModalArray = Array<number | modalFunction>;
//had to use any because ts had wrong type inf
const useModal = ()=>{
    const { 0: modalStatus , 1: setModalStatus  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    //simple wrappers to improve readabilty
    const openModal = ()=>setModalStatus(true);
    const closeModal = ()=>setModalStatus(false);
    return [
        modalStatus,
        openModal,
        closeModal
    ];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useModal);


/***/ })

};
;