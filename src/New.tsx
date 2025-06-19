import Comments from "./Comments.js"

interface newProps {
    setIsModalOpen: (value: boolean) => any
    setIsAddComment: (value: boolean) => any
}
function New({ setIsModalOpen, setIsAddComment }: newProps) {

    const handleClickAddComment = () => {
        setIsModalOpen(true);
        setIsAddComment(true);
    }
    
    return (
        <div className="h-fit w-full bg-white flex flex-col justify-center items-center">
            <h2 className="my-4 text-3xl">À LA UNE</h2>
            <div className="flex">
                <div className="w-[50%] flex justify-center">
                    <img className="object-contain h-[30rem]" src="../assets/img/natureDuRéelRéelDeLaNature.avif" alt="couverture du livre Nature Du Réel Réel de la Nature" />
                </div>
                <div className="w-[35%] flex flex-col ">
                    <h3 className=" text-center my-4 pr-10 text-xl">Nature Du Réel Réel de la Nature</h3>
                    <div className=" flex flex-col pr-10">
                        <span className="text-center">
                            Pourquoi Lire ce Livre ?
                        </span>
                        <span className="text-center">
                            "Nature du réel, réel de la nature" est une introduction accessible à l'épistémologie de la science physique. Ce livre explore les fondements de la connaissance scientifique et les questions philosophiques qui en découlent. Destiné aux étudiants en philosophie sans bagage scientifique, il offre une perspective unique sur la manière dont nous comprenons et interprétons le monde physique.
                        </span>
                        <span className="text-center">
                            . Accessibilité : Écrit dans un langage clair et compréhensible, ce livre
                            rend les concepts complexes de l'épistémologie accessibles à tous.
                        </span>
                        <span className="text-center">
                            . Interdisciplinarité : Il combine la rigueur scientifique avec la
                            profondeur philosophique, offrant une vision complète et nuancée.
                        </span>
                        <span className="text-center">
                            . Réflexion Philosophique : Idéal pour ceux qui souhaitent approfondir leur compréhension des sciences à travers le prisme de la philosophie.
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center my-2">
                        <Comments />
                        <button className="w-fit px-2 py-1 border-2 border-black rounded-md hover:bg-black hover:text-white"
                            aria-label="Boutton pour laisser un avis sur le livre"
                            onClick={handleClickAddComment}>
                            Laisser un Avis
                        </button>

                        <h3 className="text-center">Acheter</h3>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default New