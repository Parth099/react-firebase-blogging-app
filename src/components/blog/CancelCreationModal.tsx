import React from "react";

interface CancelCreationProps {
    closeModal: () => void;
    cancelCreation: () => void;
}

export default function CancelCreationModal(props: CancelCreationProps) {
    const handleNo = () => {
        props.closeModal();
    };
    const handleYes = () => {
        props.cancelCreation();
    };

    return (
        <div className="overlay">
            <div className="w-176 bg-sp4 px-8 py-8 rounded-lg shadow-lg text-white">
                <p className="text-2xl">
                    <span className="header-font inline text-sp1">Discard</span> this post?
                </p>
                <div className="flex mt-8 text-xl gap-4">
                    <button className="model-selection" onClick={handleNo}>
                        No
                    </button>
                    <button className="model-selection" onClick={handleYes}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}
