import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
import { useAppDispatch } from "../store/hooks.js"

import { deleteComment, getTopic } from '../store/reducers/topic.js';

import { deleteCommentRequest } from '../utils/threadActions.js';
import { topicThreadRequest } from "../utils/topicActions.js";

import { modalProps, msgProps, screenActionProps } from "../types/Props.js";

interface props {
    screenActionProps: screenActionProps
    modalProps: modalProps
    msgProps: msgProps
    setAuthType: (value: string) => any
}

function CommentDelete({ modalProps, msgProps, setAuthType, screenActionProps }: props) {
    const dispatch = useAppDispatch();

    const comment: any = useAppSelector((state) => state.comment.value);
    const token = useAppSelector((state) => state.authToken.value);
    const user = useAppSelector((state) => state.user.value);
    const [password, setPassword] = useState('');

    const topic: any = useAppSelector((state) => state.topic.value);

    const handleDeleteComment = async () => {
        const deleteCData = { token, pseudo: user.pseudo, password: password, id: comment.id }
        console.log("deleteCData", deleteCData)
        const msg = [];
        try {
            const deleteCommentResponse = await deleteCommentRequest(deleteCData)

            if (!deleteCommentResponse.result) {
                // signInResponse.error n'est pas juste un string et à besoin d'être JSON.parse
                msgProps.setErrorMessage(deleteCommentResponse.message);
                modalProps.setIsMessageModalOpen(true);
                return;
            } else {
                dispatch(deleteComment({ id: deleteCommentResponse.id }))
                setAuthType('');
                msgProps.setSuccessMessage(deleteCommentResponse.message);
                modalProps.setIsMessageModalOpen(true);
                modalProps.setIsModalOpen(false);
                modalProps.setModalComponent('');

                // <-- AJOUTER CE BLOc
                setTimeout(async () => {
                    const tTData = { title: topic.title };
                    const msg = []

                    try {
                        const response = await topicThreadRequest(tTData);

                        // --- Success case ---
                        if (response?.result && response?.discussion) {
                            dispatch(getTopic(response)); // <-- on envoie seulement la discussion
                            return;
                        }
                        console.log("DELETERESPONSE", response)


                    } catch (error: any) {
                        console.log("error", error)
                    }
                }, 1000);

            }
        } catch (error) {
            msgProps.setErrorMessage(error as string);
            modalProps.setIsMessageModalOpen(true);
            return
        }
    }

    const handleCloseModal = () => {
        modalProps.setModalComponent('');
        modalProps.setIsModalOpen(false);
    }

    return (
        <div className="h-full w-full bg-gray-800 flex flex-col justify-center items-center">
            <div className="w-full flex justify-end" onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9ca3af" className="size-10 mr-4 mt-2 hover:fill-gray-300 hover:cursor-pointer ">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </div>

            <h3 className="text-3xl mb-1 text-gray-200">
                DELETE COMMENT
            </h3>

            <fieldset className="flex flex justify-evenly  items-center">
                <legend className="p-2 text-lg text-center text-gray-300 font-medium mb-2">
                    écrivez votre mot de passe
                </legend>
                <label className="flex flex-col items-center gap-1 text-gray-300 hover:cursor-pointer hover:text-white">
                    <input className="w-fit my-2 p-2 border border-white rounded-lg"
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </label>

            </fieldset >

            <div className="flex flex-col justify-center items-center">
                {password ? (
                    <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer "
                        onClick={handleDeleteComment}>
                        Confirmer
                    </button>
                ) : (
                    <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer opacity-50 cursor-not-allowed"
                    >
                        Confirmer
                    </button>
                )}

            </div>
        </div >
    )
}

export default CommentDelete