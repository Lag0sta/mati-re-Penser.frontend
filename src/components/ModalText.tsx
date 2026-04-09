import { Suspense } from 'react'

import TopicEdit from './TopicEdit.js';
import CommentEdit from './CommentEdit.js';
import TopicNew from './TopicNew.js';
import PublicationNew from './PublicationNew.js';
import PublicationEditTxt from './PublicationEditTxt.js';
import PublicationEditImg from './PublicationEditImg.js';

import { modalProps, msgProps, screenActionProps } from "../types/Props.js";
interface props {
  replyTo: any
  setReplyTo: (value: any) => any
  modalProps: modalProps
  msgProps: msgProps
  screenActionProps: screenActionProps
  publicationID: string
}

function ModalText({ replyTo, setReplyTo, modalProps, msgProps, screenActionProps, publicationID }: props) {

  return (
    <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20 "
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-xs   " />
      <div className='z-50 w-fit p-4 bg-gray-800 rounded-lg overflow-hidden'>
        <Suspense fallback={<div>Chargement...</div>}>
          {modalProps.modalComponent === "newTopic" &&
            <TopicNew setMainComponent={(value: string) => screenActionProps.setMainComponent(value)}
              msgProps={msgProps}
              modalProps={modalProps} />
          }
          {modalProps.modalComponent === "editTopic" &&
            <TopicEdit setMainComponent={(value: string) => screenActionProps.setMainComponent(value)}
              msgProps={msgProps}
              modalProps={modalProps} />
          }
          {modalProps.modalComponent === "editComment" &&
            <CommentEdit replyTo={replyTo}
              setReplyTo={(value: any) => setReplyTo(value)}
              setMainComponent={(value: string) => screenActionProps.setMainComponent(value)}
              msgProps={msgProps}
              modalProps={modalProps} />
          }
          {modalProps.modalComponent === "newPublication" &&
            <PublicationNew setMainComponent={(value: string) => screenActionProps.setMainComponent(value)}
              msgProps={msgProps}
              modalProps={modalProps} />
          }
          {modalProps.modalComponent === "editPublicationtxt" &&
            <PublicationEditTxt setMainComponent={(value: string) => screenActionProps.setMainComponent(value)}
              msgProps={msgProps}
              modalProps={modalProps}
              publicationID={publicationID} />
          }
          {modalProps.modalComponent === "editPublicationImg" &&
            <PublicationEditImg
              msgProps={msgProps}
              modalProps={modalProps}
              publicationID={publicationID}
            />
          }
        </Suspense>
      </div>
    </div>
  )
}

export default ModalText