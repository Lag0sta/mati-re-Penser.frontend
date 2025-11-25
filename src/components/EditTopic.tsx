import { useAppSelector } from "../store/hooks.js"
import { useState, useEffect } from 'react';
import { useAppDispatch } from "../store/hooks.js"
import TextEditor from "./TextEditor.js";
import { editTopicInfo } from '../store/reducers/topic.js';

import { editTopic, } from "../utils/topicActions.js"

interface topicProps {
    setMainComponent: (value: string) => any
    setModalComponent: (value: string) => any
    modalComponent: string
    setIsEditModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
    setIsMessageModalOpen: (value: boolean) => any

}
function EditTopic({ modalComponent, setModalComponent, setErrorMessage, setIsEditModalOpen, setSuccessMessage, setIsMessageModalOpen }: topicProps) {
    const topic: any = useAppSelector((state) => state.topic.value);
    const originalValue = topic?.description
    const [rQValue, setRQValue] = useState<string>(topic?.description ?? "");
    const [isButtonLocked, setIsButtonLocked] = useState<boolean>(true);

    console.log("rQValueEditTOPIC", rQValue, "originalValue", originalValue);
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.authToken.value);
    console.log("topic in TOPIC", topic);

    const id = topic.id
    console.log("Topic id :", id);

    const [title, setTitle] = useState<string>(topic.title);
    const originalTitle = topic.title
    console.log("Topic title :", title, "orignalTitle", originalTitle);

    function normalize(str = "") {
        return str.replace(/<[^>]+>/g, "").trim();
    }

    useEffect(() => {
        if (title !== originalTitle ||
            normalize(rQValue) !== normalize(originalValue)) {
            console.log("goal! w2")
            setIsButtonLocked(false)
        } else {
            console.log("no goal")
            setIsButtonLocked(true)
        }
    }, [rQValue, title]);

    const handleEditTopic = async () => {
        ("click TOPICEDIT")
        const description = rQValue
        const topicData = { token, id, title, description };

        try {
            const editTopicResponse = await editTopic({ topicData });

            if (!editTopicResponse.result) {
                setErrorMessage(editTopicResponse.error);
                setIsMessageModalOpen(true);
                return;
            } else {
                dispatch(editTopicInfo(editTopicResponse.topic))
                setSuccessMessage(editTopicResponse.success);
                setIsMessageModalOpen(true);
                setIsEditModalOpen(false);
                setModalComponent("");
            }
        } catch (error) {
            setErrorMessage(error as string);
            setIsMessageModalOpen(true);
            return
        }
    }

    const handleCloseModal = () => {
        setModalComponent('');
        setIsEditModalOpen(false);
    }

    return (
        <div className="h-[500px] w-full bg-gray-800 flex flex-col justify-center items-center">
            <div className="w-full flex justify-end" onClick={handleCloseModal}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#9ca3af"
                    className="size-10 mr-4 mt-2 hover:fill-gray-300 hover:cursor-pointer "
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            <h3 className="text-3xl mb-1 text-gray-200">
                EDIT TOPIC
            </h3>

            <fieldset className="flex flex-col justify-between items-center overflow-y-auto w-full max-w-3xl p-4">

                <legend className="text-lg text-center text-gray-300 font-medium mb-2">
                    Modifiez le Sujet
                </legend>
                <div className="flex flex-col w-full">
                    <label className="text-base text-gray-400 mt-2 mb-1"
                        htmlFor="subject">
                        Sujet :
                    </label>
                    <input className="border-2 border-none bg-gray-400 rounded-md pl-2"
                        id="subject"
                        type="text"
                        placeholder="sujet"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-base text-gray-400 mt-2 mb-1">
                        Descriptif :
                    </span>
                    <TextEditor rQValue={rQValue}
                        setRQValue={setRQValue}
                        mode="editTopic"
                     />

                    {/* <textarea className="w-full h-32 border-2 border-black rounded-md px-3"
                        id="description"
                        placeholder="descriptif"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    /> */}
                </div>
            </fieldset>
            <div className="flex flex-col justify-center items-center mt-4">
                {isButtonLocked ? (
                    <button className="w-fit bg-gray-900 border-2 border-gray-900 text-gray-400 rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer opacity-50 cursor-not-allowed opacity-50 cursor-not-allowed" disabled>
                        Modifier
                    </button>
                ) : (
                    <button
                        className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer "
                        onClick={handleEditTopic}
                    >
                        Modifier
                    </button>)}


            </div>

        </div>
    )
}

export default EditTopic