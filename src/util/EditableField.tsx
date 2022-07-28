import { useRef } from "react";

interface EditableFieldProps {
    value: string;
    updateValue: (value: string) => void;
    editorMode: boolean;
    defaultValue: string;
    errorMessage: string;
}

export default function EditableField(props: EditableFieldProps) {
    const usernameRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = () => {
        const value = usernameRef.current!.value;
        if (!value) return;
        props.updateValue(value);
    };

    return (
        <div className="editable-field-container min-h-[75px] mt-1">
            {!props.editorMode && <h4 className="text-white text-xl font-bold">{props.value ? props.value : props.defaultValue}</h4>}
            {props.editorMode && (
                <div>
                    <div className="flex gap-2">
                        <input type="text" className="input-field w-full" ref={usernameRef} defaultValue={props.value} placeholder="..." />
                        <button type="button" className="px-3 py-2 bg-white hover:bg-sp1" onClick={handleSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z" />
                            </svg>
                        </button>
                    </div>
                    <p className="err-msg block font-sm text-red-500 font-bold">{props.errorMessage}</p>
                </div>
            )}
        </div>
    );
}
