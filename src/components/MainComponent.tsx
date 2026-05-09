import { Suspense, useState } from 'react';
import TopicThread from './TopicThread.js';
import Forum from './Forum.js';
import Publications from './Publications.js';
import ArchivedPublication from './ArchivedPublication.js';
import PublicationLatest from './PublicationLatest.js';
import About from './About.js';
import UserProfile from './UserProfile.js';

import {msgProps, modalProps, screenActionProps, adminProps} from "../types/Props.js";

interface props {
  msgProps: msgProps,
  modalProps: modalProps,
  screenActionProps: screenActionProps
  adminProps: adminProps
  setPublicationID: (value: string) => any
  setAuthType: (value: string) => any
  setBook: (value: string) => any
  setReplyTo: (value: any) => any
  replyTo: any
  setMarketURL: (value: string) => any
}
function MainComponent({msgProps, modalProps, screenActionProps, adminProps, setPublicationID, setAuthType, setBook, setReplyTo, replyTo, setMarketURL} : props) {
  
  return (
      <div ref={screenActionProps.mainRef}
        className="row-start-2 row-end-3 col-start-1 col-end-5">
        <Suspense fallback={<div>Chargement...</div>}>
          {screenActionProps.mainComponent === "acceuil" && (
            <PublicationLatest modalProps={modalProps}
              adminProps={adminProps}
              setPublicationID={setPublicationID}
              setAuthType={setAuthType}
              setBook={setBook}
              setMarketURL={setMarketURL}
              />
          )}
          {screenActionProps.mainComponent === "forum" && (
            <Forum screenActionProps={screenActionProps}
              msgProps={msgProps}
              modalProps={modalProps}/>
          )}
          {screenActionProps.mainComponent === "publication" && (
            <Publications screenActionProps={screenActionProps}
            />
          )}
          {screenActionProps.mainComponent === "Archive" && (
            <ArchivedPublication modalProps={modalProps}
              setPublicationID={setPublicationID}
              setAuthType={setAuthType}
              setBook={setBook}
              setMarketURL={setMarketURL}/>
          )}
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
