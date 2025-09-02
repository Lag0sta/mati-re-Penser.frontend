import { changeAvatar } from "../utils/profilActions.js"
import { useAppSelector, useAppDispatch } from "../store/hooks.js"

import { update } from "../store/reducers/user.js";

import { setStyle } from "framer-motion"
interface avatarGalleryProps {
    setIsModalOpen: (value: boolean) => any
    setIsMessageModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
    setErrorMessage: (value: string) => any
    setSuccessMessage: (value: string) => any
}

function AvatarGallery({ setIsModalOpen, setIsMessageModalOpen, setSuccessMessage, setErrorMessage, setModalComponent }: avatarGalleryProps) {
    const token = useAppSelector((state) => state.authToken.value);
    const dispatch = useAppDispatch();

    //variables pour l'API dicebear
    const style = ["identicon"]
    const seed = ["kimberly", "adrian", "ryan", "sarah", "amaya", "jude", "riley", "jade", "george", "jessica", "liam", "brooklyn", "jameson", "katherine", "sawyer", "andrea", "aidan", "luis", "christopher", "liliana"]

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalComponent("");
    }

    const handleChangeAvatar = async (style: string, seed: string) => {
        const profilData = { token, style, seed }

        try {
            const avatarChangeResponse = await changeAvatar({ profilData })

            if (avatarChangeResponse.result) {
                dispatch(update(avatarChangeResponse));

                setIsModalOpen(false);
                setModalComponent("");
                setSuccessMessage(avatarChangeResponse.message);
                setIsMessageModalOpen(true);
            } else {
                setErrorMessage(avatarChangeResponse.message);
                setIsMessageModalOpen(true);

            }

        } catch (error) {
            setErrorMessage(error as string);
            setIsMessageModalOpen(true);
        }
    }

    return (
        <div className=" bg-white flex flex-col justify-center items-center mt-24  ">
            <div className="w-full flex justify-end" onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 mr-4 mt-2 hover:fill-gray-400 hover:cursor-pointer ">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="overflow-y-auto max-h-[500px]">
                {style.map((style, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div className="flex flex-wrap justify-center m-2 ">
                            {seed.map((seed, index) => (
                                <div key={index} className="flex justify-center items-center h-fit w-fit m-1"
                                    onClick={() => handleChangeAvatar(style, seed)}>

                                    <img src={`https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`} alt="avatar"
                                        className="h-[5rem] w-[5rem] rounded-full border-2 border-black"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>

    )
}

export default AvatarGallery