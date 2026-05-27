import DOMPurify from 'dompurify';
import { useAppSelector } from "../store/hooks.js"
import { useState, useRef, useMemo } from 'react';
import ThreadNodeView from './ThreadNodeView.js';
import '../styles/TopicThreads.css';
import React from 'react';

import Topic from "./Topic.js";
import Thread from "./Thread.js";
import CommentNew from "./CommentNew.js";

import { msgProps, modalProps } from "../types/Props.js";
type Thread = {
    id: string
    createdBy: {avatar : string, pseudo: string, id: string}
    topic: string
    text: string
    quote?: string[]
}
type ThreadNode = Thread & {
    children: ThreadNode[]
}

interface props {

}

function TopicThreadPrint({ }: props) {

    const topic: any = useAppSelector((state) => state.topic.value);

    const threads = topic?.topicThread || [];

    console.log("threads", threads)

    const threadTree = useMemo(() => {
        if (!threads.length) return []
        return buildTree(threads)
    }, [threads])

    function buildTree(threads: Thread[]): ThreadNode[] {
        const map = new Map<string, ThreadNode>()

        // Création des nodes
        for (const thread of threads) {
            map.set(thread.id, {
                ...thread,
                children: [],
            })
        }

        const roots: ThreadNode[] = []

        // Liaison parent/enfant
        for (const thread of threads) {
            const node = map.get(thread.id)!
              console.log("thread:", thread.id, "quote:", thread.quote)

            // pas de quote => racine
            if (!thread.quote || thread.quote.length === 0) {
                roots.push(node)
                continue
            }

            // ici on prend le dernier quote comme parent direct
            const parentId = thread.quote[thread.quote.length - 1]

            const parent = map.get(parentId)

            if (parent) {
                parent.children.push(node)
            } else {
                // parent absent => racine fallback
                roots.push(node)
            }
        }

        return roots
    }




    return (
        <div className="w-full px-2 py-2 flex flex-col bg-white">

            {/* HEADER */}
            <div className="mt-4 mb-6 w-full flex flex-col justify-center items-center">
                <span className="text-3xl font-bold text-gray-800">
                    {topic.title}
                </span>
            </div>

            <div className="mt-2 mx-5">
                <span className="mx-1 text-base texte-base font-italic font-bold">
                    {topic.createdBy.pseudo} :
                    </span>
                <span
                    className="text-md font-semibold text-gray-800"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(topic.description)
                    }}
                />
            </div>

            {/* THREADS */}
            <div className="ml-8 border-l  w-full mt-2 mx-0">
                {threadTree.map(node => (
                    <React.Fragment key={node.id}>
                        <ThreadNodeView node={node} />
                    </React.Fragment>
                ))}
            </div>

        </div>
    );
}

export default TopicThreadPrint;