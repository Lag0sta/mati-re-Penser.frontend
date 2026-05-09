import { useAppSelector, useAppDispatch } from "../store/hooks.js"

import { screenActionProps } from "../types/Props.js";
import { getLatestReview } from "../store/reducers/latestReviews.js";
import { reviewsRequest } from "../utils/reviewActions.js";
import { loadPublication } from "../store/reducers/publication.js";

interface props {
    screenActionProps: screenActionProps
}
function Publications({ screenActionProps }: props) {
    const publications = useAppSelector((state) => state.publications.value);
    const archived = publications.filter((e) => e.isArchived === true);

    const dispatch = useAppDispatch();


    const handlePublication = async (e: any) => {
        console.log("handlePublication", e)
        screenActionProps.setMainComponent("Archive")
        const publicationInfo = { _id: e._id, titre: e.titre, text: e.text, img: e.img, lien: e.lien, creationDate: e.creationDate, isArchived: e.isArchived }

        dispatch(loadPublication(publicationInfo))
        try {
            console.log("e._id", e)
            const id = e._id
            const reviewsResponse = await reviewsRequest({id})
            dispatch(getLatestReview(reviewsResponse.reviews))
        } catch {

        }

    }

    return (
        <div className="h-full w-full bg-white flex justify-center items-center mt-24 ">
            {archived.map((e: any, index: number) =>
                <div key={index} className=" w-[10%] hover:bg-gray-100 hover:rounded-md cursor-pointer">
                    <div className="p-2 flex flex-col justify-evenly"
                        onClick={() => handlePublication(e)}>
                        <img className="my-1 object-contain rounded-md border-2 border-gray-100" src={e.img} alt="couverture du livre Nature Du Réel Réel de la Nature" />
                        <span className=" px-4 py-2 bg-gray-200 rounded-md text-xs text-center">{e.titre}</span>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Publications