import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';

import { lockTopic } from "../utils/topicActions.js";
import { formatDateToBelgium } from "../utils/formatDateActions.js";

interface topicProps {
    setIsModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setAuthType: (value: string) => any
    setIsNewComment: (value: boolean) => any
    isNewComment: boolean
    setMessageModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
}

function TopicThread({ setIsModalOpen, setModalComponent, setAuthType, setIsNewComment, isNewComment, setMessageModalOpen, setErrorMessage }: topicProps) {
    const [newComment, setNewComment] = useState<string>('');
    const [lockHover, setLockHover] = useState<boolean>(false);
    const [editHover, setEditHover] = useState<boolean>(false);
    const [msgHover, setMsgHover] = useState<boolean>(false);

    console.log("newComment", newComment);

    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value); 

    const isLocked = useAppSelector((state) => state.topic.value.isLocked);

    console.log("topic in TOPIC", topic);

    const handleEditTopic = () => {
        setIsModalOpen(true);
        setModalComponent('editTopic');
    }

    const handleLockTopic = async () => {
        setAuthType("lockTopic");
        setIsModalOpen(true)
        setModalComponent('auth');
    }

    const handleUnlockTopic = () => {
        setAuthType("lockTopic");
        setIsModalOpen(true)
        setModalComponent('auth');
    }

    const handleComment = () => {
        if (!token) {
            setMessageModalOpen(true);
            setErrorMessage("Vous devez vous connecter pour commenter");
        }
        setIsNewComment(!isNewComment)
    }

    return (
        <div className="w-[85%] flex flex-col justify-center items-center bg-gray-800 border-2 border-gray-800  rounded-md mb-2">
            <div className="w-full flex flex bg-gray-300  rounded-xs">
                <div className="w-fit flex flex-col justify-center items-center border-r-2 border-gray-800 rounded-l-xs">
                    <img className="object-contain mt-2 mx-2 w-14 h-14 bg-gray-200 rounded-full border-2 border-gray-800" src={topic.createdBy.avatar} alt="Avatar de l'utilisateur aillant créé le topic" />
                    <div className="flex flex-col justify-center items-center mx-2">
                        <span className="text-gray-800 font-bold">{topic.createdBy.pseudo}</span>
                        {!msgHover &&
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6" onMouseEnter={() => setMsgHover(true)} >
                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                            </svg>
                        }
                        {msgHover &&
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onMouseLeave={() => setMsgHover(false)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                        }
                    </div>
                    <span className="text-gray-600 text-sm mb-2">title</span>
                </div>
                <div className="w-full flex flex-col justify-between bg-gray-500">
                    <div className="w- h-fit flex  justify-between  bg-gray-800 border-t border-t-gray-500 px-1">
                        <div className="w-full flex justify-start items-center  ">
                            <span className="font-bold text-xs text-gray-300 mr-2">Créé le :</span>
                            <span className="text-blue-500 text-xs font-black">{formatDateToBelgium(topic.creationDate)}</span>
                        </div>
                        <div className=" h-full w-full flex justify-end items-center">
                            {token &&
                                <div className="w-fit flex justify-between ">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 m-1 cursor-pointer" style={{ color: editHover ?'#D1D5DB' : " #9CA3AF"  }} onMouseEnter={() => setEditHover(true)} onMouseLeave={() => setEditHover(false)} onClick={handleEditTopic}>
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>

                                    {isLocked &&
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer" style={{ color: lockHover ? '#D1D5DB' : " #9CA3AF"}} onMouseEnter={() => setLockHover(true)} onMouseLeave={() => setLockHover(false)} onClick={handleUnlockTopic}>
                                            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                                        </svg>
                                    }
                                    {!isLocked &&
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 m-1 cursor-pointer" style={{ color: lockHover ? '#D1D5DB' : " #9CA3AF"}} onMouseEnter={() => setLockHover(true)} onMouseLeave={() => setLockHover(false)} onClick={handleLockTopic}>
                                            <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z" />
                                        </svg>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className="w-full h-full  flex flex-col justify-between border-t-2 border-gray-800 ">
                        <div className="ml-2 w-full h-fit flex flex-col  ">
                            <span className="ml-1  text-3xl font-bold text-gray-800">{topic.title}</span>
                            <span className="ml-2  text-sm text-gray-300 ">{topic.description}</span>
                        </div>

                    </div>
                    <div className="flex justify-end items-end ">
                        <button className="px-8 py-1 bg-gray-800 border-l-2 border-t-2  border-gray-800 rounded-tl-xs text-gray-200 cursor-pointer hover:bg-gray-700"
                            onClick={handleComment}>commenter</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TopicThread