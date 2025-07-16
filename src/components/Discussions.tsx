import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks.js"

import { handleTopicThread } from "../utils/topicActions.js"

interface discussionProps {
    setMainComponent: (value: string) => any
    setModalComponent: (value: string) => any
    setIsModalOpen: (value: boolean) => any
    setIsMessageModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
}

function Discussions({ setMainComponent, setModalComponent, setIsModalOpen, setIsMessageModalOpen, setErrorMessage }: discussionProps) {
    const [forum, setForum] = useState([])
    const [loading, setLoading] = useState(true)

    const token = useAppSelector((state) => state.authToken.value)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/submits/topicsWithThreadCounts')
                const data = await response.json()
                console.log(data)
                setForum(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    function formatDateToBelgium(dateStr: string | undefined): string {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleString('fr-BE', {
            timeZone: 'Europe/Brussels',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).replace(',', '');
    }

    const createNewTopic = () => {
        if (!token) {
            setIsMessageModalOpen(true);
            setErrorMessage("Veuillez vous connecter");
            return
        }

        setModalComponent('newTopic')
        setIsModalOpen(true)
    }

    const handleTopic = (title: string) => {
        console.log('topic')
        handleTopicThread({ dispatch, title })
        setMainComponent('topicThread')

    }



    return (
        <div className="h-full w-full  flex flex-col items-center mt-24 mb-6">
            <div className="flex justify-center items-center mt-4 mb-4 w-[75%] bg-white rounded-md">
                <h2 className=" mx-2 my-1 text-3xl text-center">DISCUSSIONS</h2>
            </div>
            <div className="w-[75%] flex flex-col justify-center items-center px-3 py-1 bg-white rounded-md my-1">

                <div className="w-full flex justify-between items-center">
                    <button className="ml-4 my-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black rounded-md px-2 py-1"
                        onClick={createNewTopic}>
                        Nouveau Sujet:
                    </button>
                    <button className="mr-4 my-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black rounded-md px-2 py-1">Actualiser</button>
                </div>


            </div>
            <div className="w-[75%] flex flex-col justify-center items-center px-3 py-3 bg-black rounded-md my-1">
                <div className="w-full grid grid-cols-3 gap-2 bg-gray-600 rounded-t-sm py-1 px-2 font-bold text-xl">
                    <span className="text-white text-left">Sujet :</span>
                    <span className="text-white text-center">N° de messages :</span>
                    <span className="text-white text-right">Dernière modification :</span>
                </div>
                {forum && forum.map((item: any, index: number) => (
                    <div key={index} className="w-full grid grid-cols-3 gap-2 bg-white  text-black py-1 px-2 border-b border-gray-300">
                        <span className="font-bold text-blue-500 cursor-pointer text-left"
                            onClick={() => handleTopic(item.title)}>
                            {item.title}
                        </span>
                        <span className="text-center font-bold">{item.threadCount}</span>
                        <span className="text-right font-bold text-gray-500">{item.lastModified ? formatDateToBelgium(item.lastModified) : formatDateToBelgium(item.creationDate)}</span>
                    </div>
                ))}
           
        </div>

        </div >
    )

    // )
}

export default Discussions