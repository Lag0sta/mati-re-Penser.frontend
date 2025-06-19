interface signUpProps {
    setIsModalOpen: (value: boolean) => any
    setIsSignUp: (value: boolean) => any
    setIsSignIn: (value: boolean) => any
}




function SignUp({ setIsModalOpen, setIsSignUp, setIsSignIn }: signUpProps) {

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setIsSignUp(false)
    }

    return (
        <div className="h-full w-full bg-white flex flex-col justify-center items-center">
            <div className="w-full flex justify-end" onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 mr-4 mt-2 p-1 bg-black border-2 border-black stroke-white rounded-full hover:bg-white hover:stroke-black  hover:cursor-pointer    ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

            </div>

            <h3 className="text-3xl my-4">
                SignUp
            </h3>
            <div className="flex flex-col justify-evenly items-center">
                <input className="border-2 border-black rounded-md pl-2 my-1" type="text" placeholder="nom d'utilisateur" />
                <input className="border-2 border-black rounded-md pl-2 my-1" type="text" placeholder="@mail" />
                <input className="border-2 border-black rounded-md pl-2 my-1" type="text" placeholder="Confirmation de l'@mail" />
                <input className="border-2 border-black rounded-md pl-2 my-1" type="password" placeholder="mot-de-passe"
                />
                <input className="border-2 border-black rounded-md pl-2 my-1" type="password" placeholder="Confirmation du mot-de-passe" />
                <button className="w-fit bg-black border-2 border-black text-white hover:bg-white hover:text-black rounded-md px-2 py-1 mt-2 mb-6"
                        // onClick={handleIsSignUp}
                >
                    Créer un Compte
                </button>
            </div>

        </div>
    )
}
export default SignUp