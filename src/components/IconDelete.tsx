import { useAppSelector, useAppDispatch } from "../store/hooks.js"
import { useState } from 'react';
import { getComment } from "../store/reducers/comment.js";
import { deleteCommentRequest } from "../utils/threadActions.js";
import {modalProps, msgProps} from "../types/Props.js";
import { useSelector } from "react-redux";
interface props {
    modalProps: modalProps
    iconOrigin: string
    keyNumber: any
    setKeyNumber : (value: number) => any
    topic: any
    thread: any
    index: number
}

function IconResponse({  modalProps, iconOrigin, keyNumber, setKeyNumber, topic, thread, index }: props) {
    const [hover, setHover] = useState<boolean>(false);
    let style;
    let mouseEnter : any;
    let mouseLeave : any;
    let action : any;
    

    const dispatch = useAppDispatch()

    const handleMouseEnter = (index: number, isTrue: boolean) => {
        setHover(isTrue)
        setKeyNumber(index)
    }

       const handleDeleteComment =  (index: number) => {
            modalProps.setModalComponent("deleteComment")
            modalProps.setIsModalOpen(true);

            const commentToDelete = topic.topicThread[index];

            console.log("commentToDeleteID", commentToDelete.id)

            dispatch(getComment({ id: commentToDelete.id }))
        }

    
    if (iconOrigin === "comment") {
        style =  {color: hover && keyNumber === index ? '#9CA3AF' : " #1F2937"}
        mouseEnter = () => handleMouseEnter(index, true)
        mouseLeave = () => handleMouseEnter(index, false)
        action = () => handleDeleteComment(thread.id)
    }

    return (
            <div className="relative group inline-block">
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 m-1 cursor-pointer rounded-full"
                    style={style}
                    clipRule="evenodd"
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    onClick={() => handleDeleteComment(index)}
                >
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    />
                </svg>
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                    Supprimer
                </span>
            </div>
    )
}

export default IconResponse