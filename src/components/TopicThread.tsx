import { useAppSelector } from "../store/hooks.js"
import { useEffect, useState, useRef, useMemo } from 'react';
import '../styles/TopicThreads.css';

import TopicThreadPrint from "./TopicThreadPrint.js";
import Topic from "./Topic.js";
import Thread from "./Thread.js";
import CommentNew from "./CommentNew.js";

import { msgProps, modalProps } from "../types/Props.js";
import { adminProps } from "../types/Props.js";

interface props {
    adminProps: adminProps
    replyTo: string
    setReplyTo: (value: string) => any
    modalProps: modalProps
    msgProps: msgProps
    setAuthType: (value: string) => any
}

function TopicThread({ adminProps, replyTo, setReplyTo, modalProps, msgProps, setAuthType }: props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [isNewComment, setIsNewComment] = useState<boolean>(false);
    const [responseType, setResponseType] = useState<string>("");
    const [quoteID, setQuoteID] = useState<string[]>([]);
    const [pseudo, setPseudo] = useState<string>("");

    const [rQValue, setRQValue] = useState<string>("");
    const threadRef = useRef<HTMLDivElement>(null);

    const topic: any = useAppSelector((state) => state.topic.value);

   
    // Calcule et initialisation du nombre de pages
    const pageSize = 15;
    const pagesNumber = useMemo(() => {
        const numberOfPages = Math.ceil(topic.topicThread.length / pageSize);
        return Array.from({ length: numberOfPages }, (_, i) => i + 1);
    }, [topic.topicThread.length]);

    return (
        <div className="w-full  flex justify-center  pb-6  ">
            <div className= {adminProps.isAdminView
      ? 'py-4 flex flex-col justify-start items-center bg-gray-800 border-2 border-red-600 rounded-md print:hidden'
      : 'py-4 flex flex-col justify-start items-center bg-gray-800 rounded-md print:hidden'}>
                 
                <Topic modalProps={modalProps}
                    setAuthType={setAuthType}
                    setIsNewComment={setIsNewComment}
                    msgProps={msgProps}
                    setResponseType={setResponseType}
                    threadRef={threadRef}
                />

                <Thread setPseudo={setPseudo}
                    modalProps={modalProps}
                    msgProps={msgProps}
                    adminProps={adminProps}
                    setIsNewComment={setIsNewComment}
                    threadRef={threadRef}
                    setReplyTo={setReplyTo}
                    pageSize={pageSize}
                    currentPage={currentPage}  
                    setAuthType={setAuthType}
                    setQuoteID={setQuoteID} 
                />

                <div ref={threadRef}>
                    {(isNewComment) && (
                        <CommentNew modalProps={modalProps}
                            msgProps={msgProps}
                            setIsNewComment={(value: boolean) => setIsNewComment(value)}
                            replyTo={replyTo}
                            setReplyTo={(value: any) => setReplyTo(value)}
                            setResponseType={(value: string) => setResponseType(value)}
                            rQValue={rQValue}
                            setRQValue={(value: string) => setRQValue(value)}
                            quoteID={quoteID}
                        />
                    )}
                </div>
                <div className="flex gap-2 mt-4 ">
                    {pagesNumber.map((num) => (
                        <button
                            key={num}
                            onClick={() => setCurrentPage(num)}
                            className={`px-3 py-1 rounded ${num === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default TopicThread