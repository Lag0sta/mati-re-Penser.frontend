import { useAppSelector } from "../store/hooks.js"
import { useState, useEffect } from 'react';
import { useAppDispatch } from "../store/hooks.js"
import { updatePublicationImg } from "../store/reducers/publication.js";

import { editBookImgRequest } from "../utils/newActions.js";

import { modalProps, msgProps } from "../types/Props.js";

interface props {
    msgProps: msgProps
    modalProps: modalProps
    publicationID: string
}
function PublicationEditImg({ msgProps, modalProps, publicationID }: props) {
    const [isButtonLocked, setIsButtonLocked] = useState<boolean>(true);
    const [url, setURL] = useState<string>("");
    let originalURL = ""
    let p_id = ""

    const publications = useAppSelector((state) => state.publication.value);
    const publication = publications.find((e) => e.isArchived === false);
    const token = useAppSelector((state) => state.authToken.value);
    const user = useAppSelector((state) => state.user.value);
    
    const dispatch = useAppDispatch();

    if(publication){
        originalURL = publication.img
        p_id = publication._id
    }

    useEffect(() => {
        if(publication && p_id === publicationID) setURL(publication.img)
    }, [publicationID, publications])

    useEffect(() => {
            setIsButtonLocked(url === originalURL)
    }, [url, originalURL]);

    const handleUpdatePublication = async () => {
        const eBIData = { token, id: publicationID, pseudo: user.pseudo, img: url};
        const msg = [];
        try {
            const editBookResponse = await editBookImgRequest( eBIData );

            if (!editBookResponse.result) {
                // signInResponse.error n'est pas juste un string et à besoin d'être JSON.parse
                const errors = JSON.parse(editBookResponse.error);

                for (const err of errors) {
                    msg.push(err.message)
                }

                msgProps.setErrorMessage(msg.join(", "));
                modalProps.setIsMessageModalOpen(true);
                return;
            } else {  
                dispatch(updatePublicationImg(editBookResponse.editedBook))
                msgProps.setSuccessMessage(editBookResponse.message);
                modalProps.setIsMessageModalOpen(true);
                modalProps.setIsTextModalOpen(false);
                modalProps.setModalComponent("");
            }
        } catch (error) {
            msgProps.setErrorMessage(error as string);
            modalProps.setIsMessageModalOpen(true);
            return
        }
    }

    const handleCloseModal = () => {
        modalProps.setModalComponent('');
        modalProps.setIsTextModalOpen(false);
    }

    return (
        <div className="h-[500px] w-full bg-gray-800 flex flex-col justify-center items-center">
            <div className="w-full flex justify-end" onClick={handleCloseModal}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#9ca3af"
                    className="size-10 mr-4 mt-2 hover:fill-gray-300 hover:cursor-pointer "
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            <h3 className="text-3xl mb-1 text-gray-200">
                Modifier la Publication
            </h3>

            <fieldset className="flex flex-col justify-between items-center overflow-y-auto w-full max-w-3xl p-4">

                <legend className="text-lg text-center text-gray-300 font-medium mb-2">
                    Modifiez l'image
                </legend>
                <div className="flex flex-col w-full">
                    <label className="text-base text-gray-400 mt-2 mb-1"
                        htmlFor="subject">
                        URL :
                    </label>
                    <input className="border-2 border-none bg-gray-400 rounded-md pl-2"
                        id="subject"
                        type="text"
                        placeholder="sujet"
                        value={url}
                        onChange={(e) => setURL(e.target.value)}
                    />
                </div>
            </fieldset>
            <div className="flex flex-col justify-center items-center mt-4">
                {isButtonLocked ? (
                    <button className="w-fit bg-gray-900 border-2 border-gray-900 text-gray-400 rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer opacity-50 cursor-not-allowed opacity-50 cursor-not-allowed" disabled>
                        Modifier
                    </button>
                ) : (
                    <button
                        className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer "
                    onClick={handleUpdatePublication}
                    >
                        Sauvegarder
                    </button>)}
            </div>
        </div>
    )
}

export default PublicationEditImg