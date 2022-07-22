import { useState } from "react";

// type modalFunction = () => void;
// type useModalArray = Array<number | modalFunction>;


//had to use any because ts had wrong type inf
const useModal: () => any = () => {
    const [modalStatus, setModalStatus] = useState(0);

    //simple wrappers to improve readabilty
    const openModal = () => setModalStatus(1);
    const closeModal = () => setModalStatus(0);

    return [modalStatus, openModal, closeModal];
};

export default useModal;
