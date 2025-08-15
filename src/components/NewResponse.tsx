import parse from 'html-react-parser';
import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
import { useAppDispatch } from "../store/hooks.js"

import TextEditor from "./TextEditor.js";

import { get, } from '../store/reducers/topic.js'

import { topicThread } from "../utils/topicActions.js"
import { addReply } from "../utils/threadActions.js"

interface newTopicProps {
    setIsMessageModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
    selectedThreadId: string
    setSelectedThreadId: (value: string) => any
}

function NewResponse({ selectedThreadId, setSelectedThreadId, setIsMessageModalOpen, setErrorMessage }: newTopicProps) {
    const [newComment, setNewComment] = useState<string>('');
    console.log("newComment", newComment);

    const dispatch = useAppDispatch();
    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);
    const user = useAppSelector((state) => state.user.value);

    console.log("topic in TOPIC", topic);

    const handleNewComment = async () => {
        console.log("NewResponseTopic", topic);
        const id = selectedThreadId
        const threadData = { token, id, newComment }
        console.log("NewResponseID", id);
        try {
            const commentResponse = await addReply({ threadData });
            console.log("commentResponse", commentResponse);
            if (commentResponse) {
                setSelectedThreadId("")
                setNewComment("")
            } else {
                setErrorMessage(commentResponse.error);
                setIsMessageModalOpen(true);
            }
        } catch (error) {
            setErrorMessage(error as string)
            setIsMessageModalOpen(true)
        }

        // Re-sync avec les vraies données du backend après 2 sec
        setTimeout(async () => {
            const topicData = { id };
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
        <div className="w-[90%] flex  bg-gray-800  border-2 border-gray-800  rounded-md my-1 ">
            <div className="w-fit flex flex-col justify-start items-center bg-gray-500  border-r-2 border-gray-800 rounded-l-xs">
                <img className="object-contain mt-2 w-14 h-14 bg-white rounded-full border-2 border-gray-800 mx-2 mb-2" src={user.avatar || ''} alt="Avatar de l'utilisateur aillant créé le topic" />
                <span className="text-gray-800 font-bold mx-2 mb-2">{user.pseudo}</span>
            </div>
            <div className="flex-col w-full">
                <div className="w-full flex flex-col justify-between  ">
                    <div className="h-full w-full flex flex-col items-center ">
                        <div className="w-full h-fit">
                            <div className=" flex flex-col justify-center items-center bg-white   ">
                                <TextEditor newComment={newComment} setNewComment={(value: string) => setNewComment(value)} />

                            </div>
                        </div>
                    </div>
                </div>
                <div className=" h-full w-full ">

                </div>

            </div>
            <div className=' '>
                <div className='h-10 w-full bg-gray-300 rounded-tr-md border-b-2 border-gray-800 ' />
                <button className=" min-h-40 w-full px-2 py-1 bg-gray-800 text-gray-200  rounded-br-md hover:bg-gray-600 hover:text-gray-800 border-l-2 border-gray-800 cursor-pointer"
                    onClick={handleNewComment}>
                    Valider
                </button>
            </div>

        </div>
    )
}

export default NewResponse