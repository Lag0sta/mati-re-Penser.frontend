import * as parseModule from 'html-react-parser';
import DOMPurify from 'dompurify';
import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
import { useAppDispatch } from "../store/hooks.js"
import { AnimatePresence, motion } from "framer-motion";

import Topic from "./Topic.js";
import NewComment from "./NewComment.js";

import { formatDateToBelgium } from "../utils/formatDateActions.js";


interface topicProps {
    setMainComponent: (value: string) => any
    setIsModalOpen: (value: boolean) => any
    setIsMessageModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
    setAuthType: (value: string) => any
    setIsLocked: (value: boolean) => any
    isLocked: boolean
}

function TopicThread({ setMainComponent, setIsModalOpen, setIsMessageModalOpen, setModalComponent, setErrorMessage, setSuccessMessage, setAuthType, setIsLocked, isLocked }: topicProps) {
    const parse = parseModule.default;

    const [newComment, setNewComment] = useState<string>('');
    console.log("newComment", newComment);

    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);

    console.log("topic in TOPIC", topic);
    return (
        <div className="h-full w-full flex flex-col items-center mb-6">
            <Topic setIsLocked={setIsLocked} 
                   isLocked={isLocked} 
                   setIsModalOpen={setIsModalOpen}
                   setModalComponent={setModalComponent}
                   setAuthType={setAuthType} />

            {!isLocked && (
                    <NewComment setIsMessageModalOpen={setIsMessageModalOpen} 
                                setErrorMessage={setErrorMessage} 
                                setSuccessMessage={setSuccessMessage}/>
            )}
            <AnimatePresence initial={false}>
                {topic.topicThread.map((thread: any, index: number) => (
                    <motion.div
                        key={thread._id ?? index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-[55%] py-1 px-3 flex flex-col bg-white rounded-md my-1"
                    >
                        <div className="w-full flex  justify-between ">
                            <div className="w-[40%] flex">
                                <img className="object-contain mt-2 mr-2 w-14 h-14 bg-white rounded-full border-2 border-black" src={thread.createdBy?.avatar || ''} alt="Avatar de l'utilisateur aillant créé le topic" />
                                <div className="flex flex-col ">
                                    <span className="text-black font-bold">{thread.createdBy?.pseudo || 'Anonyme'}</span>
                                    <span className="text-black text-sm">title</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                    </svg>
                                </div>
                            </div>
                            <div className=" h-full w-full flex justify-end items-center">
                                {(token && !isLocked) &&
                                    <div className="w-fit flex justify-between ">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 m-1 cursor-pointer">
                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 m-1 cursor-pointer">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                }

                            </div>
                        </div>
                        <div className="w-full my-1 flex flex-col justify-between border-t-2 border-gray-300 ">
                            <span className="ml-1 my-1 text-sm text-black"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.text) }}
                            />
                        </div>
                        <div className=" h-full w-full ">
                            <div className="w-full flex justify-end items-center ">
                                <span className="font-bold text-xs text-gray-500 mr-2">Créé le :</span>
                                <span className="text-blue-500 text-sm font-bold">{formatDateToBelgium(topic.creationDate)}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default TopicThread