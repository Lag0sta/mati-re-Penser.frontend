import React, { useState, useRef, Suspense } from 'react';
import TopicThread from './TopicThread.js';
import Header from './Header.js';
import Contact from './Contact.js';
import Forum from './Forum.js';
import Publications from './Publications.js';
import About from './About.js';
import New from './New.js';
import Modal from './Modal.js';
import TextModal from './TextModal.js';
import UserProfile from './UserProfile.js';
import MessageModal from './MessageModal.js';

function App() {
  const [mainComponent, setMainComponent] = useState<string>('acceuil');
  const [modalComponent, setModalComponent] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState<boolean>(false);
  const [isAddComment, setIsAddComment] = useState<boolean>(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [authType, setAuthType] = useState<string>("");
  const [replyTo, setReplyTo] = useState<string>("");

console.log("modalComponent", modalComponent)
console.log("isModalOpen", isModalOpen)
  const acceuilRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const headerHeight = 80; // Ajuste à la hauteur réelle de ton header en px

  return (
    <main className="max-w-screen mx-auto grid grid-rows-[auto_1fr_auto] grid-cols-4 bg-gray-200 min-h-screen">
      
      {/* Header */}
      <header className="row-start-1 row-end-2 col-start-1 col-end-5 z-10 fixed w-full">
        <Suspense fallback={<div>Chargement...</div>}>
          <Header
            acceuilRef={acceuilRef}
            mainRef={mainRef}
            contactRef={contactRef}
            setMainComponent={setMainComponent}
            setModalComponent={setModalComponent}
            setIsModalOpen={setIsModalOpen}
          />
        </Suspense>
      </header>

      {/* Accueil / Hero */}
      <div
        ref={acceuilRef}
        className={`row-start-1 row-end-2 col-start-1 col-end-5`}
        style={{ paddingTop: `${headerHeight}px` }}

      >
        <div
          className="w-full flex flex-col justify-center items-center h-[calc(100vh-80px)]  bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: "url(../assets/img/2aaad4_83b9b366fcc24f808c1f0d9beeef546d~mv2.avif)" }}
        >
          <h1 className="text-7xl text-white">MATIÈRE À PENSER</h1>
          <h2 className="text-1xl mt-4 text-white">
            Site de discussion philosophique et de publication de Jean Christophe Ronnet
          </h2>
        </div>
      </div>

      {/* Main */}
      <div
        ref={mainRef}
        className="row-start-2 row-end-3 col-start-1 col-end-5"
      >
        <Suspense fallback={<div>Chargement...</div>}>
          {mainComponent === "acceuil" && (
            <New
              setIsModalOpen={setIsModalOpen}
              setIsAddComment={setIsAddComment}
            />
          )}
          {mainComponent === "forum" && (
            <Forum
              setMainComponent={setMainComponent}
              setModalComponent={setModalComponent}
              setIsTextModalOpen={setIsTextModalOpen}
              setErrorMessage={setErrorMessage}
              setIsMessageModalOpen={setIsMessageModalOpen}
            />
          )}
          {mainComponent === "publication" && <Publications />}
          {mainComponent === "topicThread" && (
            <TopicThread
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
              setIsModalOpen={setIsModalOpen}
              setIsTextModalOpen={setIsTextModalOpen}
              setIsMessageModalOpen={setIsMessageModalOpen}
              setModalComponent={setModalComponent}
              setAuthType={setAuthType}
            />
          )}
          {mainComponent === "about" && <About />}
          {mainComponent === "userProfile" && (
            <UserProfile
              setIsModalOpen={setIsModalOpen}
              setModalComponent={setModalComponent}
            />
          )}
        </Suspense>
      </div>

      {/* Footer */}
      <footer
        ref={contactRef}
        className="row-start-3 row-end-4 col-start-1 col-end-5 pt-24"
      >
        <Suspense fallback={<div>Chargement...</div>}>
          <Contact />
        </Suspense>
      </footer>

      {/* Modals */}
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          setModalComponent={setModalComponent}
          modalComponent={modalComponent}
          setIsMessageModalOpen={setIsMessageModalOpen}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setMainComponent={setMainComponent}
          authType={authType}
          setAuthType={setAuthType}
        />
      )}
      {isTextModalOpen && (
        <TextModal
        setIsModalOpen={setIsModalOpen}
          setModalComponent={setModalComponent}
          modalComponent={modalComponent}
          setIsMessageModalOpen={setIsMessageModalOpen}
          setIsTextModalOpen={setIsTextModalOpen}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setMainComponent={setMainComponent}
          authType={authType}
          replyTo={replyTo}
          setReplyTo={setReplyTo}/>)}
          
      {isMessageModalOpen && (
        <MessageModal
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setIsMessageModalOpen={setIsMessageModalOpen}
          setIsModalOpen={setIsModalOpen}
          setModalComponent={setModalComponent}
          modalComponent={modalComponent}
          authType={authType}
        />
      )}
    </main>
  );
}

export default App;
