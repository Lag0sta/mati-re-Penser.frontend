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
    setIsNewComment: (value: boolean) => any
    reply: string
    pseudo: string
}

function NewComment({ setIsMessageModalOpen, setErrorMessage, setIsNewComment, reply, pseudo }: newTopicProps) {
    const [newComment, setNewComment] = useState<string>('');
    console.log("newComment", newComment);

    const dispatch = useAppDispatch();
    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);
    const user = useAppSelector((state) => state.user.value);

    console.log("topic in TOPIC", topic);

    const handleNewComment = async () => {
        const title = topic.title
        const threadData = { token, title, newComment }

        try {
            const addCommentResponse = await addComment({ threadData });
            console.log("addCommentResponse", addCommentResponse);
            if (addCommentResponse) {
                const newComment = {
                    createdBy: addCommentResponse.newThread.createdBy,
                    creationDate: addCommentResponse.newThread.creationDate,
                    modificationDate: addCommentResponse.newThread.modificationDate,
                    text: addCommentResponse.newThread.text,
                    topic: addCommentResponse.newThread.topic,
                    id: addCommentResponse.newThread._id,
                    isNew: true
                }
                dispatch(addThread(newComment))
                setNewComment("")
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

    return (
        <div className="w-[85%] pl-5 flex flex-col bg-gray-800  border-2 border-gray-800  rounded-md my-1 ">
            <div className='w-full flex'>
                <div className="w-fit flex flex-col justify-start items-center bg-gray-500  border-r-2 border-gray-800 rounded-l-xs">
                    <img className="object-contain mt-2 w-14 h-14 bg-white rounded-full border-2 border-gray-800 mx-2 mb-2" src={user.avatar || ''} alt="Avatar de l'utilisateur aillant créé le topic" />
                    <span className="text-gray-800 font-bold mx-2 mb-2">{user.pseudo}</span>
                </div>
                <div className="flex-col w-full">
                    <div className="w-full flex flex-col justify-between  ">
                        <div className="h-full w-full flex flex-col items-center ">
                            <div className="w-full h-fit px-2 py-1">
                                <div className='flex flex-col px-2 py-1 my-2 h-fit w-full border-2 border-gray-700'>
                                    <span className='text-gray-300 text-xs font-bold'>{pseudo} <span className='text-gray-400'>à écrit :</span></span>
                                    <span className='text-gray-500 text-xs'>{reply}</span>
                                </div>
                                <div className=" flex flex-col justify-center items-center   ">
                                    <TextEditor newComment={newComment}
                                        setNewComment={(value: string) => setNewComment(value)}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                 

                </div>
            </div>

            <div className=' '>

            </div>
            <button className=" px-2 py-1 bg-gray-800 text-gray-200  rounded-br-md hover:bg-gray-600 hover:text-gray-800 border-l-2 border-gray-800 cursor-pointer"
                onClick={handleNewComment}>
                Valider
            </button>
        </div>

    )
}

export default NewComment