import { useAppSelector } from "../store/hooks.js"
interface userProfilProps {
    setIsModalOpen: (value: boolean) => any
    setIsAvatarGallery: (value: boolean) => any
}

function UserProfile({setIsModalOpen, setIsAvatarGallery}: userProfilProps) {
    const user = useAppSelector(state => state.user.value)
    const handleAvatar = () => {
        setIsModalOpen(true);
        setIsAvatarGallery(true);
    }

    return (
        <div className="h-fit w-full bg-white flex flex-col justify-center items-center">
            <span>Welcom {user.pseudo}</span>
            <button
               onClick={handleAvatar}>Change Avatar</button>
        </div>
    )
}

export default UserProfile