function Discussions() {
    return (
        <div className=" w-[75%]  ">
            <div className="w-full flex flex-col justify-center items-center">
                <h3>FORUM</h3>
                <div className="w-full flex flex-col justify-center items-center px-3 py-1 bg-white rounded-md">
                    <div className="">
                        <span className="mr-2">Nouveau Sujet de conversation :</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>

                    <div className="w-full my-2">
                        <span>Sujet</span>
                        <span>Nombre de Messages</span>
                        <span>Dernière modification</span>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Discussions