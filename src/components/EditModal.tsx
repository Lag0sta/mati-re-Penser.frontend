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
  setIsEditModalOpen: (value: boolean) => any
}


function EditModal({ setIsModalOpen, setModalComponent, modalComponent, setIsMessageModalOpen, setErrorMessage, setSuccessMessage, setMainComponent , authType, setIsEditModalOpen }: modalProps) {
  console.log("modalComponent", modalComponent)

  return (
    <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20 "
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-xs   " />
      <div className='z-50 w-fit p-4 bg-gray-800 rounded-lg overflow-hidden'>
        <Suspense fallback={<div>Chargement...</div>}>
          {modalComponent === "editTopic" &&
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
              setIsEditModalOpen={(value: boolean) => setIsEditModalOpen(value)}
              setSuccessMessage={(value: string) => setSuccessMessage(value)}
              setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}/>
          }
        </Suspense>
      </div>
    </div>
  )
}

export default EditModal