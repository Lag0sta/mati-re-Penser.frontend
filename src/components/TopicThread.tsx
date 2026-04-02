import { useAppSelector } from "../store/hooks.js"
import { useState, useRef, useMemo } from 'react';
import '../styles/TopicThreads.css';


import Topic from "./Topic.js";
import Thread from "./Thread.js";
import NewComment from "./NewComment.js";

interface ReplyData {
    author: string;
    text: string;
}
interface topicProps {
    replyTo: string
    setReplyTo: (value: string) => any
    setIsModalOpen: (value: boolean) => any
    setIsTextModalOpen: (value: boolean) => any
    setIsMessageModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setErrorMessage: (value: string) => any
    setAuthType: (value: string) => any
}

function TopicThread({ replyTo, setReplyTo, setIsModalOpen, setIsTextModalOpen, setIsMessageModalOpen, setModalComponent, setErrorMessage, setAuthType }: topicProps) {

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
        <div className="w-full  flex justify-center pt-24 pb-6 ">
            <div className='w-[65%] py-4 flex flex-col justify-start items-center bg-gray-800 rounded-md'>
                <Topic setIsModalOpen={setIsModalOpen}
                    setModalComponent={setModalComponent}
                    setIsTextModalOpen={setIsTextModalOpen}
                    setAuthType={setAuthType}
                    setIsNewComment={setIsNewComment}
                    setMessageModalOpen={setIsMessageModalOpen}
                    setErrorMessage={setErrorMessage}
                    setResponseType={setResponseType}
                    threadRef={threadRef}
                />

                <Thread setPseudo={setPseudo}
                    setIsModalOpen={setIsModalOpen}
                    setIsTextModalOpen={setIsTextModalOpen}
                    setMessageModalOpen={setIsMessageModalOpen}
                    setModalComponent={setModalComponent}
                    setErrorMessage={setErrorMessage}
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
                        <NewComment setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
                            setErrorMessage={(value: string) => setErrorMessage(value)}
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
                <div className="flex gap-2 mt-4">
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