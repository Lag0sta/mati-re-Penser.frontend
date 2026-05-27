import DOMPurify from 'dompurify';
import { useAppSelector } from "../store/hooks.js"
import { useState, useRef, useMemo } from 'react';
import '../styles/TopicThreads.css';


import Topic from "./Topic.js";
import Thread from "./Thread.js";
import CommentNew from "./CommentNew.js";

import { msgProps, modalProps } from "../types/Props.js";
type Thread = {
    id: string
    createdBy: { avatar: string, pseudo: string, id: string }
    topic: string
    text: string
    quote?: string[]
}

type ThreadNode = Thread & {
    children: ThreadNode[]
}


function ThreadNodeView({ node }: { node: ThreadNode }) {
    console.log("node", node)
    return (
        <div className="ml-2  mt-2 ">
            <div className="ml-4  mt-2 flex">
                <span className="font-bold mr-2"> {node.createdBy.pseudo} :</span>
                <div dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(node.text)
                    }}
                />
            </div>


            {node.children.length > 0 && (
                <div className='m-0 ml-7 border-l '>
                    {node.children.map(child => (
                        <ThreadNodeView
                            key={child.id}
                            node={child}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ThreadNodeView;