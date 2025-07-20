import { topicData } from './types.js';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface topicProps {
    topicData: topicData
}

export async function newTopic({ topicData }: topicProps) {
    const { token, title, description } = topicData

    try {
        const topic = await fetch(`${API_URL}/submits/newTopic`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                title: title,
                description: description
            })
        })
        const response = await topic.json()

        if (!response.result) return response;

        const newTopic = await fetch(`${API_URL}/submits/topicContent`, {
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

export async function editTopic({ topicData }: topicProps) {
    const { token, id, title, description } = topicData

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

export async function lockTopic({ topicData }: topicProps) {
    const { id, isLocked, token } = topicData
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

export async function topicThread({ topicData }: topicProps) {
    const { title } = topicData

    try {
        const topic = await fetch(`${API_URL}/topics/topicContent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title
            }
            )
        }
        )
        const response = await topic.json()
        console.log("responseTopicThread :", response)
        return response


    } catch (error) {
        return error
    }
}


