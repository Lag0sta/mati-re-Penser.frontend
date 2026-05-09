import DOMPurify from 'dompurify';
import { useState } from "react"
import { useAppSelector } from "../store/hooks.js"
import { modalProps, adminProps } from "../types/Props.js";
import ReviewView from "./ReviewView.js";

interface props {
    modalProps: modalProps
    adminProps: adminProps
    setPublicationID: (value: string) => any
    setAuthType: (value: string) => any
    setBook: (value: string) => any
    setMarketURL: (value: string) => any
}
function PublicationAdminView({ modalProps, adminProps, setPublicationID, setAuthType, setBook, setMarketURL }: props) {
    const publications = useAppSelector((state) => state.publications.value);
    const publication = publications.find((e) => e.isArchived === false);

    const [showReviews, setShowReviews] = useState(false);

    const reviews = useAppSelector(state => state.latestReviews.value)
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
        <div className=" w-full  flex flex-col items-center mb-6 ">
            {!user.isAdmin &&
                <div className="w-[78%] flex justify-center items-center mb-4  bg-white rounded-md">
                    <h2 className=" mx-2 my-1  text-3xl text-center">À LA UNE</h2>
                </div>
            }

            <div className="w-[78%]">
                <div className="flex  justify-between ">

                    <div className="">

                        <div className="flex justify-between">

                            {publication && 
                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1 hover:bg-red-400 hover:text-white"
                                    onClick={handleEditPublicationImg}>Editer l'Image</span>
                            }
                            {publication &&
                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1 hover:bg-red-400 hover:text-white"
                                    onClick={handleArchive}>
                                    ARCHIVER
                                </span>
                            }

                        </div>
                        {publication ? (
                            <img className="object-contain  rounded-md border border-3 border-red-600 " src={publication.img} alt="couverture du livre Nature Du Réel Réel de la Nature" />
                        ) : (
                             <img className="object-contain  rounded-md border border-3 border-red-600 " src="../public/assets/img/mAP_Logo.png" />
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
                                <span className="w-[13rem] font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1" onClick={handleNewBook}>
                                    Nouvelle Publication
                                </span>
                            )}

                        </div>
                        {publication &&
                            <div className="min-h-119 max-h-119 bg-white rounded-md border border-3 border-red-600 p-4 overflow-auto">
                                {(publication && !showReviews) &&
                                    <span className="ml-1 my-1 text-sm font-semibold text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(publication.text) }}
                                    />
                                }
                                {(publication && showReviews) &&
                                    <ReviewView modalProps={modalProps}
                                        setBook={setBook}
                                        adminProps={adminProps} />
                                }


                            </div>
                        }

                        <div className='h-[10%]  mt-3  rounded-md flex justify-between items-center'>
                            <div className="w-fit flex  justify-center items-center  ">

                                {(publication && !showReviews && reviews.length !== 0) && (
                                    <span
                                        className="font-bold mr-2 border-3 border-red-600 rounded-md text-xs text-red-600 p-2 cursor-pointer hover:bg-red-400 hover:text-white"
                                        aria-label="Gérer les avis sur le livre"
                                        onClick={handleClickReview}
                                    >
                                        Editer les avis
                                    </span>
                                )}

                                {(publication && showReviews) &&
                                    <span
                                        className="font-bold mr-2 border-3 border-red-600 rounded-md text-xs text-red-600 p-2 cursor-pointer hover:bg-red-400 hover:text-white"
                                        aria-label="Revenir sur le descriptif du Livre"
                                        onClick={handleClickReview}
                                    >
                                        Revenir sur le descriptif
                                    </span>
                                }
                            </div>
                            {publication &&
                                <div className="w-fit flex flex justify-center items-center   px-3">

                                    <span className='font-bold mr-2 border-3 border-red-600 rounded-md text-xs text-red-600  p-2  cursor-pointer hover:bg-red-400 hover:text-white'
                                        onClick={handleClickEditURL}>Modifier l'URL d'achat : </span>
                                    <span className='font-semibold pointer-events-none text-xs text-gray-600'>  {publication?.lien ? raccourcirUrl(publication.lien) : ""}
                                    </span>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PublicationAdminView