import { Suspense } from 'react';
import { useAppSelector } from "../store/hooks.js"
import TopicThread from './TopicThread.js';
import Forum from './Forum.js';
import Publications from './Publications.js';
import ArchivedPublication from './ArchivedPublication.js';
import PublicationLatest from './PublicationLatest.js';
import About from './About.js';
import UserProfile from './UserProfile.js';
import TopicThreadPrint from './TopicThreadPrint.js';

import { msgProps, modalProps, screenActionProps, adminProps } from "../types/Props.js";

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
function MainComponent({ msgProps, modalProps, screenActionProps, adminProps, setPublicationID, setAuthType, setBook, setReplyTo, replyTo, setMarketURL }: props) {
  const user = useAppSelector(state => state.user.value)

  //Gestion de l'impression
  const handlePrint = () => {
    window.print()
  }

  const handleAdminView = () => {
    adminProps.setIsAdminView(!adminProps.isAdminView);
  }

  return (
    <div ref={screenActionProps.mainRef}
      className="row-start-2 row-end-3 col-start-1 col-end-5">
      <Suspense fallback={<div>Chargement...</div>}>
        <div className='hidden print:block'>
          <TopicThreadPrint />
        </div>
        <div className='print:hidden'>
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
              modalProps={modalProps} />
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
              setMarketURL={setMarketURL} />
          )}
          {screenActionProps.mainComponent === "about" && <About />}
          {screenActionProps.mainComponent === "userProfile" && (
            <UserProfile modalProps={modalProps} />
          )}
        </div>

        {screenActionProps.mainComponent === "topicThread" && (
          <div>
            <div className='pt-24 flex flex-col justify-center  items-center'>
              {(user.isAdmin && !adminProps.isAdminView) &&
                <button className="px-2 flex items-center bg-red-600  rounded-t-md text-xs text-white hover:bg-red-100 hover:text-red-600 print:hidden"
                  onClick={handleAdminView}>
                  Admin View
                </button>
              }
              {(user.isAdmin && adminProps.isAdminView) &&
                <div className='flex flex-col justify-center items-center '>
                  <div className='mb-4'>
                    <span className="print:hidden font-bold mr-2 border-3 border-red-600 rounded-md text-xs text-red-600 p-2 cursor-pointer hover:bg-red-400 hover:text-white"
                    onClick={handlePrint}
                    >
                      Print
                    </span>
                  </div>
                  <button className="px-2 bg-red-600  rounded-t-md text-xs text-white hover:bg-red-100 hover:text-red-600 print:hidden"
                    onClick={handleAdminView}>
                    Close Admin View
                  </button>
                </div>

              }
              <TopicThread
                adminProps={adminProps}
                replyTo={replyTo}
                setReplyTo={setReplyTo}
                msgProps={msgProps}
                modalProps={modalProps}
                setAuthType={setAuthType}
              />
            </div>
          </div>
        )}
      </Suspense>
    </div>

  );
}

export default MainComponent;
