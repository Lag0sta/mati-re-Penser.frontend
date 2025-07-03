import React from 'react';
import { useState, Suspense, } from 'react'
import { useRef } from 'react'
import Topics from './Topics.js';

const Header = React.lazy(() => import('./Header.js'));
const Contact = React.lazy(() => import('./Contact.js'));
const Discussions = React.lazy(() => import('./Discussions.js'));
const Publications = React.lazy(() => import('./Publications.js'));
const About = React.lazy(() => import('./About.js'));
const New = React.lazy(() => import('./New.js'));
const Modal = React.lazy(() => import('./Modal.js'));
const UserProfile = React.lazy(() => import('./UserProfile.js'));
const MessageModal = React.lazy(() => import('./MessageModal.js'));

function App() {
  const [mainComponent, setMainComponent] = useState<string>('main')
  const [modalComponent, setModalComponent] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddComment, setIsAddComment] = useState<boolean>(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  //ref initiale = null => ne pointe pas encore vers un él. DOM
  const acceuilRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null)

  return (
    <main className="max-w-screen mx-auto grid grid-rows-3 grid-cols-4 bg-gray-200">
      <header className="row-start-1 row-end-2 col-start-1 col-end-5 z-10 fixed">
        <Suspense fallback={<div>Chargement...</div>}>
          <Header acceuilRef={acceuilRef}
            mainRef={mainRef}
            contactRef={contactRef}
            setMainComponent={(value: string) => setMainComponent(value)}
            setModalComponent={(value: string) => setModalComponent(value)}
            setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
          />
        </Suspense>

      </header>
      <div className="row-start-1 row-end-2 col-start-1 col-end-5"
        ref={acceuilRef}
      >
        <div className="h-full max-h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: "url(../assets/img/2aaad4_83b9b366fcc24f808c1f0d9beeef546d~mv2.avif)" }}>
          <h1 className="text-7xl text-white">MATIÈRE À PENSER</h1>
          <h2 className="text-1xl mt-4 text-white">Site de discussion philosophique et de publication de Jean Christophe Ronnet</h2>
        </div>
      </div>

      <div className="h-min-screen row-start-2 row-end-3 col-start-1 col-end-5 black h-fit "
        ref={mainRef}>
        <Suspense fallback={<div>Chargement...</div>}>
          {mainComponent === "acceuil" &&
            <New setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
              setIsAddComment={(value: boolean) => setIsAddComment(value)}
            />}
          {mainComponent === "discussion" && 
            <Discussions setMainComponent={(value: string) => setMainComponent(value)}/>}
          {mainComponent === "publication" && <Publications />}
          {mainComponent === "topic" && 
            <Topics setMainComponent={(value: string) => setMainComponent(value)}/>}
          {mainComponent === "about" && <About />}
          {mainComponent === "profile" && 
            <UserProfile setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
              setMainComponent={(value: string) => setMainComponent(value)} />}
        </Suspense>
      </div>

      <footer className="h-full row-start-3 row-end-4 col-start-1 col-end-5 pt-24"
        ref={contactRef}>
        <Suspense fallback={<div>Chargement...</div>}>

          <Contact />
        </Suspense>
      </footer>

      {isModalOpen &&
        <Modal setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
          setModalComponent={(value: string) => setModalComponent(value)}
          modalComponent={modalComponent}
          setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
          setErrorMessage={(value: string) => setErrorMessage(value)}
          setSuccessMessage={(value: string) => setSuccessMessage(value)}
        />
      }

      {isMessageModalOpen &&
        <MessageModal successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setIsMessageModalOpen={setIsMessageModalOpen}
          setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
          setModalComponent={(value: string) => setModalComponent(value)}
        />
      }

    </main>

  )
}

export default App