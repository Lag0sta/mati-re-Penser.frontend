import { useAppSelector } from "../store/hooks.js"
import { useAppDispatch } from "../store/hooks.js"
import { archiveStatusRequest } from "../utils/newActions.js"
import { updateArchiveStatus } from "../store/reducers/publication.js";

import { modalProps, msgProps } from "../types/Props.js";
interface props {
    msgProps: msgProps
    modalProps: modalProps
}
function PublicationArchiveStatus({ msgProps, modalProps }: props) {
    const token = useAppSelector((state) => state.authToken.value);
    const user = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();
    const publications = useAppSelector((state) => state.publication.value);
    const publication = publications.find((e) => e.isArchived === false);
    let isArchived: boolean;
    let id: string;

    if(publication){
        id = publication._id
        isArchived = publication.isArchived
    }
    const handleArchive = async () => {
        const msg = [];
        const aSData = { id, pseudo: user.pseudo, token, isArchived }
        try {
                const archiveResponse = await archiveStatusRequest( aSData )

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
                    dispatch(updateArchiveStatus(archiveResponse.isArchived))
                    msgProps.setSuccessMessage(archiveResponse.message);
                    modalProps.setIsMessageModalOpen(true);
                    modalProps.setIsModalOpen(false);
                    modalProps.setModalComponent("");
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

export default PublicationArchiveStatus