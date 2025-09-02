import { useState } from "react"
import { useAppDispatch } from '../store/hooks.js'

import { save } from '../store/reducers/auth.js'
import { login } from '../store/reducers/user.js'

import { signIn } from "../utils/authActions.js"

interface signInProps {
    setModalComponent: (value: string) => any
    setIsModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
    setIsMessageModalOpen: (value: boolean) => any
}

function SignIn({ setIsModalOpen, setModalComponent, setIsMessageModalOpen, setErrorMessage, setSuccessMessage }: signInProps) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch();

    const handleSignIn = async () => {
        const authData = { email, password }

        try {
            //réinitialisation des messages
            setErrorMessage("")
            setSuccessMessage("")

            const signInResponse = await signIn({ authData })

            if (signInResponse.result) {
                setEmail("");
                setPassword("");

                dispatch(save(signInResponse.accessToken));
                dispatch(login(signInResponse));

                setSuccessMessage(signInResponse.message);
                setIsMessageModalOpen(true);
            } else {
                setErrorMessage(signInResponse.message);
                setIsMessageModalOpen(true);
            }
        } catch (error) {
            setErrorMessage(error as string);
            setIsMessageModalOpen(true);
            return
        }
    }

    const handleIsSignUp = () => {
        setModalComponent("signUp");
    }

    const handleCloseModal = () => {
        setModalComponent("");
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
                SIGN IN
            </h3>
            <fieldset className="flex flex-col justify-between items-center">
                <legend className="text-lg text-center text-gray-600 font-medium mb-2">
                    Connectez-vous
                </legend>
                <div className="flex flex-col">
                    <label className="text-base mt-2 -mb-1"
                        htmlFor="email"
                    >
                        e-mail :
                    </label>
                    <input className="border-2 border-black rounded-md pl-2"
                        id="email"
                        type="text"
                        placeholder="e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-base mt-2 -mb-1"
                        htmlFor="password"
                    >
                        mot-de-passe :
                    </label>
                    <input className="border-2 border-black rounded-md pl-2"
                        id="password"
                        type="password"
                        placeholder="mot-de-passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className="text-sm text-center text-blue-600">Mot de passe oublié?</p>
                <button className="w-fit bg-black border-2 rounded-md px-2 py-1 mt-3 mb-6 border-black text-white hover:bg-white hover:text-black hover:cursor-pointer " onClick={handleSignIn}>
                    Se Connecter
                </button>
            </fieldset>
            <div className="flex flex-col justify-center items-center">
                <p className="text-basic text-center text-gray-600">
                    Pas encore de compte?
                </p>
                <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer "
                    onClick={handleIsSignUp}>
                    Créer un Compte
                </button>
            </div>
        </div>
    )
}

export default SignIn