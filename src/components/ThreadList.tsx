import { useAppSelector } from "../store/hooks.js"
import { AnimatePresence} from "framer-motion";

import ThreadCard from "./ThreadCard.js";


interface threadListProps {
    setIsModalOpen: (value: boolean) => any
    setIsMessageModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setErrorMessage: (value: string) => any
    setIsNewComment: (value: boolean) => any
}

function ThreadList({ setIsModalOpen, setIsMessageModalOpen, setModalComponent, setErrorMessage, setIsNewComment }: threadListProps) {

    const topic: any = useAppSelector((state) => state.topic.value);

    return (
            <AnimatePresence initial={false}>
                {topic.topicThread.map((thread: any, index: number) => (
                    <ThreadCard setIsModalOpen={setIsModalOpen} 
                                setModalComponent={setModalComponent} 
                                setIsMessageModalOpen={setIsMessageModalOpen} 
                                setErrorMessage={setErrorMessage}
                                setIsNewComment={setIsNewComment} 
                                thread={thread} 
                                index={index}/>
                ))}
            </AnimatePresence>
    )
}

export default ThreadList