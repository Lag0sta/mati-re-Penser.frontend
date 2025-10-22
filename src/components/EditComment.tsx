import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
import { useAppDispatch } from "../store/hooks.js"

import TextEditor from "./TextEditor.js";

import { editCommentInfo } from '../store/reducers/topic.js';

import { editComment, } from '../utils/threadActions.js';
import { original } from "@reduxjs/toolkit";

interface commentProps {
    setMainComponent: (value: string) => any
    setModalComponent: (value: string) => any
    modalComponent: string
    setIsModalOpen: (value: boolean) => any
    setIsEditModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
    setIsMessageModalOpen: (value: boolean) => any


}
function EditComment({ modalComponent, setModalComponent, setErrorMessage, setIsModalOpen, setSuccessMessage, setIsMessageModalOpen, setIsEditModalOpen }: commentProps) {
    const dispatch = useAppDispatch();

    const comment: any = useAppSelector((state) => state.comment.value);
    const token = useAppSelector((state) => state.authToken.value);

    const [originalValue, setOriginalValue] = useState<string>(comment.text);
    const [rQValue, setRQValue] = useState<string>(comment.text);
    console.log("rQValue", rQValue)

    const handleEditComment = async () => {
        console.log("ohmyclick x2")
        console.log('rQValue Edit', rQValue)
        const text = rQValue
        const id = comment.id
        const threadData = { token, text, id };
        try {
            console.log("threadData", threadData)
            const editCommentResponse = await editComment({ threadData });
            console.log("editCommentResponse", editCommentResponse);

            if (!editCommentResponse.result) {
                setErrorMessage(editCommentResponse.message);
                setIsMessageModalOpen(true);
                return;
            } else {
                dispatch(editCommentInfo(editCommentResponse.editedComment))
                setSuccessMessage(editCommentResponse.message);
                setIsMessageModalOpen(true);
                setIsEditModalOpen(false);
                setModalComponent('');
            }
        } catch (error) {
            setErrorMessage(error as string);
            setIsMessageModalOpen(true);
            return
        }
    }

    const handleCloseModal = () => {
        setModalComponent('');
        setIsEditModalOpen(false);
    }

    return (
        <div className="h-full w-full bg-gray-800 flex flex-col justify-center items-center">
            <div className="w-full flex justify-end" onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9ca3af" className="size-10 mr-4 mt-2 hover:fill-gray-300 hover:cursor-pointer ">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </div>

            <h3 className="text-3xl mb-1 text-gray-200">
                EDIT COMMENT
            </h3>

            <fieldset className="flex flex-col justify-between items-center">
                <legend className="text-lg text-center text-gray-300 font-medium mb-2">
                    Modifiez le Commentaire
                </legend>
                <div className="flex flex-col">
                    <label className="text-base text-gray-400 mt-2 mb-1"
                        htmlFor="email"
                    >
                        Commentaire :
                    </label>
                    <TextEditor
                        rQValue={rQValue}
                        setRQValue={setRQValue}
                    />
                </div>

            </fieldset>

            <div className="flex flex-col justify-center items-center">
                {originalValue !== rQValue &&
                    <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer "
                        onClick={handleEditComment}>
                        Modifier
                    </button>
                }

                {originalValue === rQValue &&
                    <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer opacity-50 cursor-not-allowed"
                    >
                        Modifier
                    </button>
                }

            </div>
        </div>
    )
}

export default EditComment