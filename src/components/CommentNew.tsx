import { useAppSelector } from "../store/hooks.js"
import { useState, useEffect } from 'react';
import { useAppDispatch } from "../store/hooks.js"

import TextEditor from "./TextEditor.js";

import { getTopic, addThread } from '../store/reducers/topic.js'

import { topicThreadRequest } from "../utils/topicActions.js"
import { addCommentRequest } from "../utils/threadActions.js"
import { modalProps, msgProps } from "../types/Props.js";

interface props {
    modalProps: modalProps
    msgProps: msgProps
    setIsNewComment: (value: boolean) => any
    replyTo: any
    setReplyTo: (value: any) => any
    rQValue: string
    setRQValue: (value: string) => any
    setResponseType: (value: string) => any
    quoteID: string[]
}

function CommentNew({ modalProps, msgProps, setIsNewComment, replyTo, setReplyTo, rQValue, setRQValue, setResponseType, quoteID,  }: props) {
    const dispatch = useAppDispatch();
    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);
    const originalValue = ""
    const [isButtonLocked, setIsButtonLocked] = useState<boolean>(true)

    function normalize(str = "") {
        return str.replace(/<[^>]+>/g, "").trim();
    }

    useEffect(() => {
        if (normalize(rQValue) !== originalValue) {
            setIsButtonLocked(false)
        } else {
            setIsButtonLocked(true)
        }
    }, [rQValue]);

    const handleNewComment = async () => {
        const title = topic.title

        // Supprime les blocs de citation Quill avant l'envoi
        const parser = new DOMParser();
        const doc = parser.parseFromString(rQValue, 'text/html');

        // Supprime tous les éléments de citation
        doc.querySelectorAll('.ql-reply-quote').forEach(el => el.remove());

        // Récupère le HTML restant
        const newComment = doc.body.innerHTML.trim();

        const addCData = { token, title, newComment, quote: quoteID }

        const msg: string[] = []
        try {
            const addCommentResponse = await addCommentRequest( addCData );

            if (addCommentResponse) {
                const TheNewComment = {
                    createdBy: addCommentResponse.newThread.createdBy,
                    creationDate: addCommentResponse.newThread.creationDate,
                    modificationDate: addCommentResponse.newThread.modificationDate,
                    quote: addCommentResponse.newThread.quote,
                    text: addCommentResponse.newThread.text,
                    topic: addCommentResponse.newThread.topic,
                    id: addCommentResponse.newThread._id,
                    isNew: true
                }
                dispatch(addThread(TheNewComment))
                setRQValue("")
                setReplyTo("");
                setResponseType("");
                setIsNewComment(false)
            } else {
                // signInResponse.error n'est pas juste un string et à besoin d'être JSON.parse
                const errors = JSON.parse(addCommentResponse.error);

                for (const err of errors) {
                    msg.push(err.message)                
                }
                msgProps.setErrorMessage(msg.join(", "));
                modalProps.setIsMessageModalOpen(true);
            }
        } catch (error) {
            msgProps.setErrorMessage(error as string)
            modalProps.setIsMessageModalOpen(true)
        }

        // Re-sync avec les vraies données du backend après 2 sec
        setTimeout(async () => {
            const tTdata = { title };
            try {
                const respones = await topicThreadRequest( tTdata );

                if (respones) {
                    dispatch(getTopic(topic))
                    setIsNewComment(false)
                } else {
                    msgProps.setErrorMessage(respones.error);
                    modalProps.setIsMessageModalOpen(true);
                }

            } catch (error) {
                msgProps.setErrorMessage(error as string);
            }
        }, 2000);
    }

    return (
        <div className="w-fit  bg-gray-800  border-2 border-gray-800  rounded-md my-1 ">
            <div className='w-full flex'>
                <div className="flex-col w-full">
                    <div className="w-full flex flex-col justify-between  ">
                        <div className="h-full w-full flex flex-col items-center ">
                            <div className="w-full h-fit px-2 py-1">
                                <div className=" flex flex-col justify-center items-center   ">
                                    <TextEditor
                                        rQValue={rQValue}
                                        setRQValue={setRQValue}
                                        replyTo={replyTo}
                                        setReplyTo={setReplyTo}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center px-2 '>
                {isButtonLocked ? (
                 <button className="w-full px-2 py-1 bg-gray-800 text-gray-600  rounded-b-md hover:bg-gray-600 hover:text-gray-800 border-l-2 border-gray-800 cursor-pointer opacity-50 cursor-not-allowed opacity-50 cursor-not-allowed" disabled>
                    Valider
                 </button>
                ) : (     
                 <button className="w-full px-2 py-1 bg-gray-800 text-gray-200  rounded-b-md hover:bg-gray-600 hover:text-gray-800 border-l-2 border-gray-800 cursor-pointer"
                    onClick={handleNewComment}>
                    Valider
                </button>
                )}
            </div>
        </div>
    )
}

export default CommentNew