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
    selectedThreadId : string
    setSelectedThreadId : (value: string) => any
}

function NewResponse({ selectedThreadId, setSelectedThreadId,  setIsMessageModalOpen, setErrorMessage }: newTopicProps) {
    const [newComment, setNewComment] = useState<string>('');
    console.log("newComment", newComment);

    const dispatch = useAppDispatch();
    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);

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
        <div className="h-full w-full flex flex-col items-center mb-6">
                <div className="w-[55%] h-fit">
                    <div className="  py-3 px-3 flex flex-col justify-center items-center bg-white rounded-md my-1">
                        <TextEditor newComment={newComment} setNewComment={(value: string) => setNewComment(value)} />
                        <button className="my-2 px-2 py-1 bg-black text-white border border-black rounded-md hover:bg-white hover:text-black cursor-pointer"
                            onClick={handleNewComment}>Valider</button>
                    </div>
                </div>
        </div>
    )
}

export default NewResponse