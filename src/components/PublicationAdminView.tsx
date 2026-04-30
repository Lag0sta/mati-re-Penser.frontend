import DOMPurify from 'dompurify';
import { useState } from "react"
import { useAppSelector } from "../store/hooks.js"
import { modalProps } from "../types/Props.js";
import ReviewView from "./ReviewView.js";

interface props {
    modalProps: modalProps
    setPublicationID: (value: string) => any
    setAuthType: (value: string) => any
    setBook: (value: string) => any
    isAdminView: boolean
    setMarketURL: (value: string) => any
}
function PublicationAdminView({ modalProps, setPublicationID, setAuthType, setBook, isAdminView, setMarketURL }: props) {
    const publications = useAppSelector((state) => state.publication.value);
    const publication = publications.find((e) => e.isArchived === false);

    const [showReviews, setShowReviews] = useState(false);


    const user = useAppSelector(state => state.user.value)

    const handleNewBook = () => {
        modalProps.setIsTextModalOpen(true);
        modalProps.setModalComponent("newPublication");
    }

    const handleEditPublicationTxt = () => {
        if (publication) {
            setPublicationID(publication._id)
            modalProps.setIsTextModalOpen(true);
            modalProps.setModalComponent("editPublicationtxt");
        }
    }

    const handleEditPublicationImg = () => {
        if (publication) {
            setPublicationID(publication._id)
            modalProps.setIsTextModalOpen(true);
            modalProps.setModalComponent("editPublicationImg");
        }
    }

    const handleArchive = () => {
        modalProps.setModalComponent("archiveStatus")
        modalProps.setIsModalOpen(true)
        setAuthType("archiveStatus")
    }

    const handleClickReview = async () => {
        setShowReviews(!showReviews);
    }

    function raccourcirUrl(url: any) {
        return url.length > 27 ? url.slice(0, 27) + "..." : url;
    }

    function handleClickEditURL() {
        modalProps.setModalComponent("editMarketURL")
        modalProps.setIsModalOpen(true)
        setMarketURL(publication?.lien ?? "")
        
    }

    return (
        <div className=" w-full  flex flex-col items-center mb-6">
            {!user.isAdmin &&
                <div className="w-[78%] flex justify-center items-center mb-4  bg-white rounded-md">
                    <h2 className=" mx-2 my-1  text-3xl text-center">À LA UNE</h2>
                </div>
            }
            <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1 hover:bg-red-400 hover:text-white"
                onClick={handleArchive}>ARCHIVER</span>
            <div className="w-[78%]">
                <div className="flex w-full justify-between ">
                    <div className="mr-4">
                        <div className="flex justify-center">
                            {publication && publication.img ? (
                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1 hover:bg-red-400 hover:text-white"
                                    onClick={handleEditPublicationImg}>Editer l'Image</span>
                            ) : (
                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1 hover:bg-red-400 hover:text-white">Ajouter une Image</span>
                            )}
                        </div>
                        {publication ? (
                            <img className="object-contain  rounded-md border border-3 border-red-600 " src={publication.img} alt="couverture du livre Nature Du Réel Réel de la Nature" />
                        ) : (
                            <input type="file" className="w-fit my-2 p-2 border border-white rounded-lg hover:bg-red-400 hover:text-white" accept="image/*" />
                        )}

                    </div>
                    <div className=" flex flex-col  h-[50%] w-[90%] ml-4 ">
                        <div className="flex justify-center ">
                            {publication && publication.text ? (

                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1 hover:bg-red-400 hover:text-white"
                                    onClick={handleEditPublicationTxt}>
                                    Editer Text
                                </span>
                            ) : (
                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1" onClick={handleNewBook}>
                                    New Book
                                </span>
                            )}

                        </div>

                        <div className="min-h-119 max-h-119 bg-white rounded-md border border-3 border-red-600 p-4 overflow-auto">
                            {(publication && !showReviews) ? (
                                <span className="ml-1 my-1 text-sm font-semibold text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(publication.text) }}
                                />
                            ) : (
                                <ReviewView modalProps={modalProps}
                                    setBook={setBook}
                                    isAdminView={isAdminView} />
                            )}
                        </div>
                        <div className='h-[10%]  mt-3  rounded-md flex justify-between items-center'>
                            <div className="w-fit flex  justify-center items-center  ">

                                {!showReviews ? (

                                    <span className="font-bold mr-2 border-3 border-red-600 rounded-md text-xs text-red-600  p-2  cursor-pointer hover:bg-red-400 hover:text-white"
                                        aria-label="Gérer les avis sur le livre"
                                        onClick={handleClickReview}>
                                        Editer les avis
                                    </span>
                                ) : (
                                    <span className="font-bold mr-2 border-3 border-red-600 rounded-md text-xs text-red-600  p-2  cursor-pointer hover:bg-red-400 hover:text-white"
                                        aria-label="Revenir sur le descriptif du Livre"
                                        onClick={handleClickReview}>
                                        Revenir sur le descriptif
                                    </span>
                                )}
                            </div>

                            <div className="w-fit flex flex justify-center items-center   px-3">
                                <span className='font-bold mr-2 border-3 border-red-600 rounded-md text-xs text-red-600  p-2  cursor-pointer hover:bg-red-400 hover:text-white'
                                    onClick={handleClickEditURL}>Modifier l'URL d'achat : </span>
                                <span className='font-semibold pointer-events-none text-xs text-gray-600'>{raccourcirUrl(publication?.lien)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PublicationAdminView