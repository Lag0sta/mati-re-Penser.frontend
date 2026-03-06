import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';

interface threadListProps {
    thread: any
}

function CommentUserUI({ thread }: threadListProps) {

    const [msgHover, setMsgHover] = useState<boolean>(false);
    const topic: any = useAppSelector((state) => state.topic.value);
    console.log("nThread", topic.topicThread.length)
    console.log("topic", topic)

    return (

        <div className="w-[15%] flex flex-col justify-center items-center bg-gray-500 border-r-2 border-gray-800 rounded-l-xs">
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
    )
}

export default CommentUserUI