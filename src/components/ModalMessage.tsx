import { modalProps, msgProps } from "../types/Props.js";

interface props {
    modalProps: modalProps
    msgProps: msgProps
    authType: string
}

function ModalMessage({ modalProps, msgProps, authType }: props) {
    console.log("responseModalMessage", msgProps.errorMessage, "autre", msgProps.successMessage)
    const handleOk = () => {
        if (msgProps.successMessage) {
            if(authType === "deleteComment"){
                modalProps.setIsMessageModalOpen(false)
                modalProps.setIsModalOpen(true)
                modalProps.setModalComponent("deleteComment")
                return
            } else {
            modalProps.setModalComponent("")
            modalProps.setIsModalOpen(false)
            modalProps.setIsMessageModalOpen(false)
            msgProps.setSuccessMessage("")
            }
           
        } else {
            modalProps.setIsMessageModalOpen(false)
            msgProps.setErrorMessage("")
        }
    }

    return (
        <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-24 "
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true">
            <div className="fixed inset-0 bg-black/75 backdrop-blur-xs   " />
            <div className='z-50 w-fit p-4 bg-white rounded-lg overflow-hidden flex flex-col justify-center items-center'>
                {msgProps.successMessage && <span className="text-sm text-green-500 mb-2">{msgProps.successMessage}</span>}
                {msgProps.errorMessage && <span className=" text-sm text-red-500 mb-2">{msgProps.errorMessage}</span>}
                <button className="bg-black border-2 border-black text-white hover:bg-white hover:text-black rounded-md px-4 py-1 my-2" onClick={handleOk}>OK</button>
            </div>
        </div>)
}

export default ModalMessage