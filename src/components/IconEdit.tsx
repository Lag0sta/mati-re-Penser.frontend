import { useState,  } from 'react';
import { useAppDispatch } from '../store/hooks.js';
import { getComment } from '../store/reducers/comment.js';

import { msgProps, modalProps } from "../types/Props.js";
interface props {
    msgProps: msgProps
    modalProps: modalProps
    iconOrigin: string
    setKeyNumber : (value: number) => any
    token: string
    index : number
    setReplyTo : (value: any) => any
    topic: any
    keyNumber: any
    thread: any
}

function IconEdit({ msgProps, modalProps, iconOrigin, setKeyNumber, token, index, setReplyTo, topic, keyNumber, thread }: props) {
    const [hover, setHover] = useState<boolean>(false);
    let style;
    let mouseEnter : any;
    let mouseLeave : any;
    let action : any;

    const dispatch = useAppDispatch();

    const handleMouseEnter = (index: number, isTrue: boolean) => {
        setHover(isTrue)
        setKeyNumber(index)
    }

    const handleEditTopic = () => {
        modalProps.setIsTextModalOpen(true);
        modalProps.setModalComponent('editTopic');
    }

    const handleEditComment = (threadID: string) => {
    console.log("clickman")
            if (!token) {
                modalProps.setIsMessageModalOpen(true);
                msgProps.setErrorMessage("Vous devez vous connecter pour commenter");
                console.log("Vous devez vous connecter pour commenter")
                return;
            }
    
            // Récupère le commentaire ciblé
            const targetThread = topic.topicThread.find((t: any) => t.id === threadID);
            if (!targetThread) return;
            dispatch(getComment(targetThread))
            console.log("getComment(targetThread)")
            // Récupère toutes les citations précédentes de ce commentaire
            const quoteArr: { id: string }[] = [];
            const quoteInfo: { pseudo: string, text: string }[] = [];
            if (targetThread.quote?.length) {
                targetThread.quote.forEach((quoteId: string) => {
                    const quotedThread = topic.topicThread.find((t: any) => t.id === quoteId);
                    if (quotedThread) {
                        quoteArr.push(quotedThread.id);
                        quoteInfo.push({ pseudo: quotedThread.createdBy.pseudo, text: quotedThread.text });
                        console.log("quoteInfo.push({ pseudo: quotedThread.createdBy.pseudo, text: quotedThread.text })")
                    }
                });
            }
    
            // Ajoute le dernier commentaire ciblé à la fin
            quoteArr.push(targetThread.id);
            quoteInfo.push({
                pseudo: targetThread.createdBy.pseudo,
                text: targetThread.text
            });
            setReplyTo(quoteInfo)
            console.log("quoteInfo")
            // Ouvrir modal
            modalProps.setIsTextModalOpen(true);
            modalProps.setModalComponent('editComment');
        }
    
    if (iconOrigin === "topic") {
        style = { color: hover ? '#D1D5DB' : " #9CA3AF" }
        mouseEnter = () => setHover(true)
        mouseLeave = () => setHover(false)
        action = handleEditTopic
    } else if (iconOrigin === "comment") {
        style = { color: hover && keyNumber === index ? '#9CA3AF' : " #1F2937" }
        mouseEnter = () => handleMouseEnter(index, true)
        mouseLeave = () => handleMouseEnter(index, false)
        action = () => handleEditComment(thread.id)
    }

    return (

        <div className="w-fit flex justify-between ">

            {/* Icône Modifier le Topic */}
            <div className="relative group inline-block">

                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 m-1 cursor-pointer"
                    style={style}
                    onMouseEnter= {mouseEnter}
                    onMouseLeave= {mouseLeave}
                    onClick={action}>
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                    modifier
                </span>
            </div>


        </div>
    )
}

export default IconEdit