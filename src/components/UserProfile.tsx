import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
interface userProfilProps {
    setIsModalOpen: (value: boolean) => any
    setModalComponent: (value: string) => any
}

function UserProfile({ setIsModalOpen, setModalComponent }: userProfilProps) {
    const user = useAppSelector(state => state.user.value)
    const topic = useAppSelector(state=>state.topic.value)
    const [email, setEmail] = useState(user.email)
    const [pseudo, setPseudo] = useState(user.pseudo)

    const handleAvatar = () => {
        setIsModalOpen(true);
        setModalComponent("avatarGallery");
    }

    const handleChangePassword = () => {
        setIsModalOpen(true);
        setModalComponent("changePassword");
    }
    return (

        <div className="h-full w-full  flex flex-col items-center mt-24 mb-6">
            <div className="flex justify-center items-center mt-4 mb-4 pb-3 w-[75%] bg-gray-800 rounded-md">
                <h3 className=" mx-2 my-1 text-4xl text-center text-gray-300">Welcome {user.pseudo}</h3>
            </div>
            <div className="w-[75%] flex flex justify-evenly items-center px-3 py-1 bg-gray-800 rounded-md my-1">
                <div className="m-4 flex flex-col justify-center items-center">
                    <div className="w-18 h-18 rounded-full bg-gray-100">
                        <img className="w-18 h-18 object-contain  rounded-full border-2 border-gray-100" src={user.avatar} alt="couverture du livre Nature Du Réel Réel de la Nature" />
                    </div>
                    <button className="m-1 px-2 py-1 bg-gray-800 text-white border border-gray-200 rounded-md hover:bg-gray-200 hover:text-gray-800 cursor-pointer"
                        onClick={handleAvatar}>Change Avatar
                    </button>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col my-2">
                        <span className="font-semibold text-gray-300">Pseudo : </span>
                        <input className="bg-gray-300 rounded-xs px-1 font-semibold text-gray-800" type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                    </div>
                    <div className="flex flex-col my-2">
                        <span className="font-bold text-gray-400">Email : </span>
                        <input className="bg-gray-300 rounded-xs px-1 font-semibold text-gray-800" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <button className="m-1 px-2 py-1 bg-gray-800 text-gray-200 border border-gray-200  rounded-md hover:bg-gray-200 hover:text-gray-800 cursor-pointer"
                        onClick={handleChangePassword}>Changer le mot de passe
                    </button>
                </div>
            </div>
            <div>
                <div className="flex flex-col my-2">
                    <span className="font-semibold text-gray-300">Topics : <span></span></span>
                    <input className="bg-gray-300 rounded-xs px-1 font-semibold text-gray-800" type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default UserProfile