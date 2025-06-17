interface signUpProps {
    setIsModalOpen: (value: boolean) => any
}


function SignUp({ setIsModalOpen }: signUpProps) {
    return (
        <div className="h-full w-full bg-white flex flex-col justify-center items-center">
            <div className="w-full flex justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-4 mt-2 cursor-pointer hover:fill-gray-400">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>

            </div>
            <h3 className="text-3xl my-4">
                SignUp
            </h3>
            <div className="flex flex-col">
                <input className="border-2 border-black rounded-md pl-2 my-1" type="text" placeholder="nom d'utilisateur" />
                <input className="border-2 border-black rounded-md pl-2 my-1" type="text" placeholder="@mail" />
                <input className="border-2 border-black rounded-md pl-2 my-1" type="text" placeholder="Confirmation de l'@mail" />
                <input className="border-2 border-black rounded-md pl-2 my-1" type="password" placeholder="mot-de-passe"
                 />
                 <input className="border-2 border-black rounded-md pl-2 my-1" type="password" placeholder="Confirmation du mot-de-passe"/>
            </div>
            
            <button onClick={() => setIsModalOpen(false)}>
                CLOSE
            </button>
        </div>
    )
}
export default SignUp