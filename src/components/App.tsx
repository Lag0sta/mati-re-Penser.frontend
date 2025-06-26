import Header from './Header.js'
import Contact from './Contact.js'
import Discussions from './Discussions.js'
import Publications from './Publications.js'
import About from './About.js'
import New from './New.js'
import SignInSignUpModal from './SignInSignUpModal.js'
import MessageModal from './MessageModal.js'

import { useState } from 'react'
import { useRef } from 'react'

function App() {
  const [isAcceuil, setIsAcceuil] = useState<boolean>(true);
  const [isDuscussions, setIsDiscussions] = useState<boolean>(false);
  const [isPublication, setIsPublication] = useState<boolean>(false);
  const [isAbout, setIsAbout] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isAddComment, setIsAddComment] = useState<boolean>(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  //ref initiale = null => ne pointe pas encore vers un él. DOM
  const acceuilRef = useRef<HTMLDivElement>(null);
  const discussionRef = useRef<HTMLDivElement>(null);
  const publicationRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  return (
    <main className="max-w-screen  mx-auto grid grid-rows-4 grid-cols-4">
      <header className="row-start-1 row-end-2 col-start-1 col-end-5 z-10 fixed">
        <Header acceuilRef={acceuilRef}
          discussionRef={discussionRef}
          publicationRef={publicationRef}
          aboutRef={aboutRef}
          contactRef={contactRef}
          setIsDiscussions={setIsDiscussions}
          setIsPublication={setIsPublication}
          setIsAbout={(value: boolean) => setIsAbout(value)}
          setIsAcceuil={(value: boolean) => setIsAcceuil(value)}
          setIsSignIn={(value: boolean) => setIsSignIn(value)}
          setIsSignUp={(value: boolean) => setIsSignUp(value)}
          setIsModalOpen={(value: boolean) => setIsModalOpen(value)}

        />
      </header>
      <div className="row-start-1 row-end-2 col-start-1 col-end-5 bg-white"
        ref={acceuilRef}
      >
        <div className="h-full w-full flex flex-col justify-center items-center my-4 bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: "url(../assets/img/2aaad4_83b9b366fcc24f808c1f0d9beeef546d~mv2.avif)" }}>
          <h1 className="text-7xl text-white">MATIÈRE À PENSER</h1>
          <h3 className="text-1xl mt-4  text-white">Site de discussion philosophique et de publication de Jean Christophe Ronnet</h3>
        </div>
      </div>

      <div className="row-start-2 row-end-4 col-start-1 col-end-5"
        ref={discussionRef}>
        {isAcceuil &&
          <New setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
            setIsAddComment={(value: boolean) => setIsAddComment(value)}
          />}
        {isDuscussions && <Discussions />}
        {isPublication && <Publications />}
        {isAbout && <About />}
      </div>

      <footer className="row-start-4 row-end-5 col-start-1 col-end-5"
        ref={contactRef}>
        <Contact />
      </footer>

      {isModalOpen &&
        <SignInSignUpModal setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
                           isSignIn={isSignIn}
                           setIsSignIn={(value: boolean) => setIsSignIn(value)}
                           isSignUp={isSignUp}
                           setIsSignUp={(value: boolean) => setIsSignUp(value)}
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
                      setIsSignIn={(value: boolean) => setIsSignIn(value)}
                      setIsSignUp={(value: boolean) => setIsSignUp(value)}
        />
      }
    </main>

  )
}

export default App
