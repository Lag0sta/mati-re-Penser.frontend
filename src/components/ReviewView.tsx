import { useAppSelector } from "../store/hooks.js"

import { formatDateToBelgium } from '../utils/formatDateActions.js';
import { modalProps } from "../types/Props.js";
// const Comments = React.lazy(() => import('./Comments.js'));

interface props {
    modalProps: modalProps
    setBook: (value: string) => any
}

function ReviewView({ modalProps, setBook }: props) {

    const reviews = useAppSelector((state) => state.review.value);
    console.log("review", reviews)
    const publications = useAppSelector((state) => state.publication.value);
    const publication = publications.find((e) => e.isArchived === false);
    let pID: string;

    if (publication) pID = publication._id

    const handleClickNewReview = () => {
        setBook(pID)
        modalProps.setIsModalOpen(true);
        modalProps.setModalComponent("addReview")
    }

    return (
        <div className=" flex flex-col justify-center items-center">
             <span className="w-fit px-2 py-1 bg-black text-white border-2 border-black rounded-md hover:bg-gray-200 hover:border-gray-200  hover:text-black cursor-pointer"
                aria-label="Boutton pour laisser un avis sur le livre"
                onClick={handleClickNewReview}>
                Ajouter un Avis
            </span>
            <div className='min-h-100'>
                {reviews.map((e: any, index: number) => (
                    <div key={index} className='bg-gray-400  rounded-sm my-2'>
                        <div className='px-1 py-1 border-b-2 border-gray-100 flex flex-col justify-between item-center '>

                            <div className='flex justify-between'>
                                <span className='font-bold text-gray-500 text-sm'>{e.name}</span>

                                <span className='pt-1 text-xs font-semibold text-gray-300 items-center justify-center'>{formatDateToBelgium(e.creationDate)}</span>
                            </div>
                        </div>
                        <div className='flex flex-col px-2 pb-2 pt-1'>
                            <div className='flex justify-between'>
                                <span className='text-sm font-semibold text-gray-100'>{e.title}</span>
                                <div className='flex justify-end'>
                                    {[...Array(5)].map((_, index) => (
                                        <svg className="w-4 h-4  "
                                            fill={(e.rating > 0 && index >= e.rating) ?
                                                "#1F2937" : "#FFD700"
                                            }
                                            key={index + 1}
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                            <path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <span className='text-xs font-semibold text-gray-200 p-2'>{e.text}</span>
                        </div>
                    </div>
                ))}
            </div>           
        </div>

    )
}

export default ReviewView