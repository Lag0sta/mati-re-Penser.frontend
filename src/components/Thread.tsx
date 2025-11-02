import DOMPurify from 'dompurify';
import { useAppDispatch, useAppSelector } from "../store/hooks.js"
import { useState, useEffect, startTransition, useMemo } from 'react';

import { AnimatePresence, motion, useAnimate } from "framer-motion";

import { formatDateToBelgium } from "../utils/formatDateActions.js";
import { openChevron, closeChevron, appearComments, hideComments } from '../utils/animationActions.js';
import { getComment } from '../store/reducers/comment.js'

interface threadListProps {
    setPseudo: (value: string) => any
    setIsModalOpen: (value: boolean) => any
    setIsEditModalOpen: (value: boolean) => any
    setMessageModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setErrorMessage: (value: string) => any
    setIsNewComment: (value: boolean) => any
    threadRef: any
    setThreadID: (value: string) => any
    setResponseType: (value: string) => any
    setReplyTo: (value: any) => any
    pageSize: number
    currentPage: number
    setAuthType: (value: string) => any
    quoteID: string[]
    setQuoteID: (value: any) => any
}

function Thread({ setPseudo, setIsModalOpen, setIsEditModalOpen, setMessageModalOpen, setModalComponent, setErrorMessage, setIsNewComment, threadRef, setThreadID, setResponseType, setReplyTo, pageSize, currentPage, setAuthType, quoteID, setQuoteID }: threadListProps) {
    const [showComments, setShowComments] = useState<any>({ istrue: false, threadId: "" })
    const [replyHover, setReplyHover] = useState<boolean>(false);
    const [msgHover, setMsgHover] = useState<boolean>(false);
    const [editHover, setEditHover] = useState<boolean>(false);
    const [deleteHover, setDeleteHover] = useState<boolean>(false);

    const [keyNumber, setKeyNumber] = useState<number>();
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.authToken.value);
    const topic: any = useAppSelector((state) => state.topic.value);
    console.log("nThread", topic.topicThread.length)

    const isLocked = useAppSelector((state) => state.topic.value.isLocked);

    const [scope, animate]: any = useAnimate();

    // nombres de pages visible
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleComments = topic.topicThread.slice(startIndex, endIndex);

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

    const handleEditComment = (index: number) => {
        const commentToEdit = topic.topicThread[index];
        dispatch(getComment(commentToEdit))
        setIsEditModalOpen(true);
        setModalComponent('editComment');
    }

    const handleDeleteComment = (index: number) => {
        setAuthType("deleteComment");
        const commentToDelete = topic.topicThread[index];

        dispatch(getComment({ id: commentToDelete.id }))
        console.log("commentToDelete", commentToDelete.id)
        setIsModalOpen(true);
        setModalComponent("auth")
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
        console.log("quoteArrThread", quoteArr)

        setReplyTo(quoteInfo)


        setQuoteID(quoteArr);  // On passe maintenant le tableau complet
        setIsNewComment(true);
        setPseudo(topic.createdBy.pseudo);
        handleScroll();
    }



    useEffect(() => {
        if (!scope.current) return;

        if (showComments.istrue) {
            openChevron({ scope, animate });
        } else {
            closeChevron({ scope, animate });
        }

    }, [showComments]);

    useEffect(() => {
        appearComments({ scope, animate });
    }, []);

    return (
        <AnimatePresence initial={false}>
            {visibleComments.map((thread: any, index: number) => (
                <motion.div
                    key={thread._id ?? index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-[85%] max-w-[85%] px-2 py-2 overflow-x-auto overflow-y-hidden"
                >

                    <div className="flex bg-gray-100 rounded-md mt-1 border-2 border-gray-800">
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
                        <div className='flex-col h-full max-w-[85%]'>
                            <div className="w-full h-full  flex  justify-between  px-1">
                                <div className="w-full flex justify-start items-center ">
                                    <span className="font-bold text-xs text-gray-500 mr-2">Créé le :</span>
                                    <span className="text-blue-500 text-xs font-black">{formatDateToBelgium(thread.creationDate)}</span>
                                </div>
                                <div className=" h-full  flex justify-end items-center">
                                    {(token && !isLocked) &&
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
                                                    onClick={() => handleEditComment(index)}
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

                                    }

                                </div>
                            </div>
                            <div className=" p-5 min-h-20 bg-gray-100 flex flex-col justify-between border-t-2 border-gray-800 overflow-x-auto overflow-y-hidden"
                                >

                                {/* Quotes */}
                                {thread.quote.length > 0 && (
                                    <div className="w-full mt-2 p-2 bg-gray-800 rounded-sm text-gray-300 text-xs font-normal overflow-x-auto overflow-y-hidden scrollable-quotes"
                                    >
                                        {(() => {
                                            const quotedThreads = thread.quote
                                                .map((id: string) => topic.topicThread.find((t: any) => t.id === id))
                                                .filter(
                                                    (q: { id?: string } | undefined, i: number, arr: ({ id?: string } | undefined)[]) =>
                                                        q && arr.findIndex(x => x?.id === q.id) === i
                                                );

                                            const [showAllQuotes, setShowAllQuotes] = useState(false);

                                            // Troncature pour > 4 quotes
                                            let displayQuotes = quotedThreads;
                                            if (!showAllQuotes && quotedThreads.length > 4) {
                                                displayQuotes = [
                                                    ...quotedThreads.slice(0, 2), // 2 premières
                                                    "ellipsis",                   // ...
                                                    ...quotedThreads.slice(-2)    // 2 dernières
                                                ];
                                            }

                                            // Fonction récursive pour rendre les quotes imbriquées
                                            const renderNestedQuotes = (quotes: any[]): JSX.Element | null => {
                                                if (!quotes.length) return null;

                                                const last = quotes[quotes.length - 1];
                                                const rest = quotes.slice(0, -1);

                                                if (last === "ellipsis") {
                                                    return (
                                                        <div
                                                            key="ellipsis"
                                                            className="w-full ml-2 my-1 flex-1 flex flex-row items-center text-gray-500 text-xs italic cursor-pointer hover:text-gray-300 transition min-w-[406.5px] "
                                                            onClick={() => setShowAllQuotes(true)}
                                                        >
                                                            <span>…</span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                                            </svg>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div
                                                        key={last.id}
                                                        className="border-[3px] border-gray-600 flex flex-col justify-start items-start p-2 text-md text-gray-400 font-normal mt-1 rounded-sm min-w-[250px]"
                                                    >
                                                        {/* Auteur */}
                                                        <span className="font-semibold text-gray-400 underline underline-offset-2">
                                                            <span className="font-semibold text-gray-200">{last.createdBy.pseudo}</span> a écrit :
                                                        </span>

                                                        {/* Sous-quotes */}
                                                        {rest.length > 0 && (
                                                            <div className="ml-2 w-auto">{renderNestedQuotes(rest)}</div>
                                                        )}

                                                        {/* Texte de la quote actuelle */}
                                                        <span className="ml-2 text-xs mt-1 text-gray-300">{last.text.replace(/<[^>]+>/g, "")}</span>
                                                    </div>
                                                );
                                            };

                                            return (
                                                <>
                                                    <div className="inline-flex space-x-2">{renderNestedQuotes(displayQuotes)}</div>

                                                    {showAllQuotes && quotedThreads.length > 4 && (
                                                        <button
                                                            className="flex flex-row justify-end items-center text-gray-400 text-xs mt-1 hover:text-gray-200 transition"
                                                            onClick={() => setShowAllQuotes(false)}
                                                        >
                                                            Réduire les citations
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </div>
                                )}

                                {/* Message principal */}
                                <span
                                    className="ml-1 my-1 text-sm font-semibold text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.text) }}
                                />

                            </div>

                        </div>

                    </div>

                </motion.div>
            ))}
        </AnimatePresence>
    )
}

export default Thread