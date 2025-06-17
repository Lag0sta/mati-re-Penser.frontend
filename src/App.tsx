import Header from './Header.js'
import Contact from './Contact.js'
import Discussions from './Discussions.js'
import Publications from './Publications.js'
import About from './About.js'
import New from './New.js'

import { useState } from 'react'
import { useRef } from 'react'

function App() {
  const [isAcceuil, setIsAcceuil] = useState(true);
  const [isDuscussions, setIsDiscussions] = useState(false);
  const [isPublication, setIsPublication] = useState(false);
  const [isAbout, setIsAbout] = useState(false);

  //ref initiale = null => ne pointe pas encore vers un él. DOM
  const acceuilRef = useRef(null);
  const discussionRef = useRef(null);
  const publicationRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)


  return (
    <main className="max-w-screen lg:min-h-screen mx-auto grid grid-rows-4 grid-cols-4">
      <header className="row-start-1 row-end-2 col-start-1 col-end-5 z-10 fixed">
        <Header acceuilRef={acceuilRef} discussionRef={discussionRef} publicationRef={publicationRef} aboutRef={aboutRef} contactRef={contactRef} setIsDiscussions={setIsDiscussions} setIsPublication={setIsPublication} setIsAbout={setIsAbout} setIsAcceuil={setIsAcceuil} />
      </header>
      <div className="row-start-1 row-end-2 col-start-1 col-end-5 h-screen bg-white"
           ref={acceuilRef}
      >
        <div className="h-full w-full flex flex-col justify-center items-center my-4 bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: "url(../assets/img/2aaad4_83b9b366fcc24f808c1f0d9beeef546d~mv2.avif)" }}>
          <h1 className="text-7xl text-white">MATIÈRE À PENSER</h1>
          <h3 className="text-1xl mt-4  text-white">Site de discussion philosophique et de publication de Jean Christophe Ronnet</h3>
        </div>
      </div>

      <div className="row-start-2 row-end-4 col-start-1 col-end-5 bg-green-400"
        ref={discussionRef}>
        {isAcceuil && <New />}
        {isDuscussions && <Discussions />}
        {isPublication && <Publications />}
        {isAbout && <About />}
        CONTENT
      </div>
      <footer className="row-start-4 row-end-5 col-start-1 col-end-5"
        ref={contactRef}>
        <Contact />
      </footer>

    </main>

  )
}

export default App
