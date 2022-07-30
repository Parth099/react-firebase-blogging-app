import React from "react";

interface SpinnerProps {
    children: React.ReactNode;
    displaySpinner: boolean;
}

export default function SquareSpinnerHOC(props: SpinnerProps) {
    return (
        <>
            {props.displaySpinner && (
                <div className="spinner-container flex items-center justify-center h-full">
                    <div className="lds-dual-ring"></div>
                </div>
            )}
            {!props.displaySpinner && props.children}
        </>
    );
}
