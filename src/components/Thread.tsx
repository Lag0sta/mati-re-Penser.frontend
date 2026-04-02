import DOMPurify from 'dompurify';
import { useAppSelector } from "../store/hooks.js"
import { startTransition } from 'react';

import { AnimatePresence, motion } from "framer-motion";

import Quote from './Quote.js';
import CommentUserUI from './CommentUserUI.js';
import CommentHeader from './CommentHeader.js';

import { formatDateToBelgium } from "../utils/formatDateActions.js";

interface threadListProps {
    setPseudo: (value: string) => any
    setIsModalOpen: (value: boolean) => any
    setIsTextModalOpen: (value: boolean) => any
    setMessageModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setErrorMessage: (value: string) => any
    setIsNewComment: (value: boolean) => any
    threadRef: any
    setReplyTo: (value: any) => any
    pageSize: number
    currentPage: number
    setAuthType: (value: string) => any
    setQuoteID: (value: any) => any
}

function Thread({ setPseudo, setIsModalOpen, setIsTextModalOpen, setMessageModalOpen, setModalComponent, setErrorMessage, setIsNewComment, threadRef, setReplyTo, pageSize, currentPage, setAuthType, setQuoteID }: threadListProps) {
    const token = useAppSelector((state) => state.authToken.value);
    const topic: any = useAppSelector((state) => state.topic.value);

    const isLocked = useAppSelector((state) => state.topic.value.isLocked);

    // nombres de pages visible
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleComments = topic.topicThread.slice(startIndex, endIndex);

    const handleScroll = () => {
        startTransition(() => {
            if (threadRef.current) {
                window.scrollTo({
                    top: threadRef.current.offsetTop,
                    behavior: 'smooth'
                });
            }
        })
    }

    return (
        <AnimatePresence initial={false}>
            {visibleComments.map((thread: any, index: number) => (
                <motion.div
                    key={thread._id ?? index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-[85%] max-w-[85%] px-2 py-2"
                >
                    <div className="flex bg-gray-100 rounded-md mt-1 border-2 border-gray-800">

                        {/* UI Utilisateur à gauche */}
                        <CommentUserUI thread={thread} />
                        <div className='flex-col h-full w-[85%]'>
                            <div className="w-full h-full  flex  justify-between  px-1">
                                <div className="w-full flex justify-start items-center ">
                                    <span className="font-bold text-xs text-gray-500 mr-2">Créé le :</span>
                                    <span className="text-blue-500 text-xs font-black">{formatDateToBelgium(thread.creationDate)}</span>
                                </div>
                                <div className=" h-full  flex justify-end items-center">
                                    {(token && !isLocked) &&
                                        <CommentHeader thread={thread}
                                            index={index}
                                            setPseudo={setPseudo}
                                            setIsModalOpen={setIsModalOpen}
                                            setIsTextModalOpen={setIsTextModalOpen}
                                            setMessageModalOpen={setMessageModalOpen}
                                            setModalComponent={setModalComponent}
                                            setErrorMessage={setErrorMessage}
                                            setIsNewComment={setIsNewComment}
                                            threadRef={threadRef}
                                            setReplyTo={setReplyTo}
                                            setAuthType={setAuthType}
                                            setQuoteID={setQuoteID} />
                                    }
                                </div>
                            </div>

                            <div className="p-5 min-h-20 bg-gray-100 flex flex-col justify-between border-t-2 border-gray-800 overflow-x-auto overflow-y-hidden">

                                {/* Quotes */}
                                {thread.quote.length > 0 && (
                                    <div className="mt-2 p-2 bg-gray-800 rounded-sm text-gray-300 text-xs font-normal overflow-x-auto overflow-y-hidden scrollable-quotes box-border">

                                        {(() => {
                                            const quotedThreads = thread.quote
                                                .map((id: string) => topic.topicThread.find((t: any) => t.id === id))
                                                .filter(
                                                    (q: { id?: string } | undefined, i: number, arr: ({ id?: string } | undefined)[]) =>
                                                        q && arr.findIndex(x => x?.id === q.id) === i
                                                );

                                            return (
                                                <>
                                                    <Quote quotedThreads={quotedThreads} />
                                                </>
                                            );
                                        })()}
                                    </div>
                                )}

                                {/* Message principal */}
                                <span
                                    className="ml-1 my-1 text-sm font-semibold text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.text) }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
    )
}

export default Thread