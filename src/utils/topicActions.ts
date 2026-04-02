import { tTData, lockTData, editTData, newTData } from '../types/topicActions.js';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function newTopicRequest( newTData : newTData) {
    const { token, title, description } = newTData
    
    try {
        const topic = await fetch(`${API_URL}/topics/newTopic`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                title: title,
                description: description
            })
        })
        const response = await topic.json()
        console.log("response", response)
        if (!response.result) return response;

        const newTopic = await fetch(`${API_URL}/topics/topicContent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title
            }
            )
        })

        const response2 = await newTopic.json()

        return response2

    } catch (error) {
        return error
    }
}
export async function editTopicRequest( editTData : editTData) {
    const { token, id, title, description } = editTData

    try {
        const editTopic = await fetch(`${API_URL}/topics/editTopic`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                token: token,
                title: title,
                description: description
            })
        })
        const editResponse = await editTopic.json()
        console.log("editResponse", editResponse)
        return editResponse

    } catch (error) {
        return error
    }
}

// import { lockTopic } from '../store/reducers/topic.js';
export async function lockTopicRequest( lockTData : lockTData) {
    const { id, isLocked, token } = lockTData
    try {

        const editLock = await fetch(`${API_URL}/topics/lockTopic`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                id: id,
                isLocked: isLocked
            })
        })
        const response = await editLock.json()

        return response

       
    } catch (error) {
        return error
    }
}

export async function topicThreadRequest( tTData : tTData) {
    const { title } = tTData
        
    try {
        
        console.log("👉 API URL utilisée:", `${API_URL}/topics/topicContent`);
        const topic = await fetch(`${API_URL}/topics/topicContent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title : title
            })
        })
        const response = await topic.json()

        return response

    } catch (error) {
        return error
    }
}


