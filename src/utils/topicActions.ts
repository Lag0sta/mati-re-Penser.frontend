import { get } from '../store/reducers/topic.js';
interface handleTopicThreadProps {
    dispatch: any
    title: string
}
export async function handleTopicThread({ dispatch, title }: handleTopicThreadProps) {
    try {
        const response = await fetch('http://localhost:4000/submits/topicContent',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( {
                    title: title
                }
            )
            }
        )
        const topic = await response.json()
        console.log(topic)
        dispatch(get(topic))

    } catch (error) {
        console.error(error)
    }

}