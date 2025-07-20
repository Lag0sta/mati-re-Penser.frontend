import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';

import { lockTopic } from "../utils/topicActions.js";
import { formatDateToBelgium } from "../utils/formatDateActions.js";

interface topicProps {
    setIsModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setAuthType: (value: string) => any
}

function TopicThread({ setIsModalOpen, setModalComponent, setAuthType }: topicProps) {
    const [newComment, setNewComment] = useState<string>('');
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

    return (
        <div className="w-[55%] flex flex-col justify-center items-center px-3 py-3 bg-black  rounded-md mb-2">
            <div className="w-full py-1 px-3 flex flex-col bg-white rounded-md">
                <div className="w-full flex  justify-between ">
                    <div className="w-[40%] flex">
                        <img className="object-contain mt-2 mr-2 w-14 h-14 bg-gray-white rounded-full border-2 border-black" src={topic.createdBy.avatar} alt="Avatar de l'utilisateur aillant créé le topic" />
                        <div className="flex flex-col ">
                            <span className="text-black font-bold">{topic.createdBy.pseudo}</span>
                            <span className="text-gray-600 text-sm">title</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                            </svg>
                        </div>
                    </div>
                    <div className=" h-full w-full flex justify-end items-center">
                        {token &&
                            <div className="w-fit flex justify-between ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 m-1 cursor-pointer" onClick={handleEditTopic}>
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>

                                {isLocked &&
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6" onClick={handleUnlockTopic}>
                                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                                    </svg>
                                }
                                {!isLocked &&
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6" onClick={handleLockTopic}>
                                        <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z" />
                                    </svg>
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className="w-full mt-1 flex flex-col justify-between border-t-2 border-gray-300 ">
                    <div className="w-full h-fit flex flex-col ml-2 ">
                        <span className="ml-1 mt-1 text-3xl font-bold text-black">{topic.title}</span>
                        <span className="ml-1 text-sm text-black mb-2">{topic.description}</span>
                    </div>
                </div>
                <div className=" h-full w-full ">
                    <div className="w-full flex justify-end items-center ">
                        <span className="font-bold text-xs text-gray-500 mr-2">Créé le :</span>
                        <span className="text-blue-500 text-sm font-bold">{formatDateToBelgium(topic.creationDate)}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TopicThread