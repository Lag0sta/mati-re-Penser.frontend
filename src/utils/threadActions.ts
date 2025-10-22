import { threadData } from './types.js';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface threadProps {
    threadData: threadData
}
export async function addComment({ threadData }: threadProps) {
    const { token, title, newComment} = threadData
    console.log("initComment", threadData)

    try {
        const response = await fetch(`${API_URL}/threads/newComment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                text: newComment,
                title: title
            })
        })

        const thread = await response.json()
        console.log("returnComment", thread)
        return thread

    } catch (error) {
        return error
    }
}

export async function editComment({ threadData }: threadProps) {
    const { token, id, text } = threadData
    try {
        const comment = await fetch(`${API_URL}/threads/editComment`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                text: text,
                id: id
            }
            )
        }
        )
        const thread = await comment.json()
        console.log("thread", thread)
        return thread
    }catch (error) {
        return error
    }
}

export async function deleteComment({ threadData }: threadProps) {
    console.log("pop")
    const { token, id, } = threadData
    console.log("threadData", threadData)
    try {
        const deleteComment = await fetch(`${API_URL}/threads/deleteComment`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                id: id
            }
            )
        }
        )
        const thread = await deleteComment.json()
        console.log("threadDelete", deleteComment)
        return thread
    }catch (error) {
        return error
    }
}