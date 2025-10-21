import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
import { useAppDispatch } from "../store/hooks.js"
import { AnimatePresence, motion } from "framer-motion";


import TextEditor from "./TextEditor.js";

import { get, addThread } from '../store/reducers/topic.js'

import { topicThread } from "../utils/topicActions.js"
import { addComment } from "../utils/threadActions.js"

interface newTopicProps {
    setIsMessageModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
    setIsNewComment: (value: boolean) => any
    reply: string
    pseudo: string
    replyTo: any
    setReplyTo: (value: any) => any
    rQValue: string
    setRQValue: (value: string) => any
    responseType: string
    setResponseType: (value: string) => any
}

function NewComment({ setIsMessageModalOpen, setErrorMessage, setIsNewComment, reply, pseudo, replyTo, setReplyTo, rQValue, setRQValue, responseType, setResponseType }: newTopicProps) {

    const dispatch = useAppDispatch();
    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);
    const user = useAppSelector((state) => state.user.value);

    console.log("topic in TOPIC", topic);

    const handleNewComment = async () => {
        const title = topic.title
        const newComment = rQValue
        const threadData = { token, title, newComment }
        console.log("newCommentRepresents", newComment)
        try {
            const addCommentResponse = await addComment({ threadData });
            console.log("addCommentResponse", addCommentResponse);
            console.log("addCommentResponse", addCommentResponse.error);
            if (addCommentResponse) {
                const TheNewComment = {
                    createdBy: addCommentResponse.newThread.createdBy,
                    creationDate: addCommentResponse.newThread.creationDate,
                    modificationDate: addCommentResponse.newThread.modificationDate,
                    text: addCommentResponse.newThread.text,
                    topic: addCommentResponse.newThread.topic,
                    id: addCommentResponse.newThread._id,
                    isNew: true
                }
                dispatch(addThread(TheNewComment))
                setRQValue("")
                setReplyTo("");
                setResponseType("");
            } else {
                setErrorMessage(addCommentResponse.error);
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

    console.log("responseType", responseType);

    return (
        <div className="w-fit  bg-gray-800  border-2 border-gray-800  rounded-md my-1 ">
            <div className='w-full flex'>

                <div className="flex-col w-full">
                    <div>

                    </div>
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
                <button className="w-full px-2 py-1 bg-gray-800 text-gray-200  rounded-b-md hover:bg-gray-600 hover:text-gray-800 border-l-2 border-gray-800 cursor-pointer"
                    onClick={handleNewComment}>
                    Valider
                </button>
            </div>

        </div>

    )
}

export default NewComment