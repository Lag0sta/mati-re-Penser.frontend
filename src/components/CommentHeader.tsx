import { useAppDispatch, useAppSelector } from "../store/hooks.js"
import { useState, startTransition } from 'react';

import { getComment } from '../store/reducers/comment.js'
import { modalProps, msgProps } from "../types/Props.js";
import IconEdit from "./IconEdit.js";
import IconDelete from "./IconDelete.js";
import IconResponse from "./IconResponse.js";

interface props {
    setPseudo: (value: string) => any
    modalProps: modalProps
    msgProps: msgProps
    setIsNewComment: (value: boolean) => any
    threadRef: any
    setReplyTo: (value: any) => any
    setAuthType: (value: string) => any
    setQuoteID: (value: any) => any
    index: number
    thread: any
}

function CommentHeader({ index, thread, setPseudo, modalProps, msgProps, setIsNewComment, threadRef, setReplyTo, setAuthType, setQuoteID }: props) {
    const [deleteHover, setDeleteHover] = useState<boolean>(false);
    const [responseType, setResponseType] = useState<string>("");
    const [keyNumber, setKeyNumber] = useState<number>();
    const iconOrigin = "comment"
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.authToken.value);
    const topic: any = useAppSelector((state) => state.topic.value);

    const handleMouseEnterDelete = (index: number, isTrue: boolean) => {
        setDeleteHover(isTrue)
        setKeyNumber(index)
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

    return (
        <div className="w-fit flex justify-between ">

            {/* Icône réponse */}
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
                setQuoteID={setQuoteID}
                setPseudo={setPseudo}
                thread={thread} index={index}/>
            

            {/* Icône modifier */}
            <IconEdit msgProps={msgProps}
                setKeyNumber={setKeyNumber}
                token={token}
                setReplyTo={setReplyTo}
                modalProps={modalProps}
                iconOrigin={iconOrigin}
                index={index}
                topic={topic}
                keyNumber={keyNumber}
                thread={thread} />

            {/* Icône Delete */}
            <IconDelete modalProps={modalProps} iconOrigin={iconOrigin} keyNumber={keyNumber} setKeyNumber={setKeyNumber} topic={topic} thread={thread} index={index}/>
            
        </div>
    )
}

export default CommentHeader