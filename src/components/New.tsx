import React from "react"
import { useAppSelector } from "../store/hooks.js"

const Comments = React.lazy(() => import('./Comments.js'));

interface newProps {
    setIsModalOpen: (value: boolean) => any
    setIsAddComment: (value: boolean) => any
    setModalComponent: (value: string) => any
}
function New({ setIsModalOpen, setIsAddComment, setModalComponent }: newProps) {
    const user = useAppSelector(state => state.user.value)
    console.log("user", user)
    const handleClickAddComment = () => {
        setIsModalOpen(true);
        setModalComponent("addReview")
        setIsAddComment(true);
    }

    return (
        <div className=" w-full  flex flex-col items-center mt-24 mb-6">
            {user.isAdmin &&
                <div className="w-[78%] flex flex-col justify-start item-center" >
                    <div className="flex justify-end item-end">
                        <button className="px-2 bg-red-600  rounded-t-md text-xs text-white hover:bg-red-100 hover:text-red-600">
                            Admin View
                        </button>
                    </div>

                    <div className="flex justify-center items-center mb-4  bg-white rounded-b-md rounded-tl-md">
                        <h2 className=" mx-2 my-1  text-3xl text-center">À LA UNE</h2>
                    </div>
                </div>
            }
            {!user.isAdmin &&
                <div className="w-[78%] flex justify-center items-center mb-4  bg-white rounded-md">
                    <h2 className=" mx-2 my-1  text-3xl text-center">À LA UNE</h2>
                </div>}
            <div className="w-[78%]">
                <div className="flex w-full justify-between ">
                    <div className="mr-4">
                        <img className="object-contain  rounded-md" src="../assets/img/natureDuRéelRéelDeLaNature.avif" alt="couverture du livre Nature Du Réel Réel de la Nature" />
                    </div>
                    <div className=" flex flex-col bg-white rounded-md h-[50%] w-[90%] ml-4 p-4">
                        <h3 className=" text-center mb-4  text-xl font-bold">Nature Du Réel Réel de la Nature</h3>
                        <div className=" flex flex-col pr-10 mx-4">
                            <span className="font-bold">
                                Pourquoi Lire ce Livre ?
                            </span>
                            <span className="">"Nature du réel, réel de la nature" est une introduction accessible à l'épistémologie de la science physique. Ce livre explore les fondements de la connaissance scientifique et les questions philosophiques qui en découlent. Destiné aux étudiants en philosophie sans bagage scientifique, il offre une perspective unique sur la manière dont nous comprenons et interprétons le monde physique.</span>
                            <div className="flex justify-end item-end my-1">
                                <span className="font-bold mr-1">.</span>
                                <span><span className="font-bold mr-1">Accessibilité : </span>Écrit dans un langage clair et compréhensible, ce livre rend les concepts complexes de l'épistémologie accessibles à tous.</span>
                            </div>
                            <div className="flex justify-end item-end my-1">
                                <span className="font-bold mr-1">.</span>
                                <span className=""><span className="font-bold">Interdisciplinarité :</span> Il combine la rigueur scientifique avec la profondeur philosophique, offrant une vision complète et nuancée.</span>
                            </div>
                            <div className="flex justify-end item-end my-1">
                                <span className="font-bold mr-1">.</span>
                                <span className=""><span className="font-bold">Réflexion Philosophique :</span> Idéal pour ceux qui souhaitent approfondir leur compréhension des sciences à travers le prisme de la philosophie.</span>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="flex flex-col justify-center items-center my-2">
                    {/* <Comments /> */}
                    <button className="w-fit px-2 py-1 mb-2 bg-black text-white border-2 border-black rounded-md hover:bg-gray-200 hover:border-gray-200  hover:text-black cursor-pointer"
                        aria-label="Boutton pour laisser un avis sur le livre"
                        onClick={handleClickAddComment}>
                        Laisser un Avis
                    </button>
                    <a
                        href="https://www.amazon.fr/dp/2383660558?ref=cm_sw_r_ffobk_cp_ud_dp_F9VDD9QFDXNT19DBEEXT&ref_=cm_sw_r_ffobk_cp_ud_dp_F9VDD9QFDXNT19DBEEXT&social_share=cm_sw_r_ffobk_cp_ud_dp_F9VDD9QFDXNT19DBEEXT&bestFormat=true&previewDoh=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit px-2 py-1  bg-black text-white border-2 border-black rounded-md hover:bg-gray-200 hover:border-gray-200 hover:text-black cursor-pointer"
                    >
                        Acheter
                    </a>
                </div>
            </div>



        </div>
    )
}

export default New