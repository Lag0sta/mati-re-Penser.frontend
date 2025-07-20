import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
import { useAppDispatch } from "../store/hooks.js"
import { auth } from '../utils/authActions.js';
import { editTopic, lockTopic } from "../utils/topicActions.js"

import { lock } from "../store/reducers/topic.js";

interface authProps {
    setIsModalOpen: (value: boolean) => void,
    setModalComponent: (value: string) => void
    setErrorMessage: (value: string) => void
    setSuccessMessage: (value: string) => void
    setIsMessageModalOpen: (value: boolean) => void
    authType: string
}
function Auth({ setIsModalOpen, setModalComponent, setErrorMessage, setSuccessMessage, setIsMessageModalOpen, authType }: authProps) {

    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.authToken.value)
    const topic = useAppSelector(state => state.topic.value)

    const isLocked = useAppSelector((state) => state.topic.value.isLocked);


    console.log("topic lock", topic)

    const handleAuth = async () => {

        const id = topic.id
        const authData = { token, password }
        const topicData = { id, token, isLocked }

        try {

            const authResponse = await auth({ authData })
            console.log("authResponse", authResponse)

            if (authResponse.result) {
                if (authType === "lockTopic") {
                    setPassword('')
                    setSuccessMessage(authResponse.success)
                    setIsMessageModalOpen(true);

                    const lockResponse = await lockTopic({topicData})

                    if (lockResponse){
                        console.log("lockResponse", lockResponse.isLocked)
                        dispatch(lock(lockResponse.isLocked))
                    }
                }
            } else {
                setErrorMessage(authResponse.error)
                setIsMessageModalOpen(true);

            }
        } catch (error) {
            setErrorMessage(error as string);
            setIsMessageModalOpen(true);
        }

    }

    return (
        <div className="h-full w-full bg-white flex flex-col justify-center items-center">
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