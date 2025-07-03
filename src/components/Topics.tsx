import { useAppSelector } from "../store/hooks.js"

interface topicProps {
    setMainComponent: (value: string) => any
}
function Topics({ setMainComponent }: topicProps) {

    const topic: any = useAppSelector((state) => state.topic.value);

    function formatDateToBelgium(dateStr: string | undefined): string {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleString('fr-BE', {
            timeZone: 'Europe/Brussels',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).replace(',', '');
    }

    console.log("topic", topic);
    return (
        <div className="h-full w-full flex flex-col items-center mt-24 mb-6">
            <div className="w-[55%] flex flex-col justify-center items-center px-3 py-3 bg-black  rounded-md mb-2">
                <div className="w-full py-1 px-3 flex flex-col bg-white rounded-md">
                    <div className="w-full flex  justify-between ">
                        <div className="w-[40%] flex">
                            <img className="object-contain mt-2 mr-2 w-14 h-14 bg-gray-white rounded-full border-2 border-black" src={topic.createdBy.avatar} alt="Avatar de l'utilisateur aillant créé le topic" />
                            <div className="flex flex-col ">
                                <span className="text-black font-bold">{topic.createdBy.pseudo}</span>
                                <span className="text-gray-600 text-sm">title</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                </svg>
                            </div>
                        </div>
                        <div className=" h-full w-full ">
                            <div className="w-full flex justify-end items-center ">
                                <span className="font-bold text-xs text-gray-500 mr-2">Créé le :</span>
                                <span className="text-blue-500 text-sm font-bold">{formatDateToBelgium(topic.creationDate)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-1 flex flex-col justify-between border-t-2 border-gray-300 ">
                        <div className="w-full h-fit flex flex-col ml-2 ">
                            <span className="ml-1 mt-1 text-3xl font-bold text-black">{topic.title}</span>
                            <span className="ml-1 text-sm text-black mb-2">{topic.description}</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-[55%] ">
                <div className="w-fit bg-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 hover:cursor-pointer">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                    </svg>
                </div>

            </div>


            {topic.topicThread.map((thread: any, index: number) => (
                <div key={index} className="w-[55%] py-1 px-3 flex flex-col bg-white rounded-md my-1">
                    <div className="w-full flex  justify-between ">
                        <div className="w-[40%] flex">
                            <img className="object-contain mt-2 mr-2 w-14 h-14 bg-white rounded-full border-2 border-black" src={thread.createdBy.avatar} alt="Avatar de l'utilisateur aillant créé le topic" />
                            <div className="flex flex-col ">
                                <span className="text-black font-bold">{thread.createdBy.pseudo}</span>
                                <span className="text-black text-sm">title</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                </svg>
                            </div>
                        </div>
                        <div className=" h-full w-full ">
                            <div className="w-full flex justify-end items-center ">
                                <span className="font-bold text-xs text-gray-600 mr-2">Créé le :</span>
                                <span className="text-blue-500 text-sm font-bold">{formatDateToBelgium(thread.creationDate)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full my-1 flex flex-col justify-between border-t-2 border-gray-300 ">
                        <span className="ml-1 my-1 text-sm text-black">{thread.text}</span>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Topics