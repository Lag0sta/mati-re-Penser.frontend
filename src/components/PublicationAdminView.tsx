import DOMPurify from 'dompurify';
import { useAppSelector } from "../store/hooks.js"
import { modalProps } from "../types/Props.js";

interface props {
    modalProps: modalProps
    setPublicationID: (value: string) => any
    setAuthType: (value: string) => any
}
function PublicationAdminView({ modalProps, setPublicationID, setAuthType }: props) {
    const publications = useAppSelector((state) => state.publication.value);
    const publication = publications.find((e) => e.isArchived === false);

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

    return (
        <div className=" w-full  flex flex-col items-center mb-6">
            {!user.isAdmin &&
                <div className="w-[78%] flex justify-center items-center mb-4  bg-white rounded-md">
                    <h2 className=" mx-2 my-1  text-3xl text-center">À LA UNE</h2>
                </div>
            }
            <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1"
                onClick={handleArchive}>ARCHIVER</span>
            <div className="w-[78%]">
                <div className="flex w-full justify-between ">
                    <div className="mr-4">
                        <div className="flex justify-center">
                            {publication && publication.img ? (
                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1"
                                    onClick={handleEditPublicationImg}>Editer l'Image</span>
                            ) : (
                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1">Ajouter une Image</span>
                            )}
                        </div>
                        {publication ? (
                            <img className="object-contain  rounded-md border border-3 border-red-600 " src={publication.img} alt="couverture du livre Nature Du Réel Réel de la Nature" />
                        ) : (
                            <input type="file" className="w-fit my-2 p-2 border border-white rounded-lg " accept="image/*" />
                        )}

                    </div>
                    <div className=" flex flex-col  h-[50%] w-[90%] ml-4 ">
                        <div className="flex justify-center ">
                            {publication && publication.text ? (

                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1"
                                    onClick={handleEditPublicationTxt}>
                                    Editer Text
                                </span>
                            ) : (
                                <span className="font-bold text-xs text-red-700 text-center border border-2 border-red-600 rounded-md p-1 m-1" onClick={handleNewBook}>
                                    New Book
                                </span>
                            )}

                        </div>

                        <div className="bg-white rounded-md border border-3 border-red-600 p-4">

                            {publication &&
                                <span
                                    className="ml-1 my-1 text-sm font-semibold text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(publication.text) }}
                                />}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center my-2">
                    <a  href="https://www.amazon.fr/dp/2383660558?ref=cm_sw_r_ffobk_cp_ud_dp_F9VDD9QFDXNT19DBEEXT&ref_=cm_sw_r_ffobk_cp_ud_dp_F9VDD9QFDXNT19DBEEXT&social_share=cm_sw_r_ffobk_cp_ud_dp_F9VDD9QFDXNT19DBEEXT&bestFormat=true&previewDoh=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit px-2 py-1  bg-black text-white border-2 border-red-600 rounded-md hover:bg-red-200 hover:border-red-200 hover:text-black cursor-pointer"
                    >
                        Acheter
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PublicationAdminView