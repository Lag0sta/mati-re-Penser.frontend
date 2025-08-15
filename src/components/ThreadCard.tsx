import DOMPurify from 'dompurify';
import { useAppSelector, useAppDispatch } from "../store/hooks.js"
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useAnimate } from "framer-motion";

import NewResponse from './NewResponse.js';
import ThreadReplyCard from './ThreadReplyCard.js';

import { formatDateToBelgium } from "../utils/formatDateActions.js";
import { openChevron, closeChevron, appearComments, hideComments } from '../utils/animationActions.js';
import { cp } from 'fs';

interface threadCardProps {
    setIsModalOpen: (value: boolean) => any
    setIsMessageModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setErrorMessage: (value: string) => any
    setIsNewComment: (value: boolean) => any
    thread: any
    index: number
}

function ThreadCard({ setIsModalOpen, setIsMessageModalOpen, setModalComponent, setErrorMessage, setIsNewComment, thread, index }: threadCardProps) {

    const [selectedThreadId, setSelectedThreadId] = useState<string>("");
    const [isNewResponse, setIsNewResponse] = useState<boolean>(false);
    const [showComments, setShowComments] = useState<any>({ istrue: false, threadId: "" })
    const [hover, setHover] = useState<boolean>(false);
    const [msgHover, setMsgHover] = useState<boolean>(false);
    const [editHover, setEditHover] = useState<boolean>(false);
    const [deleteHover, setDeleteHover] = useState<boolean>(false);

    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);

    const isLocked = useAppSelector((state) => state.topic.value.isLocked);

    const [scope, animate]: any = useAnimate();
    let msgChevron

    if (showComments.istrue) {
        msgChevron = `cacher les réponses`
    } else {
        msgChevron = `voir les ${thread.comments.length} réponses`
    }

    const handleEditComment = (index: number) => {
        setIsModalOpen(true);
        setModalComponent('editComment');
    }

    const handleResponse = (threadId: string) => {
        setSelectedThreadId(threadId);
        setIsNewResponse(!isNewResponse);
        setIsNewComment(false);
    }

    useEffect(() => {
        if (!scope.current) return;

        if (showComments.istrue) {
            openChevron({ scope, animate });
        } else {
            closeChevron({ scope, animate });
        }

    }, [showComments]);

    useEffect(() => {
        appearComments({ scope, animate });
    }, []);

    const handleShowComments = (threadId: string) => {
        console.log("istrue :", !showComments.istrue)
        setShowComments({ istrue: !showComments.istrue, threadId: threadId })
    }

    return (
        <motion.div
            key={thread._id ?? index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-[85%]  ">

            <div className="flex bg-gray-100 rounded-md mt-1 border-2 border-gray-800">
                <div className="w-fit flex flex-col justify-center items-center bg-gray-500 border-r-2 border-gray-800 rounded-l-xs">
                    <img className="object-contain mt-2 mx-2 w-14 h-14 bg-white rounded-full border-2 border-gray-800" src={thread.createdBy?.avatar || ''} alt="Avatar de l'utilisateur aillant créé le topic" />
                    <div className="flex flex-col justify-center items-center ">
                        <span className="text-gray-800 font-bold mx-2 ">{thread.createdBy?.pseudo || 'Anonyme'}</span>
                        {!msgHover &&
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6" onMouseEnter={() => setMsgHover(true)} >
                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                            </svg>
                        }

                        {msgHover &&
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" style={{ color: '#D1D5DB' }} onMouseLeave={() => setMsgHover(false)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                        }
                    </div>
                    <span className="text-gray-800 text-sm mx-2 mb-2">title</span>


                </div>
                <div className='flex-col h-full w-full'>
                    <div className="w-full h-full  flex  justify-between  px-1">
                        <div className="w-full flex justify-start items-center ">
                            <span className="font-bold text-xs text-gray-500 mr-2">Créé le :</span>
                            <span className="text-blue-500 text-xs font-black">{formatDateToBelgium(topic.creationDate)}</span>
                        </div>
                        <div className=" h-full w-full flex justify-end items-center">
                            {(token && !isLocked) &&
                                <div className="w-fit flex justify-between ">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 m-1 cursor-pointer" style={{ color: editHover ? '#9CA3AF' : " #1F2937" }} onMouseEnter={() => setEditHover(true)} onMouseLeave={() => setEditHover(false)} onClick={() => handleEditComment(index)}>
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 m-1 cursor-pointer" style={{ color: deleteHover ? '#9CA3AF' : " #1F2937" }} onMouseEnter={() => setDeleteHover(true)} onMouseLeave={() => setDeleteHover(false)}>
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            }

                        </div>
                    </div>
                    <div className="w-full  min-h-20 bg-gray-100 flex flex-col justify-between border-t-2 border-gray-800 ">
                        <span className="ml-1 my-1 text-sm text-gray-800"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.text) }}
                        />
                    </div>
                    <div className=" h-fit w-full flex justify-end   ">

                        <button className="px-10 py-1 bg-gray-800 border-l-2 border-t-2  border-gray-800 rounded-tl-xs text-gray-200 cursor-pointer hover:bg-gray-700"
                            onClick={() => handleResponse(thread.id)}

                        >répondre</button>
                    </div>

                </div>

            </div>
            <div className=''>
                <div className='flex justify-between ml-1 text-xs text-gray-500 font-bold '>
                    <div className='flex'>
                        <span className=' px-2 text-center text-gray-500 cursor-pointer hover:text-blue-500  '
                        >

                        </span>
                        {(thread.comments?.length !== 0 && !thread.isNew) &&
                            <div className='flex justify-start items-center ml-5  cursor-pointer'
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                                onClick={() => handleShowComments(thread.id)}
                            >
                                <span className='text-xs font-bold'
                                    style={{ color: hover ? '#FFF' : '#6B7280' }}
                                >
                                    {msgChevron}
                                </span>
                                <motion.div
                                    ref={scope}
                                    className='mx-1'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ color: hover ? '#FFF' : '#6B7280' }}

                                        className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </motion.div>
                            </div>
                        }
                    </div>
                    <span className='m-1 '>
                        {formatDateToBelgium(thread.modificationDate)}
                    </span>
                </div>
            </div>
            {(isNewResponse && selectedThreadId === thread.id) &&
                <div className='w-full flex justify-center items-center'>
                    <NewResponse setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
                        setErrorMessage={(value: string) => setErrorMessage(value)}
                        selectedThreadId={selectedThreadId}
                        setSelectedThreadId={(value: string) => setSelectedThreadId(value)}
                    />
                </div>
            }

            {(showComments.istrue && showComments.threadId === thread.id) &&
                thread.comments.map((comment: any, index: number) => (
                    <ThreadReplyCard setIsModalOpen={setIsModalOpen} setIsMessageModalOpen={setIsMessageModalOpen} setModalComponent={setModalComponent} setErrorMessage={setErrorMessage} setIsNewComment={setIsNewComment} thread={comment} index={index} comment={comment} />

                ))
            }
        </motion.div>
    )
}

export default ThreadCard