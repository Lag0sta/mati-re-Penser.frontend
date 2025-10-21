import React from 'react';
import { useState, Suspense } from 'react'
import { useRef } from 'react'
import EditTopic from './EditTopic.js';
import EditComment from './EditComment.js';
import NewTopic from './NewTopic.js';
import Auth from './Auth.js';
import MenuModal from './MenuModal.js';
const SignIn = React.lazy(() => import('./SignIn.js'));
const SignUp = React.lazy(() => import('./SignUp.js'));
const AvatarGallery = React.lazy(() => import('./AvatarGallery.js'));

interface modalProps {
  setIsModalOpen: (value: boolean) => any
  modalComponent: string
  setModalComponent: (value: string) => any
  setIsMessageModalOpen: (value: boolean) => any
  setErrorMessage: (value: string) => any
  setSuccessMessage: (value: string) => any
  setMainComponent: (value: string) => any
  authType: string
}


function Modal({ setIsModalOpen, setModalComponent, modalComponent, setIsMessageModalOpen, setErrorMessage, setSuccessMessage, setMainComponent , authType }: modalProps) {
  console.log("modalComponent", modalComponent)

  return (
    <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20 "
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-xs   " />
      <div className='z-50 w-[20rem]  bg-white rounded-lg overflow-hidden'>
        <Suspense fallback={<div>Chargement...</div>}>

          {modalComponent === "signIn" &&
            <SignIn setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
              setModalComponent={(value: string) => setModalComponent(value)}
              setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
              setErrorMessage={(value: string) => setErrorMessage(value)}
              setSuccessMessage={(value: string) => setSuccessMessage(value)}
            />}
          {modalComponent === "signUp" &&
            <SignUp setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
              setModalComponent={(value: string) => setModalComponent(value)}
              setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
              setErrorMessage={(value: string) => setErrorMessage(value)}
              setSuccessMessage={(value: string) => setSuccessMessage(value)}

            />
          }
          {modalComponent === "avatarGallery" &&
            <AvatarGallery setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
              setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
              setModalComponent={(value: string) => setModalComponent(value)}
              setErrorMessage={(value: string) => setErrorMessage(value)}
              setSuccessMessage={(value: string) => setSuccessMessage(value)} />
          }
          {modalComponent === "newTopic" &&
            <NewTopic setMainComponent={(value: string) => setMainComponent(value)}
              modalComponent={modalComponent}
              setModalComponent={(value: string) => setModalComponent(value)}
              setErrorMessage={(value: string) => setErrorMessage(value)}
              setSuccessMessage={(value: string) => setSuccessMessage(value)}
              setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
              setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
            />
          }
          {/* {modalComponent === "editTopic" &&
            <EditTopic setMainComponent={(value: string) => setMainComponent(value)}
              modalComponent={modalComponent}
              setModalComponent={(value: string) => setModalComponent(value)}
              setErrorMessage={(value: string) => setErrorMessage(value)}
              setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
              setSuccessMessage={(value: string) => setSuccessMessage(value)}
              setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)} />
          }
          {modalComponent === "editComment" &&
            <EditComment setMainComponent={(value: string) => setMainComponent(value)}
              modalComponent={modalComponent}
              setModalComponent={(value: string) => setModalComponent(value)}
              setErrorMessage={(value: string) => setErrorMessage(value)}
              setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
              setSuccessMessage={(value: string) => setSuccessMessage(value)}
              setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}/>
          }
           */}
          {modalComponent === "auth" &&
            <Auth setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
              setModalComponent={(value: string) => setModalComponent(value)}
              setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
              setErrorMessage={(value: string) => setErrorMessage(value)}
              setSuccessMessage={(value: string) => setSuccessMessage(value)}
              authType={authType} 
            />
            
          }
          {modalComponent === "modalMenu" &&
              <MenuModal setModalComponent={(value: string) => setModalComponent(value)}
                setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
                setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
                setMainComponent={(value: string) => setMainComponent(value)}
                setErrorMessage={(value: string) => setErrorMessage(value)}
                setSuccessMessage={(value: string) => setSuccessMessage(value)}
              />
          }
          
          {/* {modalComponent === "deleteTopic" &&
            <DeleteTopic setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
              setModalComponent={(value: string) => setModalComponent(value)}
              setErrorMessage={(value: string) => setErrorMessage(value)}
              setSuccessMessage={(value: string) => setSuccessMessage(value)} />
          } */}
        </Suspense>
      </div>
    </div>
  )
}

export default Modal