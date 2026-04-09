import { useAppSelector } from "../store/hooks.js"
import { useState, startTransition } from 'react';

import {modalProps, msgProps} from "../types/Props.js";
interface props {
    setIsNewComment: (value: boolean) => any
    modalProps: modalProps
    msgProps: msgProps
    setResponseType: (value: string) => any
    threadRef: any
    iconOrigin: string
    keyNumber: any
    setKeyNumber : (value: number) => any
    topic: any
    setReplyTo : (value: any) => any
    setQuoteID: (value: any) => any
    setPseudo: (value: string) => any
    thread: any
    index: number
}

function IconResponse({ setIsNewComment, modalProps, msgProps, setResponseType, threadRef, iconOrigin, keyNumber, setKeyNumber, topic, setReplyTo, setQuoteID, setPseudo, thread, index }: props) {
    const [hover, setHover] = useState<boolean>(false);
    let stroke;
    let mouseEnter : any;
    let mouseLeave : any;
    let action : any;

    const token = useAppSelector((state) => state.authToken.value);

    const handleMouseEnter = (index: number, isTrue: boolean) => {
        setHover(isTrue)
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

    const handleReplyTopic = () => {
        if (!token) {
            modalProps.setIsMessageModalOpen(true);
            msgProps.setErrorMessage("Vous devez vous connecter pour commenter");
            return
        }
        setResponseType("topic");
        setIsNewComment(true)
        handleScroll()
    }

    const handleReplyComment = (threadID: string) => {

        if (!token) {
            modalProps.setIsMessageModalOpen(true);
            msgProps.setErrorMessage("Vous devez vous connecter pour commenter");
            return;
        }

        // Récupère le commentaire ciblé
        const targetThread = topic.topicThread.find((t: any) => t.id === threadID);
        if (!targetThread) return;

        // Récupère toutes les citations précédentes de ce commentaire
        const quoteArr: { id: string }[] = [];
        const quoteInfo: { pseudo: string, text: string }[] = [];

        if (targetThread.quote?.length) {
            targetThread.quote.forEach((quoteId: string) => {
                console.log("quoteIdThread", quoteId)
                const quotedThread = topic.topicThread.find((t: any) => t.id === quoteId);
                if (quotedThread) {
                    quoteArr.push(quotedThread.id);
                    quoteInfo.push({ pseudo: quotedThread.createdBy.pseudo, text: quotedThread.text });
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
        setQuoteID(quoteArr);  // On passe maintenant le tableau complet
        setIsNewComment(true);
        setPseudo(topic.createdBy.pseudo);
        handleScroll();
    }

    if (iconOrigin === "topic") {
        stroke =  hover ? '#D1D5DB' : " #9CA3AF" 
        mouseEnter = () => setHover(true)
        mouseLeave = () => setHover(false)
        action = handleReplyTopic
    } else if (iconOrigin === "comment") {
        stroke =  hover && keyNumber === index ? '#9CA3AF' : " #1F2937" 
        mouseEnter = () => handleMouseEnter(index, true)
        mouseLeave = () => handleMouseEnter(index, false)
        action = () => handleReplyComment(thread.id)
    }

    return (
            <div className="relative group inline-block">
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke={stroke}
                    className="size-6 m-1 cursor-pointer"
                    onMouseEnter= {mouseEnter}
                    onMouseLeave= {mouseLeave}
                    onClick={action}
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
    )
}

export default IconResponse