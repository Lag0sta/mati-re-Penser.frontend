import React from "react"
import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';

import TextEditor from "./TextEditor.js";

import { saveBookInfo } from "../utils/newActions.js"
const Comments = React.lazy(() => import('./Comments.js'));

interface newProps {
    setIsTextModalOpen: (value: boolean) => any
    setIsAddComment: (value: boolean) => any
    setModalComponent: (value: string) => any
    setPublicationID: (value: string) => any
}
function NewAdminView({ setIsTextModalOpen, setIsAddComment, setModalComponent, setPublicationID }: newProps) {
    const [rQValue, setRQValue] = useState<string>("");
    const [titre, setTitre] = useState<string>("");
    const publication = useAppSelector(state => state.publication.value[0])
    const user = useAppSelector(state => state.user.value)
    console.log("user", user)

    const handleNewBook = () => {
        setIsTextModalOpen(true);
        setModalComponent("newPublication");
    }

    const handleEditPublication = () => {
        setPublicationID(publication._id)
        setIsTextModalOpen(true);
        setModalComponent("editPublication");
    }
    
    const handleSave = async () => {
        const text = rQValue
        const propData = { titre, text }
        try {
            const response = await saveBookInfo({ propData })
            setModalComponent("addReview")
            setIsAddComment(true);

        } catch (error) {
            console.log("error", error)
        }

    }

    return (
        <div className=" w-full  flex flex-col items-center mb-6">

            <input type="file" className="w-fit my-2 p-2 border border-white rounded-lg " accept="image/*" />

            {!user.isAdmin &&
                <div className="w-[78%] flex justify-center items-center mb-4  bg-white rounded-md">
                    <h2 className=" mx-2 my-1  text-3xl text-center">À LA UNE</h2>
                </div>
            }
            <span>ARCHIVER</span>
            <div className="w-[78%]">
                <div className="flex w-full justify-between ">
                    <div className="mr-4">
                        <div className="flex justify-center">
                            <span className="font-bold">Editer Image</span>
                            <span className="font-bold">Nouvelle Image</span>
                        </div>
                        <img className="object-contain  rounded-md border border-3 border-red-600 " src="../assets/img/natureDuRéelRéelDeLaNature.avif" alt="couverture du livre Nature Du Réel Réel de la Nature" />
                    </div>
                    <div className=" flex flex-col  h-[50%] w-[90%] ml-4 ">
                        <div className="flex justify-center">
                            <span className="font-bold border border-2 border-red-600 rounded-md p-1" onClick={handleNewBook}>New Book</span>
                            <span className="font-bold"
                            onClick={handleEditPublication}>Editer Text</span>
                        </div>


                        <div className="bg-white rounded-md border border-3 border-red-600 ">
                            
                            <span onClick={handleSave}>SAVE</span>

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

                </div>
                <div className="flex flex-col justify-center items-center my-2">
                    <a
                        href="https://www.amazon.fr/dp/2383660558?ref=cm_sw_r_ffobk_cp_ud_dp_F9VDD9QFDXNT19DBEEXT&ref_=cm_sw_r_ffobk_cp_ud_dp_F9VDD9QFDXNT19DBEEXT&social_share=cm_sw_r_ffobk_cp_ud_dp_F9VDD9QFDXNT19DBEEXT&bestFormat=true&previewDoh=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit px-2 py-1  bg-black text-white border-2 border-red-600 rounded-md hover:bg-red-200 hover:border-red-200 hover:text-black cursor-pointer"
                    >
                        Acheter
                    </a>
                </div>

            </div>




        </div>
    )
}

export default NewAdminView