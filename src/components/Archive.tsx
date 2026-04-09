import { useAppSelector } from "../store/hooks.js"

function Archive() {
    const publications = useAppSelector((state) => state.publication.value);
console.log("archivedpublications", publications)
    const archived = publications.filter((e) => e.isArchived === true);
console.log("archived", archived)
    return (
        <div className="h-full w-full bg-white flex justify-center items-center mt-24 ">
            {archived.map((e: any, index: number) => 
            <div key={index} className="flex flex-col justify-evenly w-[10%]">
                <img className="my-1 object-contain rounded-md border-2 border-gray-100" src={e.img} alt="couverture du livre Nature Du Réel Réel de la Nature" />
                <span className=" px-4 py-2 bg-gray-200 rounded-md text-xs">{e.titre}</span>
            </div>
            )}
        </div>
    )
}

export default Archive