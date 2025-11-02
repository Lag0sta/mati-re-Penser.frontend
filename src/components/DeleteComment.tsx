import { useAppSelector } from "../store/hooks.js"
import { useState, useEffect } from 'react';
import { useAppDispatch } from "../store/hooks.js"

import TextEditor from "./TextEditor.js";

import { deleteC, get } from '../store/reducers/topic.js';

import { deleteComment } from '../utils/threadActions.js';
import { topicThread } from "../utils/topicActions.js";
import { original } from "@reduxjs/toolkit";

interface commentProps {
    setMainComponent: (value: string) => any
    setModalComponent: (value: string) => any
    modalComponent: string
    setIsModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
    setIsMessageModalOpen: (value: boolean) => any
    setAuthType: (value: string) => any


}
function DeleteComment({ modalComponent, setModalComponent, setErrorMessage, setIsModalOpen, setSuccessMessage, setIsMessageModalOpen, setAuthType }: commentProps) {
    const dispatch = useAppDispatch();

    const comment: any = useAppSelector((state) => state.comment.value);
    const token = useAppSelector((state) => state.authToken.value);

    const [originalValue, setOriginalValue] = useState<string>(comment.text);
    const [rQValue, setRQValue] = useState<string>(comment.text);
    const [password, setPassword] = useState('');
    const [choice, setChoice] = useState(false);
    const topic: any = useAppSelector((state) => state.topic.value);

    console.log("rQValue", rQValue)

    const handleDeleteComment = async () => {
        console.log("comment.id", comment.id)
        const id = comment.id
        const threadData = { token, id };
        try {
            console.log("threadData", threadData)

            const deleteCommentResponse = await deleteComment({ threadData })
            console.log("deleteCommentResponse", deleteCommentResponse);

            if (!deleteCommentResponse.result) {
                setErrorMessage(deleteCommentResponse.message);
                setIsMessageModalOpen(true);
                return;
            } else {
                dispatch(deleteC({id : deleteCommentResponse.id}))
                setAuthType('');
                setSuccessMessage(deleteCommentResponse.message);
                setIsMessageModalOpen(true);
                setIsModalOpen(false);
                setModalComponent('');

                 // <-- AJOUTER CE BLOc
    setTimeout(async () => {
    try {
        const res = await topicThread({ topicData: { title: topic.title } });

        // --- Success case ---
        if (res?.result && res?.discussion) {
            dispatch(get(res)); // <-- on envoie seulement la discussion
            return;
        }

        // --- API returned an error ---
        setErrorMessage(res?.message || "Erreur lors de la récupération");
        setIsMessageModalOpen(true);

    } catch (error) {
        // --- Crash JS / réseau ---
        setErrorMessage(error instanceof Error ? error.message : String(error));
        setIsMessageModalOpen(true);
    }
}, 1000);

            }
        } catch (error) {
            setErrorMessage(error as string);
            setIsMessageModalOpen(true);
            return
        }
    }

    const handleCloseModal = () => {
        setModalComponent('');
        setIsModalOpen(false);
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
                    êtes vous sure de vouloir supprimer ce commentaire ?
                </legend>
                <label className="flex flex-col items-center gap-1 text-gray-300 hover:cursor-pointer hover:text-white">
                    <input
                        type="checkbox"
                        checked={choice === true}
                        onChange={() => setChoice(true)}
                    />
                    Oui
                </label>

                <label className="flex flex-col items-center gap-1 text-gray-300 hover:cursor-pointer hover:text-white">
                    <input
                        type="checkbox"
                        checked={choice === false}
                        onChange={() => setChoice(false)}
                    />
                    Non
                </label>
               


            </fieldset >

            <div className="flex flex-col justify-center items-center">
                {choice &&
                    <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer "
                    onClick={handleDeleteComment}>
                        Confirmer
                    </button>
                }

                {!choice &&
                    <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer opacity-50 cursor-not-allowed"
                        >
                        Confirmer
                    </button>
                }

            </div>
        </div >
    )
}

export default DeleteComment