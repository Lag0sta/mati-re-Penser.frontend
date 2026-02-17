import DOMPurify from 'dompurify';

import { useAppSelector } from "../store/hooks.js"
import { useState, startTransition } from 'react';

import { formatDateToBelgium } from "../utils/formatDateActions.js";

interface topicProps {
    setIsModalOpen: (value: boolean) => any
    setIsTextModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setAuthType: (value: string) => any
    setIsNewComment: (value: boolean) => any
    isNewComment: boolean
    setMessageModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
    setResponseType: (value: string) => any
    threadRef: any
}

function TopicThread({ setIsModalOpen, setIsTextModalOpen, setModalComponent, setAuthType, setIsNewComment, isNewComment, setMessageModalOpen, setErrorMessage, setResponseType, threadRef }: topicProps) {
    const [lockHover, setLockHover] = useState<boolean>(false);
    const [editHover, setEditHover] = useState<boolean>(false);
    const [replyHover, setReplyHover] = useState<boolean>(false);

    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);
    const isLocked = useAppSelector((state) => state.topic.value.isLocked);
console.log("whatTopic", topic)

    const handleEditTopic = () => {
        setIsTextModalOpen(true);
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

    const handleReplyTopic = () => {
        console.log("clickReplyRopic")
        if (!token) {
            setMessageModalOpen(true);
            setErrorMessage("Vous devez vous connecter pour commenter");
            return
        }
        setResponseType("topic");
        setIsNewComment(true)
        handleScroll()
    }

    return (
        <div className="w-[85%] px-2 py-2 flex flex-col justify-center items-center border-2 border-gray-800  rounded-md"
            style={{ backgroundColor: "#3b566fff" }}>
            <div className="w-full flex justify-between items-center  rounded-xs">
                <div className="w-full  flex justify-evenly items-center rounded-l-xs">
                    <div className="w-full flex justify-start items-center ">
                        <img className="mr-2 object-contain w-10 h-10 bg-white rounded-full border-2 border-gray-800"
                            src={topic.createdBy.avatar}
                            alt="Avatar de l'utilisateur aillant créé le topic" />
                        <span className="mx-1 text-md text-white font-bold">
                            {topic.createdBy.pseudo}
                        </span>
                        <span className="ml-1 mt-1 text-xs font-bold text-gray-400">
                            {formatDateToBelgium(topic.creationDate)}
                        </span>
                    </div>

                    <div className="w-full flex justify-end items-center ">
                        {token &&
                            <div className="w-fit flex justify-between ">

                                {/* Icône Répondre au Topic */}
                                <div className="relative group inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke={replyHover ? "#D1D5DB" : "#9CA3AF"}
                                        className="size-6 m-1 cursor-pointer"
                                        onMouseEnter={() => setReplyHover(true)}
                                        onMouseLeave={() => setReplyHover(false)}
                                        onClick={handleReplyTopic}
                                    >
                                        <path strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3"
                                        />
                                    </svg>
                                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                                        commenter
                                    </span>
                                </div>

                                {/* Icône Modifier le Topic */}
                                <div className="relative group inline-block">

                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6 m-1 cursor-pointer"
                                        style={{ color: editHover ? '#D1D5DB' : " #9CA3AF" }}
                                        onMouseEnter={() => setEditHover(true)}
                                        onMouseLeave={() => setEditHover(false)}
                                        onClick={handleEditTopic}>
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                                        modifier
                                    </span>
                                </div>
                                {/* Icône dégeler le Topic */}
                                {isLocked &&
                                    <div className="relative group inline-block">

                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-6 m-1 cursor-pointer"
                                            style={{ color: lockHover ? '#D1D5DB' : " #9CA3AF" }} onMouseEnter={() => setLockHover(true)}
                                            onMouseLeave={() => setLockHover(false)}
                                            onClick={handleUnlockTopic}>
                                            <path fillRule="evenodd"
                                                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                                                clipRule="evenodd" />
                                        </svg>
                                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                                            dégeler la discussion
                                        </span>
                                    </div>
                                }

                                {/* Icône geler le Topic */}
                                {!isLocked &&
                                    <div className="relative group inline-block">

                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-6 m-1 cursor-pointer"
                                            style={{ color: lockHover ? '#D1D5DB' : " #9CA3AF" }} onMouseEnter={() => setLockHover(true)}
                                            onMouseLeave={() => setLockHover(false)}
                                            onClick={handleLockTopic}>
                                            <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z" />
                                        </svg>
                                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                                            geler la discussion
                                        </span>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="w-full h-full  ml-16 px-4 flex flex-col justify-between ">
                <div className="ml-2 w-full h-fit flex flex-col  ">
                    <span className="ml-1  text-3xl font-bold text-white">
                        {topic.title}
                    </span>
                    <span className="ml-2  text-md text-gray-300" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(topic.description) }}/>
                        
                </div>
            </div>
        </div>
    )
}

export default TopicThread