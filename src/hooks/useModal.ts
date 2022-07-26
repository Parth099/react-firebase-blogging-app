import { useState } from "react";

// type modalFunction = () => void;
// type useModalArray = Array<number | modalFunction>;

//had to use any because ts had wrong type inf
const useModal: () => any = () => {
    const [modalStatus, setModalStatus] = useState(false);

    //simple wrappers to improve readabilty
    const openModal = () => setModalStatus(true);
    const closeModal = () => setModalStatus(false);

    return [modalStatus, openModal, closeModal];
};

export default useModal;
