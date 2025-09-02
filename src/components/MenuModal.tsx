import React from 'react';

import { logOut } from '../utils/authActions.js';
import { useAppSelector, useAppDispatch } from '../store/hooks.js';

import { logout } from '../store/reducers/user.js';
import { clearToken } from '../store/reducers/auth.js';
interface modalProps {
setModalComponent: (value: string) => any
setIsMessageModalOpen: (value: boolean) => any
setIsModalOpen: (value: boolean) => any
setMainComponent: (value: string) => any
setSuccessMessage: (value: string) => any
setErrorMessage: (value: string) => any
}


function MenuModal({setModalComponent, setIsMessageModalOpen, setIsModalOpen, setMainComponent, setSuccessMessage, setErrorMessage }: modalProps) {

  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.authToken.value)
  const user = useAppSelector(state => state.user.value)
const handleCloseModal = () => {
        setModalComponent("");
        setIsModalOpen(false);
    }

const handleUserProfile = () => {
  setMainComponent("userProfile")
  setIsModalOpen(false);
  setModalComponent("");
}

const handleLogOut = async () => {
  const authData = {token: token, userId: user.id}

  try {
    const logOutResponse = await logOut(authData)

    if (!logOutResponse.result) {
      setIsMessageModalOpen(true)
      setErrorMessage("Une erreur est survenue")
      return
    }

    if(logOutResponse.result) {
      setIsMessageModalOpen(true)
      setSuccessMessage(logOutResponse.message)
      dispatch(clearToken())
      dispatch(logout())
      return
    }
  }catch (error) {
    console.error(error);
  }
}

  return (
    <div className="h-full w-full bg-white flex flex-col justify-center items-center">
            <div className="w-full flex justify-end" onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 mr-4 mt-2 hover:fill-gray-400 hover:cursor-pointer ">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </div>

            <h3 className="text-3xl mb-1">
                Menu
            </h3>
            <div className="flex flex-col justify-between items-center">
              <button className="m-2 px-2 py-1 bg-black text-white border border-white rounded-md hover:bg-gray-400 hover:text-black cursor-pointer"
                onClick={handleUserProfile}>
                Profile Utilisateur
              </button>
               <button className="m-2 px-2 py-1 bg-black text-white border border-white rounded-md hover:bg-gray-400 hover:text-black cursor-pointer"
                onClick={handleLogOut}>
                déconnection
              </button>
            </div>

            
        </div>
  )
}

export default MenuModal