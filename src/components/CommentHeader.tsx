import { useAppDispatch, useAppSelector } from "../store/hooks.js"
import { useState, startTransition } from 'react';

import { getComment } from '../store/reducers/comment.js'

interface threadListProps {
    setPseudo: (value: string) => any
    setIsModalOpen: (value: boolean) => any
    setIsTextModalOpen: (value: boolean) => any
    setMessageModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setErrorMessage: (value: string) => any
    setIsNewComment: (value: boolean) => any
    threadRef: any
    setReplyTo: (value: any) => any
    setAuthType: (value: string) => any
    setQuoteID: (value: any) => any
    index: number
    thread: any
}

function CommentHeader({ index, thread, setPseudo, setIsModalOpen, setIsTextModalOpen, setMessageModalOpen, setModalComponent, setErrorMessage, setIsNewComment, threadRef, setReplyTo, setAuthType, setQuoteID }: threadListProps) {
    const [replyHover, setReplyHover] = useState<boolean>(false);
    const [editHover, setEditHover] = useState<boolean>(false);
    const [deleteHover, setDeleteHover] = useState<boolean>(false);

    const [keyNumber, setKeyNumber] = useState<number>();
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.authToken.value);
    const topic: any = useAppSelector((state) => state.topic.value);
    console.log("nThread", topic.topicThread.length)
    console.log("topic", topic)

    const isLocked = useAppSelector((state) => state.topic.value.isLocked);

    const handleMouseEnterReply = (index: number, isTrue: boolean) => {
        setReplyHover(isTrue)
        setKeyNumber(index)
    }

    const handleMouseEnterEdit = (index: number, isTrue: boolean) => {
        setEditHover(isTrue)
        setKeyNumber(index)
    }

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

    const handleEditComment = (threadID: string) => {
        console.log("threadID", threadID);

        if (!token) {
            setMessageModalOpen(true);
            setErrorMessage("Vous devez vous connecter pour commenter");
            return;
        }

        // Récupère le commentaire ciblé
        const targetThread = topic.topicThread.find((t: any) => t.id === threadID);
        if (!targetThread) return;
        console.log("targetThread", targetThread)
        dispatch(getComment(targetThread))
        // Récupère toutes les citations précédentes de ce commentaire
        const quoteArr: { id: string }[] = [];
        const quoteInfo: { pseudo: string, text: string }[] = [];
        console.log("quoteArrTHREAD", quoteArr)
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
        console.log("quoteArrThread", quoteArr)

        setReplyTo(quoteInfo)
        // Ouvrir modal
        setIsTextModalOpen(true);
        setModalComponent('editComment');
    }

    const handleReplyComment = (threadID: string) => {

        if (!token) {
            setMessageModalOpen(true);
            setErrorMessage("Vous devez vous connecter pour commenter");
            return;
        }

        // Récupère le commentaire ciblé
        const targetThread = topic.topicThread.find((t: any) => t.id === threadID);
        if (!targetThread) return;

        // Récupère toutes les citations précédentes de ce commentaire
        const quoteArr: { id: string }[] = [];
        const quoteInfo: { pseudo: string, text: string }[] = [];
        console.log("quoteArrTHREAD", quoteArr)
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

    const handleDeleteComment = (index: number) => {
        setAuthType("deleteComment");
        const commentToDelete = topic.topicThread[index];

        dispatch(getComment({ id: commentToDelete.id }))
        setIsModalOpen(true);
        setModalComponent("auth")
    }

    return (
                <div className="w-fit flex justify-between ">

                    {/* Icône réponse */}
                    <div className="relative group inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke={replyHover && keyNumber === index ? "#D1D5DB" : "#1F2937"}
                            className="size-6 m-1 cursor-pointer"
                            onMouseEnter={() => handleMouseEnterReply(index, true)}
                            onMouseLeave={() => handleMouseEnterReply(index, false)}
                            onClick={() => handleReplyComment(thread.id)}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3"
                            />
                        </svg>
                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                            Répondre
                        </span>
                    </div>

                    {/* Icône modifier */}
                    <div className="relative group inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 m-1 cursor-pointer"
                            style={{ color: editHover && keyNumber === index ? '#9CA3AF' : " #1F2937" }} onMouseEnter={() => handleMouseEnterEdit(index, true)}
                            onMouseLeave={() => handleMouseEnterEdit(index, false)}
                            onClick={() => handleEditComment(thread.id)}
                        >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                            Modifier
                        </span>
                    </div>

                    {/* Icône Delete */}
                    <div className="relative group inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 m-1 cursor-pointer rounded-full"
                            style={{ color: deleteHover && keyNumber === index ? '#9CA3AF' : " #1F2937" }}
                            clipRule="evenodd"
                            onMouseEnter={() => handleMouseEnterDelete(index, true)}
                            onMouseLeave={() => handleMouseEnterDelete(index, false)}
                            onClick={() => handleDeleteComment(index)}
                        >
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            />
                        </svg>
                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                            Supprimer
                        </span>
                    </div>
                </div>
    )
}

export default CommentHeader