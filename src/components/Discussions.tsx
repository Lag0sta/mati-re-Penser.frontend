import { useEffect, useState } from "react"

function Discussions() {
    const [forum, setForum] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/submits/topicsWithThreadCounts')
                const data = await response.json()
                console.log(data)
                setForum(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

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

    return (
        <div className="h-full w-full  flex flex-col items-center mt-24 mb-6">
            <div className="flex justify-center items-center mt-4 mb-4 w-[75%] bg-white rounded-md">
                <h2 className=" mx-2 my-1 text-3xl text-center">DISCUSSIONS</h2>
            </div>
            <div className="w-[75%] flex flex-col justify-center items-center px-3 py-1 bg-white rounded-md my-1">
                <div className="w-full flex justify-between items-center">
                    <button className="ml-4 my-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black rounded-md px-2 py-1">Nouveau Sujet:</button>
                    <button className="mr-4 my-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black rounded-md px-2 py-1">Actualiser</button>
                </div>


            </div>
            <div className="w-[75%] flex flex-col justify-center items-center px-3 py-1 bg-black rounded-md my-1">
                <div className="w-full my-2">
                    <div className="grid-cols-3  grid">
                        <div className="flex flex-col justify-evenly">
                            <div className="bg-gray-600 py-1 rounded-tl-md">
                                <span className=" ml-2  text-white text-xl">
                                    Sujet :
                                </span>
                            </div>

                            {forum && forum.map((item: any, index: number) =>
                            (<div className="bg-white py-1">
                                <span className="ml-2" key={index}>{item.title}</span>
                            </div>))}
                        </div>
                        <div className="flex flex-col justify-evenly">
                            <div className="bg-gray-600 py-1">
                                <span className="text-white text-xl">Nombre de Messages :</span>
                            </div>

                            {forum && forum.map((item: any, index: number) =>
                            (<div className="bg-white py-1">
                                <span key={index}>
                                    {item.threadCount}
                                </span>
                            </div>))}
                        </div>
                        <div className="flex flex-col justify-evenly">
                            <div className="bg-gray-600 py-1 rounded-tr-md">

                                <span className="text-white text-xl">
                                    Dernière modifications :
                                </span>
                            </div>
                            {forum && forum.map((item: any, index: number) =>
                            (<div className="bg-white py-1">
                                <span key={index}>
                                    {item.lastModified ? formatDateToBelgium(item.lastModified) : '—'}
                                </span>
                            </div>))}
                        </div>

                    </div>


                </div>
            </div>

        </div>
    )

    // )
}

export default Discussions