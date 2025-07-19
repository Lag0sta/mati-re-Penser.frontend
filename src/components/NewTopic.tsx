import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
import { useAppDispatch } from "../store/hooks.js"

import { get } from '../store/reducers/topic.js';
import { newTopic } from "../utils/topicActions.js"
import { formatDateToBelgium } from "../utils/formatDateActions.js";



interface topicProps {
    setMainComponent: (value: string) => any
    setModalComponent: (value: string) => any
    modalComponent: string
    setIsModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
    setIsMessageModalOpen: (value: boolean) => any
}
function NewTopic({ setMainComponent, modalComponent, setModalComponent, setErrorMessage, setSuccessMessage, setIsModalOpen, setIsMessageModalOpen }: topicProps) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const dispatch = useAppDispatch();
    const topic: any = useAppSelector((state) => state.topic.value);
    const token = useAppSelector((state) => state.authToken.value);
    console.log("topic in TOPIC", topic);

    //formatage Date à h-Belge
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

    const handleNewTopic = async () => {
        setErrorMessage('');
        setSuccessMessage('');
        const topicData = { token, title, description };

        try {
            const newTopicResponse = await newTopic({ topicData });

            if (!newTopicResponse.result) {
                setErrorMessage(newTopicResponse.error);
                setIsMessageModalOpen(true);
                return;
                
            } else {
                setMainComponent('topicThread')
                setSuccessMessage(newTopicResponse.success);
                setIsMessageModalOpen
                dispatch(get(topic))
            }
        }catch(error){
            setErrorMessage(error as string);
            setIsMessageModalOpen(true);
            return
        }
    }

    const handleCloseModal = () => {
        setModalComponent('');
        setIsModalOpen(false);
    }

    return (
        <div className="h-full w-full bg-white flex flex-col justify-center items-center">
            <div className="w-full flex justify-end" onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 mr-4 mt-2 hover:fill-gray-400 hover:cursor-pointer ">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </div>
            <h3 className="text-3xl mb-1">
                NEW TOPIC
            </h3>

            <fieldset className="flex flex-col justify-between items-center">
                <legend className="text-lg text-center text-gray-600 font-medium mb-2">
                    Postez un Sujet
                </legend>
                <div className="flex flex-col">
                    <label className="text-base mt-2 -mb-1"
                        htmlFor="email"
                    >
                        Sujet :
                    </label>
                    <input className="border-2 border-black rounded-md pl-2"
                        id="subject"
                        type="text"
                        placeholder="sujet"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-base mt-2 -mb-1"
                        htmlFor="description"
                    >
                        Descriptif :
                    </label>
                    <textarea className="w-full h-32 border-2 border-black rounded-md px-3"
                        id="email"
                        placeholder="descriptif"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </fieldset>

            <div className="flex flex-col justify-center items-center">
                <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer "
                    onClick={handleNewTopic}>
                    Poster le Sujet
                </button>
            </div>
        </div>
    )
}

export default NewTopic