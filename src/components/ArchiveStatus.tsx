import { useAppSelector } from "../store/hooks.js"
import { useAppDispatch } from "../store/hooks.js"
import { archiveStatusRequest } from "../utils/bookActions.js"
import { updateArchiveStatus } from "../store/reducers/publications.js";
import { addLatestReview } from "../store/reducers/latestReviews.js";
import { unArchive } from "../store/reducers/archReviews.js";

import { modalProps, msgProps, screenActionProps, adminProps } from "../types/Props.js";
interface props {
    msgProps: msgProps
    modalProps: modalProps
    screenActionProps: screenActionProps
    adminProps: adminProps
}
function ArchiveStatus({ msgProps, modalProps, screenActionProps, adminProps }: props) {
    const token = useAppSelector((state) => state.authToken.value);
    const user = useAppSelector((state) => state.user.value);
    const publication = useAppSelector((state) => state.publication.value);
    const reviews = useAppSelector((state) => state.archReviews.value);

    const dispatch = useAppDispatch();

    const handleArchive = async () => {
        const msg = [];
        const aSData = { id: publication._id, pseudo: user.pseudo, token, isArchived: publication.isArchived }
        try {
            const archiveResponse = await archiveStatusRequest(aSData)

            if (!archiveResponse.result) {
                // signInResponse.error n'est pas juste un string et à besoin d'être JSON.parse
                const errors = JSON.parse(archiveResponse.error);

                for (const err of errors) {
                    msg.push(err.message)
                }

                msgProps.setErrorMessage(msg.join(", "));
                modalProps.setIsMessageModalOpen(true);
                return;

            } else {
                console.log("archiveResponse", archiveResponse)
                console.log("dispatch _id:", archiveResponse.editedBook._id, "isArchived:", archiveResponse.editedBook.isArchived)
                dispatch(updateArchiveStatus({ _id: archiveResponse.editedBook._id, isArchived: archiveResponse.editedBook.isArchived }));
                dispatch(addLatestReview(reviews))
                dispatch(unArchive())
                msgProps.setSuccessMessage(archiveResponse.message);
                modalProps.setIsMessageModalOpen(true);
                modalProps.setIsModalOpen(false);
                modalProps.setModalComponent("");
                adminProps.setIsAdminView(false);
                screenActionProps.setMainComponent("publication")

            }

        } catch (error) {
            console.log("error", error)
        }
    }

    const handleCloseModal = () => {
        modalProps.setModalComponent('');
        modalProps.setIsModalOpen(false);
    }

    return (
        <div className="h-fit w-full bg-gray-800 flex flex-col justify-center items-center">

            <h3 className="text-3xl mb-1 text-gray-200">
                Archivage
            </h3>

            <fieldset className="flex flex-col justify-between items-center overflow-y-auto w-full max-w-3xl p-4">

                <div className="flex flex-col w-full">
                    {publication && publication.isArchived ? (<label className="text-base text-gray-400 mt-2 mb-1"
                        htmlFor="subject">
                        Voulez vous archiver la publication ?
                    </label>) : (
                        <label className="text-base text-gray-400 mt-2 mb-1"
                            htmlFor="subject">
                            Voulez vous désarchiver la publication ?
                        </label>
                    )}
                    <div className="flex justify-evenly">
                        <span className="py-1 px-3 border-2 border-gray-400 rounded-md text-gray-400 hover:bg-gray-400 hover:text-gray-200 hover:border-gray-200 cursor-pointer"
                            onClick={handleArchive}>OUI</span>
                        <span className="py-1 px-3 border-2 border-gray-400 rounded-md text-gray-400 hover:bg-gray-400 hover:text-gray-200 hover:border-gray-200 cursor-pointer"
                            onClick={handleCloseModal}>NON</span>
                    </div>
                </div>
            </fieldset>
        </div>
    )
}

export default ArchiveStatus