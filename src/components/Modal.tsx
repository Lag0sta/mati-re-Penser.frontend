import React from 'react';
import ModalText from './ModalText.js';
import ModalAction from './ModalAction.js';
import ModalMessage from './ModalMessage.js';

import { msgProps, modalProps, screenActionProps } from "../types/Props.js";
interface Props {
  modalProps: modalProps
  msgProps: msgProps
  screenActionProps: screenActionProps
  authType: string
  setAuthType: (value: string) => any
  setResponse: (value: boolean) => any
  book: string
  replyTo: string
  setReplyTo: (value: string) => any
  publicationID: string
  marketURL: string
}


function Modal({ modalProps, msgProps, screenActionProps , authType, setAuthType, setResponse, book, replyTo, setReplyTo, publicationID, marketURL }: Props) {

  return (
    <div>
       {modalProps.isModalOpen && (
      <ModalAction modalProps={modalProps}
          msgProps={msgProps}
          screenActionProps={screenActionProps}
          authType={authType}
          setAuthType={setAuthType}
          setResponse={setResponse}
          book={book}
          marketURL={marketURL}/>
      )}
      {modalProps.isTextModalOpen && (
        <ModalText
          modalProps={modalProps}
          msgProps={msgProps}
          screenActionProps={screenActionProps}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
          publicationID={publicationID}/>
        )}

      {modalProps.isMessageModalOpen && (
        <ModalMessage
          msgProps={msgProps}
          modalProps={modalProps}
          authType={authType}
        />
      )}
    </div>
  )
}

export default Modal