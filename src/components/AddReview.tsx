import { useState } from "react"

import { newReview } from "../utils/reviewActions.js"
import { text } from "stream/consumers"

interface AddReviewsProps {
    setIsModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setIsMessageModalOpen: (value: boolean) => any
    setMessageModal: (value: string) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
}

function AddReview({ setIsModalOpen, setModalComponent, setIsMessageModalOpen, setMessageModal, setErrorMessage, setSuccessMessage }: AddReviewsProps) {
    const [name, setName] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [review, setReview] = useState<string>('')
    const [rating, setRating] = useState<number>(0)
    const [ratingHover, setRatingHover] = useState<number>(0)

    const handleCloseModal = () => {
        setName('')
        setTitle('')
        setReview('')
        setRating(0)
        setIsModalOpen(false)
        setModalComponent('')
    }

    const handleReview = async () => {
        const text = review
        const reviewData = { name, title, text, rating }

        try {
            const addReviewResponse = await newReview({ reviewData })
            console.log("addReviewResponse", addReviewResponse)

            if (!addReviewResponse.result) {
                console.log("addReviewResponse.message", addReviewResponse)
                setErrorMessage(addReviewResponse.message)
                setIsMessageModalOpen(true)
                return
            }

            setSuccessMessage(addReviewResponse.message)
            setIsMessageModalOpen(true)
            setName('')
            setTitle('')
            setReview('')
            setRating(0)
            setIsModalOpen(false)
            setModalComponent('')
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div className="h-full w-full bg-white flex flex-col justify-center items-center">
            <div className="w-full flex justify-end text-gray-800" onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 mr-4 mt-2 hover:fill-gray-400 hover:cursor-pointer ">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </div>
            <h3 className="text-center text-3xl mb-4 text-gray-800">Ajouter un Avis</h3>
            <div className="flex">
                {[...Array(5)].map((_, index) => (
                    <svg className="w-6 h-6"
                        fill={ratingHover > 0 ?
                            ratingHover > index ?
                                "#FFD700" : "#1F2937"
                            : rating > index ?
                                "#FFD700" : "#1F2937"}
                        key={index + 1}
                        onMouseEnter={() => setRatingHover(index + 1)}
                        onMouseLeave={() => setRatingHover(0)}
                        onClick={() => setRating(index + 1)}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
                    </svg>
                ))}
            </div>
            <input className="w-64 border-2 text-gray-800 border-gray-800 rounded-md pl-2 my-1" type="text" placeholder="nom" value={name} onChange={(e) => setName(e.target.value)}/>
            <input className="w-64 border-2 text-gray-800 border-gray-800 rounded-md pl-2 my-1" type="text" placeholder="titre" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea className="min-h-[100px]  w-64 border-2 text-gray-800 border-gray-800 rounded-md pl-2 my-1" placeholder="écrivez votre commentaire ici" value={review} onChange={(e) => setReview(e.target.value)}/>

            <button className="bg-gray-800 border-2 border-gray-800 text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer"
                onClick={handleReview}>Envoyer</button>
        </div>
    )
}

export default AddReview