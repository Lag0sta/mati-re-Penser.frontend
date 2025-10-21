import { useAppSelector } from "../store/hooks.js"
import { useState, useRef } from 'react';
import '../styles/TopicThreads.css';


import Topic from "./Topic.js";
import Thread from "./Thread.js";
import NewComment from "./NewComment.js";
interface ReplyData {
  author: string;
  text: string;
}
interface topicProps {
    setIsModalOpen: (value: boolean) => any
    setIsEditModalOpen: (value: boolean) => any
    setIsMessageModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
    setAuthType: (value: string) => any
}

function TopicThread({ setIsModalOpen, setIsEditModalOpen, setIsMessageModalOpen, setModalComponent, setErrorMessage, setSuccessMessage, setAuthType }: topicProps) {

    const [isNewComment, setIsNewComment] = useState<boolean>(false);
    const [responseType, setResponseType] = useState<string>("");
    const [reply, setReply] = useState<string>("");
    const [replyTo, setReplyTo] = useState<ReplyData | null>({author: "", text: ""});
    const [pseudo, setPseudo] = useState<string>("");
    const [threadID, setThreadID] = useState<string>("");
    const [rQValue, setRQValue] = useState<string>("");
console.log("replyToTopicThread", replyTo)
    const threadRef = useRef<HTMLDivElement>(null);

    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);
    console.log("token in topicthread", token);
    console.log("topic in topicthread", topic);


    return (
        <div className="w-full flex justify-center pt-24 pb-6">
            <div className='w-[65%] py-4 flex flex-col justify-start items-center bg-gray-800 rounded-md'>
                <Topic setIsModalOpen={setIsModalOpen}
                    setModalComponent={setModalComponent}
                    setIsEditModalOpen={setIsEditModalOpen}
                    setAuthType={setAuthType}
                    setIsNewComment={setIsNewComment}
                    isNewComment={isNewComment}
                    setMessageModalOpen={setIsMessageModalOpen}
                    setErrorMessage={setErrorMessage}
                    setResponseType={setResponseType}
                    threadRef={threadRef}
                />


                <Thread setPseudo={setPseudo}
                        setIsModalOpen={setIsModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        setMessageModalOpen={setIsMessageModalOpen}
                        setModalComponent={setModalComponent}
                        setErrorMessage={setErrorMessage}
                        setIsNewComment={setIsNewComment}
                        threadRef={threadRef}
                        setThreadID={setThreadID}
                        setResponseType={setResponseType}
                        setReplyTo={setReplyTo}
                />

                <div ref={threadRef}>
                    {(isNewComment) && (
                        <NewComment setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
                                    setErrorMessage={(value: string) => setErrorMessage(value)}
                                    setIsNewComment={(value: boolean) => setIsNewComment(value)}
                                    reply={reply}
                                    pseudo={pseudo}
                                    replyTo={replyTo}
                                    setReplyTo={(value: any) => setReplyTo(value)}
                                    setResponseType={(value: string) => setResponseType(value)}
                                    responseType={responseType}
                                    rQValue={rQValue}
                                    setRQValue={(value: string) => setRQValue(value)}
                        />
                    )}
                </div>

            </div>

        </div>

    )
}

export default TopicThread