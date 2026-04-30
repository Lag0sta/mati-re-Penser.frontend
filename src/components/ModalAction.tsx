import React from 'react';
import { Suspense } from 'react'

import ReviewAdd from './ReviewAdd.js';
import CommentDelete from './CommentDelete.js';
import Auth from './Auth.js';
import Menu from './Menu.js';
import PublicationArchiveStatus from './PublicationArchiveStatus.js';
import PublicationMarketEdit from './PublicationMarketEdit.js';

import { msgProps, modalProps, screenActionProps } from "../types/Props.js";
import ReviewDelete from './ReviewDelete.js';

const SignIn = React.lazy(() => import('./SignIn.js'));
const SignUp = React.lazy(() => import('./SignUp.js'));
const AvatarGallery = React.lazy(() => import('./AvatarGallery.js'));

interface Props {
  modalProps: modalProps
  msgProps: msgProps
  screenActionProps: screenActionProps
  authType: string
  setAuthType: (value: string) => any
  setResponse: (value: boolean) => any
  book: string
  marketURL: string
}

function ModalAction({ modalProps, msgProps, screenActionProps, authType, setAuthType, setResponse, book, marketURL }: Props) {

  return (
    <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20 "
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-xs   " />
      <div className='z-50 w-[20rem]  bg-white rounded-lg overflow-hidden'>
        <Suspense fallback={<div>Chargement...</div>}>

          {modalProps.modalComponent === "signIn" &&
            <SignIn modalProps={modalProps}
              msgProps={msgProps} />
          }
          {modalProps.modalComponent === "signUp" &&
            <SignUp modalProps={modalProps}
              msgProps={msgProps} />
          }
          {modalProps.modalComponent === "avatarGallery" &&
            <AvatarGallery modalProps={modalProps}
              msgProps={msgProps} />
          }

          {modalProps.modalComponent === "auth" &&
            <Auth modalProps={modalProps}
              msgProps={msgProps}
              authType={authType}
              setResponse={(value: boolean) => setResponse(value)}
            />
          }
          {modalProps.modalComponent === "modalMenu" &&
            <Menu modalProps={modalProps}
              screenActionProps={screenActionProps}
              msgProps={msgProps}
            />
          }
          {modalProps.modalComponent === "deleteComment" &&
            <CommentDelete screenActionProps={screenActionProps}
              msgProps={msgProps}
              modalProps={modalProps}
              setAuthType={(value: string) => setAuthType(value)} />
          }
          {modalProps.modalComponent === "addReview" &&
            <ReviewAdd modalProps={modalProps}
              msgProps={msgProps}
              book={book} />

          }
          {modalProps.modalComponent === "deleteReview" &&
            <ReviewDelete modalProps={modalProps}
              msgProps={msgProps}
              setAuthType={(value: string) => setAuthType(value)} />
          }
          {modalProps.modalComponent === "archiveStatus" &&
            <PublicationArchiveStatus
              modalProps={modalProps}
              msgProps={msgProps}
            />
          }
          {modalProps.modalComponent === "editMarketURL" &&
          <PublicationMarketEdit
          modalProps={modalProps}
          msgProps={msgProps}
          setAuthType={setAuthType}
          marketURL={marketURL}/>
          }
        </Suspense>
      </div>
    </div>
  )
}

export default ModalAction