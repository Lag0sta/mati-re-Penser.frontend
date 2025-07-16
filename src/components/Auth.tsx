import * as parse from 'html-react-parser';
import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
import { useAppDispatch } from "../store/hooks.js"
import { auth } from '../utils/authActions.js';
import { editTopic, lockTopic } from "../utils/topicActions.js"

interface authProps {
    setIsModalOpen: (value: boolean) => void,
    setModalComponent: (value: string) => void
    setErrorMessage: (value: string) => void
    setSuccessMessage: (value: string) => void
    setIsMessageModalOpen: (value: boolean) => void
    setIsLocked: (value: boolean) => void
    isLocked: boolean
    authType: string
}
function Auth({ setIsModalOpen, setModalComponent, setErrorMessage, setSuccessMessage, setIsMessageModalOpen, isLocked, setIsLocked, authType }: authProps) {

    const [password, setPassword] = useState('')
    const token = useAppSelector(state => state.authToken.value)

    const handleAuth = async () => {
        try {
            const authData = { token, password }

            const authResponse = await auth({ authData })

            if (authResponse) {
                if (authType === "lockTopic") {
                    setPassword('')
                    setIsLocked(!isLocked)
                    setSuccessMessage("Auth réussi")
                    setIsMessageModalOpen(true);
                    lockTopic({})
                }
            } else {
                setErrorMessage(authResponse.error);
                setIsMessageModalOpen(true);

            }
        } catch(error) {
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