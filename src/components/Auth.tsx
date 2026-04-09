import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
import { useAppDispatch } from "../store/hooks.js"
import { authRequest } from '../utils/authActions.js';
import { editTopicRequest, lockTopicRequest } from "../utils/topicActions.js"
import { deleteCommentRequest } from "../utils/threadActions.js"

import { lockTopic, deleteComment } from "../store/reducers/topic.js";

import { modalProps, msgProps } from "../types/Props.js";
interface props {
    modalProps: modalProps
    msgProps: msgProps
    authType: string
    setResponse: (value: boolean) => void
}
function Auth({ modalProps, msgProps, authType, setResponse }: props) {

    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.authToken.value)
    const topic = useAppSelector(state => state.topic.value)

    const isLocked = useAppSelector((state) => state.topic.value.isLocked);

    const handleAuth = async () => {

        const id = topic.id
        const authData = { token, password }
        const lockTData = { id, token, isLocked }
        msgProps.setSuccessMessage('');
        msgProps.setErrorMessage('');
        modalProps.setIsMessageModalOpen(false);

        try {
            const authResponse = await authRequest( authData )

            if (authResponse.result) {
                setPassword('')
                msgProps.setSuccessMessage(authResponse.message)
                modalProps.setIsMessageModalOpen(true);

                if (authType === "lockTopic") {
                    setPassword('')

                    const lockResponse = await lockTopicRequest(lockTData)

                    if (lockResponse) {
                        dispatch(lockTopic(lockResponse.isLocked))
                    }
                    return
                }

                if (authType === "editTopic") return
                
                if (authType === "deleteComment") {
                    modalProps.setModalComponent("deleteComment")
                    return
                }

                if(authType === "archiveStatus"){
                    setResponse(authResponse.result)
                    modalProps.setModalComponent("archiveStatus")
        
                    return
                }
            } else {
                msgProps.setErrorMessage(authResponse.message)
                modalProps.setIsMessageModalOpen(true);

            }
        } catch (error) {
            msgProps.setErrorMessage(error as string);
            modalProps.setIsMessageModalOpen(true);
        }

    }

    const handleCloseModal = () => {
        modalProps.setModalComponent('');
        modalProps.setIsModalOpen(false);
    }

    return (
        <div className="h-full w-full bg-white flex flex-col justify-center items-center">
            <div className="w-full flex justify-end" onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9ca3af" className="size-10 mr-4 mt-2 hover:fill-gray-300 hover:cursor-pointer ">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </div>
            <h3 className="text-3xl mb-1">
                AUTHENTIFICATION
            </h3>
            <input className="w-64 border-2 border-black rounded-md pl-2 my-1"
                type="password"
                placeholder="mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer"
                onClick={handleAuth}>Valider</button>
        </div>
    )
}

export default Auth