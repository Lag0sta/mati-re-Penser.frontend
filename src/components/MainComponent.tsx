import { Suspense } from 'react';
import TopicThread from './TopicThread.js';
import Forum from './Forum.js';
import Publications from './Publications.js';
import PublicationLatest from './PublicationLatest.js';
import About from './About.js';
import UserProfile from './UserProfile.js';

import {msgProps, modalProps, screenActionProps} from "../types/Props.js";

interface props {
  msgProps: msgProps,
  modalProps: modalProps,
  screenActionProps: screenActionProps
  setPublicationID: (value: string) => any
  setAuthType: (value: string) => any
  setBook: (value: string) => any
  setReplyTo: (value: any) => any
  replyTo: any
}
function MainComponent({msgProps, modalProps, screenActionProps, setPublicationID, setAuthType, setBook, setReplyTo, replyTo} : props) {
 
  return (
      <div ref={screenActionProps.mainRef}
        className="row-start-2 row-end-3 col-start-1 col-end-5">
        <Suspense fallback={<div>Chargement...</div>}>
          {screenActionProps.mainComponent === "acceuil" && (
            <PublicationLatest modalProps={modalProps}
              setPublicationID={setPublicationID}
              setAuthType={setAuthType}
              setBook={setBook}/>
          )}
          {screenActionProps.mainComponent === "forum" && (
            <Forum screenActionProps={screenActionProps}
              msgProps={msgProps}
              modalProps={modalProps}/>
          )}
          {screenActionProps.mainComponent === "publication" && <Publications />}
          {screenActionProps.mainComponent === "topicThread" && (
            <TopicThread replyTo={replyTo}
              setReplyTo={setReplyTo}
              msgProps={msgProps}
              modalProps={modalProps}
              setAuthType={setAuthType}
            />
          )}
          {screenActionProps.mainComponent === "about" && <About />}
          {screenActionProps.mainComponent === "userProfile" && (
            <UserProfile modalProps={modalProps}/>
          )}
        </Suspense>
      </div>

  );
}

export default MainComponent;
