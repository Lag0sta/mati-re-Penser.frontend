import { useAppSelector } from "../store/hooks.js"
import { useAppDispatch } from "../store/hooks.js"
import { archiveStatusRequest } from "../utils/newActions.js"
import { updateArchiveStatus } from "../store/reducers/publication.js";

interface topicProps {
    setModalComponent: (value: string) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
    setIsMessageModalOpen: (value: boolean) => any
    setAuthType: (value: string) => any
    setIsModalOpen: (value: boolean) => any
    response: boolean
}
function ArchiveStatusPublication({ setModalComponent, setErrorMessage, setSuccessMessage, setIsMessageModalOpen, setAuthType, setIsModalOpen, response }: topicProps) {
    const publication: any = useAppSelector((state) => state.publication.value);
    const token = useAppSelector((state) => state.authToken.value);
    const user = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();
    const isArchived = publication[0]?.isArchived
    const publications = useAppSelector((state) => state.publication.value);
    console.log("publicationsReducer", publications[0].text)

    const handleArchive = async () => {
        const msg = [];
        const aSData = { id: publication._id, pseudo: user.pseudo, token, isArchived: publication.isArchived }
        try {
            console.log("clickx4")
            setModalComponent("auth")
            setIsModalOpen(true)
            setAuthType("archiveStatus")

            if (response) {
                const archiveResponse = await archiveStatusRequest( aSData )

                if (!archiveResponse.result) {
                    // signInResponse.error n'est pas juste un string et à besoin d'être JSON.parse
                    const errors = JSON.parse(archiveResponse.error);

                    for (const err of errors) {
                        console.log(`Erreur sur ${err.path[0]} : ${err.message}`);
                        msg.push(err.message)

                    }
                    setErrorMessage(msg.join(", "));
                    setIsMessageModalOpen(true);
                    return;
                } else {

                    dispatch(updateArchiveStatus(archiveResponse.isArchived))
                    console.log("archiveResponse", archiveResponse)
                    setSuccessMessage(archiveResponse.message);
                    setIsMessageModalOpen(true);
                    setIsModalOpen(false);
                    setModalComponent("");
                }
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    const handleCloseModal = () => {
        setModalComponent('');
        setIsModalOpen(false);
    }

    return (
        <div className="h-fit w-full bg-gray-800 flex flex-col justify-center items-center">

            <h3 className="text-3xl mb-1 text-gray-200">
                Archivage
            </h3>

            <fieldset className="flex flex-col justify-between items-center overflow-y-auto w-full max-w-3xl p-4">

                <div className="flex flex-col w-full">
                    {!isArchived ? (<label className="text-base text-gray-400 mt-2 mb-1"
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

export default ArchiveStatusPublication