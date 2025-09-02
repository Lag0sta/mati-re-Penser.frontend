import { useState } from "react"
import { signUp } from "../utils/authActions.js"

interface signUpProps {
    setIsModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setIsMessageModalOpen: (value: boolean) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
}

function SignUp({ setIsModalOpen, setModalComponent, setIsMessageModalOpen, setErrorMessage, setSuccessMessage }: signUpProps) {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [pseudo, setPseudo] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [hp, setHp] = useState("")

    const handleReturn = () => {
        setModalComponent("signIn");
        setErrorMessage("")
    }

    const handleSignUp = async () => {
        const authData = { name, surname, pseudo, email, password, confirmPassword, hp }

        try {
            //réinitialisation des messages
            setErrorMessage("")
            setSuccessMessage("")

            const signUpResponse = await signUp({ authData })

            if (signUpResponse.result) {
                setName("");
                setSurname("");
                setPseudo("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setSuccessMessage(signUpResponse.success);
                setIsMessageModalOpen(true);
            } else {
                setErrorMessage(signUpResponse.error);
                setIsMessageModalOpen(true)
            }
        } catch (error) {
            setErrorMessage(error as string)
            setIsMessageModalOpen(true)
        }

    }

    return (
        <div className="h-full w-full bg-white flex flex-col justify-center items-center">
            <div className="w-full flex justify-end "
                onClick={handleReturn}
            >
                <svg className="size-8  mt-3 mr-2 p-1 bg-black border-2 border-black stroke-white rounded-full hover:bg-white hover:stroke-black  hover:cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                >
                    <path strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
            </div>
            <h3 className="text-4xl font-bold mt-2 mb-1">
                SIGN UP
            </h3>
            <fieldset className="flex flex-col justify-between items-center">
                <legend className="text-lg text-center text-gray-600 font-medium mb-2">Créer votre compte</legend>
                <div className="flex flex-col">
                    <div className="-mb-1">
                        <span className="text-red-500 mr-1 font-light">*</span>
                        <label className="text-base mt-2"
                            htmlFor="name"
                        >
                            Prénom :
                        </label>
                    </div>
                    <input className="border-2 border-black rounded-md pl-2"
                        type="text"
                        id="name"
                        required
                        placeholder="prénom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="-mb-1">
                        <span className="text-red-500 mr-1 font-medium">*</span>
                        <label className="text-base mt-2"
                            htmlFor="surname"
                        >
                            Nom :
                        </label>
                    </div>
                    <input className="border-2 border-black rounded-md pl-2"
                        type="text"
                        id="surname"
                        required
                        placeholder="nom"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="-mb-1">
                        <span className="text-red-500 mr-1 font-medium">*</span>
                        <label className="text-base mt-2"
                            htmlFor="pseudo"
                        >
                            Pseudo :
                        </label>
                    </div>

                    <input className="border-2 border-black rounded-md pl-2"
                        type="text"
                        id="pseudo"
                        required
                        placeholder="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="-mb-1">
                        <span className="text-red-500 mr-1 font-medium">*</span>
                        <label className="text-base mt-2"
                            htmlFor="email"
                        >
                            e-mail :
                        </label>
                    </div>
                    <input className="border-2 border-black rounded-md pl-2"
                        type="email"
                        id="email"
                        required
                        placeholder="@mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="-mb-1">
                        <span className="text-red-500 mr-1 font-medium">*</span>
                        <label className="text-base mt-2"
                            htmlFor="password"
                        >
                            Mot-de-Passe :
                        </label>
                    </div>
                    <input className="border-2 border-black rounded-md pl-2"
                        type="password"
                        id="password"
                        required
                        placeholder="mot-de-passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input className="border-2 border-black rounded-md pl-2 mt-1"
                        type="password"
                        id="confirmPassword"
                        required
                        placeholder="Confirmation du m.d.p."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <input
                    type="text"
                    id="hp"
                    name="hp"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        left: "-9999px",
                        opacity: 0,
                    }}
                />
                <button className="w-fit bg-black border-2 border-black text-white hover:bg-white hover:text-black rounded-md px-2 py-1 my-6"
                    onClick={handleSignUp}
                >
                    Créer un Compte
                </button>
            </fieldset>

        </div>
    )
}
export default SignUp