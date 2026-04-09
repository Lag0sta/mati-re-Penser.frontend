import DOMPurify from 'dompurify';
import { useState } from "react"
import { useAppSelector,  } from "../store/hooks.js"

import PublicationAdminView from "./PublicationAdminView.js";
import ReviewView from './ReviewView.js';
import { modalProps } from "../types/Props.js";
interface props {
    modalProps: modalProps
    setPublicationID: (value: string) => any
    setAuthType: (value: string) => any
    setBook: (value: string) => any
}
function PublicationLatest({ modalProps, setPublicationID, setAuthType, setBook }: props) {
    const [isAdminView, setIsAdminView] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const user = useAppSelector(state => state.user.value)
    let rating: number = 0

    const reviews = useAppSelector((state) => state.review.value);

    if (reviews.length > 0) {
        for (const review of reviews) {
            rating += review.rating / reviews.length
        }
    }

    const publications = useAppSelector((state) => state.publication.value);
    const publication = publications.find((e) => e.isArchived === false);

    const handleClickReview = async () => {
        setShowReviews(!showReviews);
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
                    <PublicationAdminView modalProps={modalProps}
                        setPublicationID={setPublicationID}
                        setAuthType={setAuthType}/>
                </div>
            }
            {(!isAdminView && publication) &&
                <div className="w-[78%]">
                    <div className="flex w-full justify-between ">

                        <div className="mr-4">
                            <img className="object-contain  rounded-md" src={publication.img} alt="couverture du livre Nature Du Réel Réel de la Nature" />
                        </div>

                        <div className=" flex flex-col justify-between h-[50%] w-[90%]">

                            <div className=" bg-white rounded-md min-h-119 max-h-119 ml-4 p-9 overflow-auto">
                                {!showReviews ? (
                                    <span className="text-md" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(publication.text || "") }} />
                                ) : (
                                    <ReviewView modalProps={modalProps} 
                                                setBook={setBook} />
                                )}
                            </div>
                            <div className='h-[10%]  mt-2 ml-4 p-2 rounded-md flex justify-evenly items-center bg-white'>
                                <div>
                                    <div className="flex justify-end gap-1">
                                        {[...Array(5)].map((_, index) => (
                                        <svg className="w-4 h-4  "
                                            fill={(rating > 0 && index >= rating) ?
                                                "#1F2937" : "#FFD700"
                                            }
                                            key={index + 1}
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                            <path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
                                        </svg>
                                    ))}
                                    </div>
                                </div>
                                {!showReviews ? (
                                    <span className="w-fit px-2 py-1  bg-black text-white border-2 border-black rounded-md hover:bg-gray-200 hover:border-gray-200  hover:text-black cursor-pointer"
                                        aria-label="Boutton pour laisser un avis sur le livre"
                                        onClick={handleClickReview}>
                                        Avis
                                    </span>
                                ) : (
                                    <span className="w-fit px-2 py-1  bg-black text-white border-2 border-black rounded-md hover:bg-gray-200 hover:border-gray-200  hover:text-black cursor-pointer"
                                        aria-label="Boutton pour laisser un avis sur le livre"
                                        onClick={handleClickReview}>
                                        Descriptif
                                    </span>
                                )}

                                <a
                                    href={publication.lien}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-fit px-2 py-1  bg-black text-white border-2 border-black rounded-md hover:bg-gray-200 hover:border-gray-200 hover:text-black cursor-pointer"
                                >
                                    Acheter
                                </a>
                            </div>

                        </div>

                    </div>
                    <div className="flex flex-col justify-center items-center my-2">

                    </div>
                </div>
            }
        </div>
    )
}

export default PublicationLatest