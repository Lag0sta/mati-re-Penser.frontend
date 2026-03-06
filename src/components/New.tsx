import DOMPurify from 'dompurify';
import React from "react"
import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';

import NewAdminView from "./NewAdminView.js";


const Comments = React.lazy(() => import('./Comments.js'));

interface newProps {
    setIsModalOpen: (value: boolean) => any
    setIsAddComment: (value: boolean) => any
    setModalComponent: (value: string) => any
    setIsTextModalOpen: (value: boolean) => any
}
function New({ setIsModalOpen, setIsTextModalOpen, setIsAddComment, setModalComponent }: newProps) {
    const [isAdminView, setIsAdminView] = useState(false);
    const user = useAppSelector(state => state.user.value)

    const publications = useAppSelector((state) => state.publication.value);
    console.log("THeOneAndOnlypublications", publications)
    console.log("publicationLenght", publications.length)

    console.log("user", user)
    const handleClickAddComment = () => {
        setIsModalOpen(true);
        setModalComponent("addReview")
        setIsAddComment(true);
    }

    const handleAdminView = () => {
        setIsAdminView(!isAdminView);
    }

    return (
        <div className=" w-full  flex flex-col items-center mt-24 mb-6">
            {user.isAdmin &&
                <div className="w-[78%] flex flex-col justify-start item-center" >
                    <div className="flex justify-end item-end">
                        <button className="px-2 bg-red-600  rounded-t-md text-xs text-white hover:bg-red-100 hover:text-red-600"
                            onClick={handleAdminView}>
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
                </div>
            }
            {isAdminView &&
                <div>
                    <NewAdminView setIsTextModalOpen={setIsTextModalOpen} setIsAddComment={setIsAddComment} setModalComponent={setModalComponent} />
                </div>
            }
            {!isAdminView &&
                <div className="w-[78%]">
                    <div className="flex w-full justify-between ">
                        <div className="mr-4">
                            <img className="object-contain  rounded-md" src="../assets/img/natureDuRéelRéelDeLaNature.avif" alt="couverture du livre Nature Du Réel Réel de la Nature" />
                        </div>
                        <div className=" flex flex-col bg-white rounded-md h-[50%] w-[90%] ml-4 p-10">
                            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(publications[0]?.text || "") }} />
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
                            href={publications[0].lien}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit px-2 py-1  bg-black text-white border-2 border-black rounded-md hover:bg-gray-200 hover:border-gray-200 hover:text-black cursor-pointer"
                        >
                            Acheter
                        </a>
                    </div>

                </div>
            }
            



        </div>
    )
}

export default New