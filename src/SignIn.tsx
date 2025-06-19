interface signInProps {
    setIsSignIn: (value: boolean) => any
    setIsSignUp: (value: boolean) => any
    setIsModalOpen: (value: boolean) => any
}

function SignIn({ setIsModalOpen, setIsSignIn, setIsSignUp }: signInProps) {

    const handleIsSignUp = () => {
        setIsSignIn(false)
        setIsSignUp(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setIsSignIn(false)
    }

    return (
        <div className="h-full w-full bg-white flex flex-col justify-center items-center">
            <div className="w-full flex justify-end" onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 mr-4 mt-2 hover:fill-gray-400 hover:cursor-pointer ">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </div>

            <h3 className="text-3xl my-4">
                SignIn
            </h3>
            <div className="flex flex-col justify-evenly items-center">
                <input className="border-2 border-black rounded-md pl-2 my-1" type="text" placeholder="username" />
                <input className="border-2 border-black rounded-md pl-2 my-1" type="password" placeholder="password" />
                <p className="text-sm text-center text-blue-600">Mot de passe oublié?</p>
                <button className="w-fit bg-black border-2 rounded-md px-2 py-1 mt-3 mb-6 border-black text-white hover:bg-white hover:text-black hover:cursor-pointer " onClick={() => setIsModalOpen(false)}>
                Se Connecter
            </button>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3>
                    Pas encore de compte ?
                </h3>
                <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer "
                        onClick={handleIsSignUp}>
                    Créer un Compte
                </button>
            </div>
            
        </div>
    )
}

export default SignIn