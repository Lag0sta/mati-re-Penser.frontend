import { topicData } from './types.js';

interface topicProps {
    topicData: topicData
}

export async function newTopic({ topicData }: topicProps) {
    const { token, title, description } = topicData

    try {
        const topic = await fetch('http://localhost:4000/submits/newTopic', {
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

        const newTopic = await fetch('http://localhost:4000/submits/topicContent', {
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

interface editTopicProps {
    dispatch: any
    id: string
    token: string
    title: string
    description: string
    setErrorMessage: (value: string) => void
    setIsMessageModalOpen: (value: boolean) => void
    setSuccessMessage: (value: string) => void
}
export async function editTopic({ topicData }: topicProps) {
    const { token, id, title, description } = topicData

    try {
        const editTopic = await fetch('http://localhost:4000/topics/editTopic', {
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

        return editResponse

    } catch (error) {
        return error
    }
}

// import { lockTopic } from '../store/reducers/topic.js';

export async function lockTopic({ }) {
    try {
        // if (!token) {
        //     setErrorMessage("Veuillez vous connecter");
        //     return
        // }

        // const editLock = await fetch('http://localhost:4000/topics/lockTopic', {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         token: token,
        //         id: id
        //     })
        // })
        // const response = await editLock.json()

        // if (!response) {
        //     setErrorMessage("Une erreur est survenue");
        //     return
        // }

        // dispatch(lockTopic(response.topic.isLocked))
    } catch (error) {
        console.error(error)
    }
}

export async function topicThread({ topicData }: topicProps) {
    const { title } = topicData

    try {
        const topic = await fetch('http://localhost:4000/topics/topicContent', {
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


