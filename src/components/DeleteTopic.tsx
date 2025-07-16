import * as parse from 'html-react-parser';
import { useAppSelector } from "../store/hooks.js"
import { useState } from 'react';
import { useAppDispatch } from "../store/hooks.js"

import { deleteTopic, editTopic,} from "../utils/topicActions.js"

interface deleteTopicProps {
    setIsModalOpen : (value: boolean) => void
    setModalComponent : (value: string) => void
    setErrorMessage : (value : string) => void
    setSuccessMessage : (value : string) => void
}
function DeleteTopic({setIsModalOpen, setModalComponent, setErrorMessage, setSuccessMessage}: deleteTopicProps) {
    
    const [confirmation, setConfirmation] = useState('')
    const handleClose = () => {
        if (confirmation === "je confirme la suppréssion") {
            deleteTopic({id, setSuccessMessage, setErrorMessage, setModalComponent, setIsModalOpen, dispatch})
            setIsModalOpen(false)
            setModalComponent("")
        } else {
            setErrorMessage("confirmation incorrecte")
        }
    }

    return (
        <div className="h-full w-full bg-white flex flex-col justify-center items-center px-2">
            <h3 className="text-3xl mb-1">
                    DELETE TOPIC
            </h3>
            <span className='text-center text-sm'>
                pour confirmer la suppréssion, tapez "je confirme la suppréssion"
            </span>
           <input className="w-64 border-2 border-black rounded-md pl-2 my-1" 
                  type="text" 
                  placeholder="écrire ici" 
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}/>
           <button className="bg-black border-2 border-black text-white rounded-md px-2 py-1 mt-2 mb-6 hover:bg-white hover:text-black hover:cursor-pointer"
                   onClick={handleAuth}>Supprimer</button>   
        </div>
    )
}

export default DeleteTopic