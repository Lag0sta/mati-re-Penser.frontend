import { addCData, editCData, deleteCData } from '../types/threadActions.js';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function addCommentRequest( addCData : addCData ) {
    const { token, title, newComment, quote} = addCData
    console.log("initComment", addCData)

    try {
        const response = await fetch(`${API_URL}/threads/newComment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                text: newComment,
                title: title,
                quote: quote
            })
        })

        const thread = await response.json()
        console.log("returnComment", thread)
        return thread

    } catch (error) {
        return error
    }
}

export async function editCommentRequest( editCData : editCData) {
    const { token, id, text } = editCData
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

        return thread

    }catch (error) {
        return error
    }
}

export async function deleteCommentRequest( deleteCData : deleteCData) {
    const { token, id, } = deleteCData
    console.log("deleteCData", deleteCData)
    try {
        const deleteComment = await fetch(`${API_URL}/threads/deleteComment`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                id: id
            })
        })
        const thread = await deleteComment.json()

        return thread
        
    }catch (error) {
        return error
    }
}