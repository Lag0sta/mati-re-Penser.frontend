import { threadData } from './types.js';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface threadProps {
    threadData: threadData
}
export async function addComment({ threadData }: threadProps) {
    const { token, title, newComment } = threadData

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

        return thread

    } catch (error) {
        return error
    }
}

export async function addReply({ threadData }: threadProps) {
const { token, id, newComment } = threadData
    try {
        console.log("replyID :", id)

        const response = await fetch(`${API_URL}/threads/newResponse`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                threadId: id,
                text: newComment,
            })
        })

        const comment = await response.json()

        return comment

    } catch (error) {
        return error
    }

}

export async function editReply({ threadData }: threadProps) {
    const { token, id, newComment } = threadData
    try {
        
    }catch (error) {
        return error
    }
}