import DOMPurify from 'dompurify';

import { useAppSelector } from "../store/hooks.js"
import { useState } from "react"
import IconResponse from './IconResponse.js';
import IconEdit from './IconEdit.js';
import IconLock from './IconLock.js';

import { formatDateToBelgium } from "../utils/formatDateActions.js";
import { msgProps, modalProps } from "../types/Props.js";

interface props {
    modalProps: modalProps
    setAuthType: (value: string) => any
    setIsNewComment: (value: boolean) => any
    msgProps: msgProps
    setResponseType: (value: string) => any
    threadRef: any
}

function Topic({ modalProps, msgProps, setAuthType, setIsNewComment, setResponseType, threadRef }: props) {

    const thread: any = useAppSelector((state) => state.topic.value);
    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);
    const iconOrigin = "topic"

    const index = 0;
    const [replyTo, setReplyTo] = useState()
    const [keyNumber, setKeyNumber] = useState(0)
    const [quoteID, setQuoteID] = useState("")
    const [pseudo, setPseudo] = useState("")
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
                                <IconResponse setIsNewComment={setIsNewComment}
                                    modalProps={modalProps}
                                    msgProps={msgProps}
                                    setResponseType={setResponseType}
                                    threadRef={threadRef}
                                    iconOrigin={iconOrigin}
                                    keyNumber={keyNumber}
                                    setKeyNumber={setKeyNumber}
                                    topic={topic}
                                    setReplyTo={setReplyTo}
                                    setPseudo={setPseudo}
                                    setQuoteID={setQuoteID}
                                    thread={thread}
                                    index={index}
                                    />

                                {/* Icône Modifier le Topic */}
                                <IconEdit modalProps={modalProps}
                                    iconOrigin={iconOrigin}
                                    topic={topic}
                                    token={token}
                                    msgProps={msgProps}
                                    setReplyTo={setReplyTo}
                                    index={index}
                                    keyNumber={keyNumber}
                                    setKeyNumber={setKeyNumber}
                                    thread={thread}/>
                                
                                {/* Icône dégeler le Topic */}
                                <IconLock modalProps={modalProps}
                                          setAuthType={setAuthType}
                                          iconOrigin={iconOrigin}/>
                                          
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
                    <span className="ml-2  text-md text-gray-300" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(topic.description) }} />

                </div>
            </div>
        </div>
    )
}

export default Topic