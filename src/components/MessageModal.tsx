interface messageModalProps {
    successMessage: string
    setSuccessMessage: (value: string) => any
    errorMessage: string
    setErrorMessage: (value: string) => any
    setIsMessageModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setIsModalOpen: (value: boolean) => any
}

function MessageModal({successMessage, setSuccessMessage, errorMessage, setErrorMessage, setIsMessageModalOpen, setModalComponent, setIsModalOpen}: messageModalProps) {

    const handleOk = () => {
        if(successMessage) {
            setModalComponent("")
            setIsModalOpen(false)
            setIsMessageModalOpen(false)
        }else {
            setIsMessageModalOpen(false)
        }
    }
    return (
        <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-24 "
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true">
            <div className="fixed inset-0 bg-black/75 backdrop-blur-xs   " />
            <div className='z-50 w-fit p-4 bg-white rounded-lg overflow-hidden flex flex-col justify-center items-center'>
                {successMessage && <span className="text-sm text-green-500 mb-2">{successMessage}</span>}
                {errorMessage && <span className=" text-sm text-red-500 mb-2">{errorMessage}</span>}
                <button className="bg-black border-2 border-black text-white hover:bg-white hover:text-black rounded-md px-4 py-1 my-2" onClick={handleOk}>OK</button>
            </div>
        </div>)
}

export default MessageModal