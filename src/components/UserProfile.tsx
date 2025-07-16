import { useAppSelector } from "../store/hooks.js"
interface userProfilProps {
    setIsModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
}

function UserProfile({ setIsModalOpen, setModalComponent }: userProfilProps) {
    const user = useAppSelector(state => state.user.value)
    const handleAvatar = () => {
        setIsModalOpen(true);
        setModalComponent("avatarGallery");
    }

    return (

        <div className="h-full w-full  flex flex-col items-center mt-24 mb-6">
            <div className="flex justify-center items-center mt-4 mb-4 w-[75%] bg-white rounded-md">
                <h2 className=" mx-2 my-1 text-3xl text-center">Welcom {user.pseudo}</h2>
            </div>
            <div className="w-[75%] flex flex-col justify-center items-center px-3 py-1 bg-white rounded-md my-1">
                <div className="m-4 flex flex-col justify-center items-center">
                    <div className="w-18 h-18 rounded-full ">
                        <img className="w-18 h-18 object-contain  rounded-full border-2 border-black" src={user.avatar} alt="couverture du livre Nature Du Réel Réel de la Nature" />
                    </div>
                    <button className="m-1 px-2 py-1 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black cursor-pointer"
                        onClick={handleAvatar}>Change Avatar
                    </button>
                </div>
                <div>
                    
                </div>

            </div>
        </div>
    )
}

export default UserProfile