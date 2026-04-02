import DOMPurify from 'dompurify';
import React from "react"
import { useAppSelector, useAppDispatch } from "../store/hooks.js"
import { useState } from 'react';

import { saveBookInfoRequest } from "../utils/newActions.js"

const Comments = React.lazy(() => import('./Comments.js'));

interface newProps {
    setIsTextModalOpen: (value: boolean) => any
    setIsAddComment: (value: boolean) => any
    setModalComponent: (value: string) => any
    setPublicationID: (value: string) => any
    setAuthType: (value: string) => any
    setIsModalOpen: (value: boolean) => any
    response: boolean
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
    setIsMessageModalOpen: (value: boolean) => any
}
function NewAdminView({ setIsTextModalOpen, setIsAddComment, setModalComponent, setPublicationID, setAuthType, setIsModalOpen, response, setErrorMessage, setSuccessMessage, setIsMessageModalOpen, }: newProps) {
    const [rQValue, setRQValue] = useState<string>("");
    const [titre, setTitre] = useState<string>("");

    const publications = useAppSelector((state) => state.publication.value);
    const publication = publications.find((e) => e.isArchived === false);
    console.log("publication1", publication)
    const user = useAppSelector(state => state.user.value)
    const token = useAppSelector(state => state.authToken.value)
    const dispatch = useAppDispatch();

    console.log("publicationMTFK", publication)


    const handleNewBook = () => {
        setIsTextModalOpen(true);
        setModalComponent("newPublication");
    }

    const handleEditPublicationTxt = () => {
        if (publication) {
            setPublicationID(publication._id)
            setIsTextModalOpen(true);
            setModalComponent("editPublicationtxt");
        }
    }

    const handleEditPublicationImg = () => {
        if (publication) {
            setPublicationID(publication._id)
            setIsTextModalOpen(true);
            setModalComponent("editPublicationImg");
        }
    }

    const handleArchive = () => {

        console.log("clickx4")
        setModalComponent("archiveStatus")
        setIsModalOpen(true)
        setAuthType("archiveStatus")

    }

    // const handleSave = async () => {
    //     const text = rQValue
    //     const propData = { titre, text }
    //     try {
    //         const response = await saveBookInfoRequest({ propData })
    //         setModalComponent("addReview")
    //         setIsAddComment(true);

    //     } catch (error) {
    //         console.log("error", error)
    //     }

    // }

    return (
        <div className=" w-full  flex flex-col items-center mb-6">



            {!user.isAdmin &&
                <div className="w-[78%] flex justify-center items-center mb-4  bg-white rounded-md">
                    <h2 className=" mx-2 my-1  text-3xl text-center">À LA UNE</h2>
                </div>
            }
            <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1"
                onClick={handleArchive}>ARCHIVER</span>
            <div className="w-[78%]">
                <div className="flex w-full justify-between ">
                    <div className="mr-4">
                        <div className="flex justify-center">
                            {publication && publication.img ? (
                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1"
                                    onClick={handleEditPublicationImg}>Editer l'Image</span>
                            ) : (
                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1">Ajouter une Image</span>
                            )}
                        </div>
                        {publication ? (
                            <img className="object-contain  rounded-md border border-3 border-red-600 " src={publication.img} alt="couverture du livre Nature Du Réel Réel de la Nature" />
                        ) : (
                            <input type="file" className="w-fit my-2 p-2 border border-white rounded-lg " accept="image/*" />
                        )}

                    </div>
                    <div className=" flex flex-col  h-[50%] w-[90%] ml-4 ">
                        <div className="flex justify-center ">
                            {publication && publication.text ? (

                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1"
                                    onClick={handleEditPublicationTxt}>
                                    Editer Text
                                </span>
                            ) : (
                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1" onClick={handleNewBook}>
                                    New Book
                                </span>
                            )}

                        </div>

                        <div className="bg-white rounded-md border border-3 border-red-600 p-4">

                            {publication &&
                                <span
                                    className="ml-1 my-1 text-sm font-semibold text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(publication.text) }}
                                />}

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