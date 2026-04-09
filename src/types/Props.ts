export interface msgProps {
    successMessage : string;
    setSuccessMessage : (msg: string) => void;
    errorMessage : string;
    setErrorMessage : (msg: string) => void;
}

export interface modalProps  {
    modalComponent : string;
    setModalComponent : (value : string) => void;
    isModalOpen : boolean;
    setIsModalOpen : (value : boolean) => void;
    isMessageModalOpen : boolean;
    setIsMessageModalOpen : (value : boolean) => void;
    isTextModalOpen : boolean;
    setIsTextModalOpen : (value : boolean) => void;
}

export interface screenActionProps {
    mainComponent : string;
    setMainComponent : (value : string) => void;
    acceuilRef : any;
    mainRef : any;
    contactRef : any;
}