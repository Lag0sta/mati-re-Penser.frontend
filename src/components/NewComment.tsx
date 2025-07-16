import parse from 'html-react-parser';
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
    setSuccessMessage: (value: string) => any
}

function TopicThread({ setIsMessageModalOpen, setErrorMessage, setSuccessMessage }: newTopicProps) {
    const [newComment, setNewComment] = useState<string>('');
    const [isNewComment, setIsNewComment] = useState<boolean>(false);
    console.log("newComment", newComment);

    const dispatch = useAppDispatch();
    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);

    console.log("topic in TOPIC", topic);

    const handleNewComment = async () => {
        const title = topic.title
        const threadData = { token, title, newComment }

        try {
            const addCommentResponse = await addComment({ threadData });

            if (addCommentResponse) {
                dispatch(addThread(addCommentResponse.newThread))
                setNewComment("")
                setIsNewComment(false)
                setSuccessMessage(addCommentResponse.success)
                setIsMessageModalOpen(true)
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
        <div className="h-full w-full flex flex-col items-center mb-6">
            {!isNewComment && (
                <button className='my-2 px-2 py-1 bg-black text-white border border-black rounded-md hover:bg-white hover:text-black cursor-pointer'
                    onClick={() => setIsNewComment(true)}>
                    Ajouter un Commentaire
                </button>
            )}
            {isNewComment && (
                <div className="w-[55%] h-fit">
                    <div className="  py-3 px-3 flex flex-col justify-center items-center bg-white rounded-md my-1">
                        <TextEditor newComment={newComment} setNewComment={(value: string) => setNewComment(value)} />
                        <button className="my-2 px-2 py-1 bg-black text-white border border-black rounded-md hover:bg-white hover:text-black cursor-pointer"
                            onClick={handleNewComment}>Valider</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TopicThread