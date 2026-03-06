import { useAppSelector } from "../store/hooks.js"
import { useState, useEffect } from 'react';
import { useAppDispatch } from "../store/hooks.js"

import TextEditor from "./TextEditor.js";

import { get, addThread } from '../store/reducers/topic.js'

import { topicThread } from "../utils/topicActions.js"
import { addComment } from "../utils/threadActions.js"

interface newTopicProps {
    setIsMessageModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
    setIsNewComment: (value: boolean) => any
    replyTo: any
    setReplyTo: (value: any) => any
    rQValue: string
    setRQValue: (value: string) => any
    setResponseType: (value: string) => any
    quoteID: string[]
}

function NewComment({ setIsMessageModalOpen, setErrorMessage, setIsNewComment, replyTo, setReplyTo, rQValue, setRQValue, setResponseType, quoteID,  }: newTopicProps) {
    const dispatch = useAppDispatch();
    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);
    const originalValue = ""
    const [isButtonLocked, setIsButtonLocked] = useState<boolean>(true)

    function normalize(str = "") {
        return str.replace(/<[^>]+>/g, "").trim();
    }

    useEffect(() => {
        if (
            normalize(rQValue) !== originalValue) {
            console.log("goal! w2")
            setIsButtonLocked(false)
        } else {
            console.log("no goal")
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

        const threadData = { token, title, newComment, quote: quoteID }
        console.log("threadData", threadData)

        const msg: string[] = []
        try {
            const addCommentResponse = await addComment({ threadData });
            console.log("addCommentResponse", addCommentResponse);
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
                    console.log(`Erreur sur ${err.path[0]} : ${err.message}`);
                    msg.push(err.message)
                
                }
                setErrorMessage(msg.join(", "));
                setIsMessageModalOpen(true);
            }
        } catch (error) {
            setErrorMessage(error as string)
            setIsMessageModalOpen(true)
        }

        // Re-sync avec les vraies données du backend après 2 sec
        setTimeout(async () => {
            const topicData = { title };
            try {
                const respones = await topicThread({ topicData });

                if (respones) {
                    dispatch(get(topic))
                    setIsNewComment(false)
                } else {
                    setErrorMessage(respones.error);
                    setIsMessageModalOpen(true);
                }

            } catch (error) {
                setErrorMessage(error as string);
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
                 )
                }
            </div>
        </div>
    )
}

export default NewComment