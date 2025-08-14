import DOMPurify from 'dompurify';
import { useAppSelector, useAppDispatch } from "../store/hooks.js"
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useAnimate } from "framer-motion";

import Topic from "./Topic.js";
import ThreadList from "./ThreadList.js";
import NewComment from "./NewComment.js";
import NewResponse from './NewResponse.js';

import { formatDateToBelgium } from "../utils/formatDateActions.js";
import { openChevron, closeChevron, appearComments, hideComments } from '../utils/animationActions.js';



interface topicProps {
    setIsModalOpen: (value: boolean) => any
    setIsMessageModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
    setAuthType: (value: string) => any
}

function TopicThread({ setIsModalOpen, setIsMessageModalOpen, setModalComponent, setErrorMessage, setSuccessMessage, setAuthType }: topicProps) {

    const [isNewComment, setIsNewComment] = useState<boolean>(false);
    const [isNewResponse, setIsNewResponse] = useState<boolean>(false);

    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);
    console.log("token in topicthread", token);
    console.log("topic in topicthread", topic);
    const isLocked = useAppSelector((state) => state.topic.value.isLocked);
    
    return (
        <div className="h-full w-full flex flex-col items-center mb-6">
            <Topic setIsModalOpen={setIsModalOpen}
                setModalComponent={setModalComponent}
                setAuthType={setAuthType}
            />

            {!isLocked && (
                <NewComment setIsMessageModalOpen={setIsMessageModalOpen}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                    setIsNewComment={setIsNewComment}
                    isNewComment={isNewComment} 
                    setIsNewResponse={setIsNewResponse}
                    isNewResponse={isNewResponse}/>
            )}
            <ThreadList setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
                        setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
                        setModalComponent={(value: string) => setModalComponent(value)}
                        setErrorMessage={(value: string) => setErrorMessage(value)}
                        setIsNewComment={(value: boolean) => setIsNewComment(value)}
            />
        </div>
    )
}

export default TopicThread