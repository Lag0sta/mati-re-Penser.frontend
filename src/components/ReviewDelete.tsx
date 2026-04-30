import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
import { useAppDispatch } from "../store/hooks.js"

import { deleteComment, getTopic } from '../store/reducers/topic.js';
import { deleteReview } from "../store/reducers/reviews.js";

import { deleteReviewRequest } from "../utils/reviewActions.js"
import { reviewsRequest

 } from "../utils/reviewActions.js";
import { modalProps, msgProps, screenActionProps } from "../types/Props.js";
import { getReview } from "../store/reducers/reviews.js";

interface props {
    modalProps: modalProps
    msgProps: msgProps
    setAuthType: (value: string) => any
}

function ReviewDelete({ modalProps, msgProps, setAuthType }: props) {
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.authToken.value);
    const user = useAppSelector((state) => state.user.value);
    const [password, setPassword] = useState('');

    const reviewID: any = useAppSelector((state) => state.reviewID.value);
    const review = useAppSelector((state) => state.review.value);
console.log("reviewNew", review)
    const handleDeleteReview = async () => {
        const deleteRData = { token, pseudo: user.pseudo, password: password, id: reviewID.id }
        console.log("deleteCData", deleteRData)
        const msg = [];
        try {
            const deleteReviewResponse = await deleteReviewRequest(deleteRData)

            if (!deleteReviewResponse.result) {
                const errors = JSON.parse(deleteReviewResponse.error);

                for (const err of errors) {
                    msg.push(err.message)
                }
                msgProps.setErrorMessage(msg.join(", "));
                modalProps.setIsMessageModalOpen(true)
            } else {
                console.log("reviewID", reviewID)
                dispatch(deleteReview( reviewID.id ))
                setAuthType('');
                msgProps.setSuccessMessage(deleteReviewResponse.message);
                modalProps.setIsMessageModalOpen(true);
                modalProps.setIsModalOpen(false);
                modalProps.setModalComponent('');

            }
        } catch (error) {
            
            msgProps.setErrorMessage(error as string);
            modalProps.setIsMessageModalOpen(true);
        }
    }

    const handleCloseModal = () => {
        modalProps.setModalComponent('');
        modalProps.setIsModalOpen(false);
    }

    return (
        <div className="h-full w-full bg-gray-800 flex flex-col justify-center items-center">
            <div className="w-full flex justify-end" onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9ca3af" className="size-10 mr-4 mt-2 hover:fill-gray-300 hover:cursor-pointer ">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </div>

            <h3 className="text-3xl mb-1 text-gray-200">
                DELETE REVIEW
            </h3>

            <fieldset className="flex flex justify-evenly  items-center">
                <legend className="p-2 text-lg text-center text-gray-300 font-medium mb-2">
                    écrivez votre mot de passe
                </legend>
                <label className="flex flex-col items-center gap-1 text-gray-300 hover:cursor-pointer hover:text-white">
                    <input className="w-fit my-2 p-2 border border-white rounded-lg"
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </label>

            </fieldset >

            <div className="flex flex-col justify-center items-center">
                {password ? (
                    <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer "
                        onClick={handleDeleteReview}>
                        Confirmer
                    </button>
                ) : (
                    <button className="w-fit bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer opacity-50 cursor-not-allowed"
                    >
                        Confirmer
                    </button>
                )}

            </div>
        </div >
    )
}

export default ReviewDelete