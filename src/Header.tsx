interface HeaderProps {
  acceuilRef: any;
  discussionRef: any;
  publicationRef: any;
  aboutRef: any;
  contactRef: any;
  setIsAcceuil: (value: boolean) => any
  setIsDiscussions: (value: boolean) => any
  setIsPublication: (value: boolean) => any
  setIsAbout: (value: boolean) => any
  setIsSignIn: (value: boolean) => any
  setIsSignUp: (value: boolean) => any
  setIsModalOpen: (value: boolean) => any
}

function Header({ acceuilRef, discussionRef, publicationRef, aboutRef, contactRef, setIsAcceuil, setIsDiscussions, setIsPublication, setIsAbout, setIsSignIn, setIsSignUp, setIsModalOpen }: HeaderProps) {

  //fonction Click scrollant la page
  const handleScroll = (ref: any) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
      })
    }
    setIsAcceuil(false)
    setIsDiscussions(false)
    setIsPublication(false)
    setIsAbout(false)

    // MAJ des états en fonction de la ref passée en parametre
    if (ref === discussionRef) {
      setIsDiscussions(true)
    } else if (ref === publicationRef) {
      setIsPublication(true)
    } else if (ref === aboutRef) {
      setIsAbout(true)
    } else {
      setIsAcceuil(true)
    }
  }

  //scroll contact
  const handleScrollContact = () => {
    if (contactRef.current) {
      window.scrollTo({
        top: contactRef.current.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  const handleClickSign = () => {
    console.log("click")
    setIsModalOpen(true);
    setIsSignIn(true);
    setIsSignUp(false);
  }

  return (
    <div className="w-screen ">
      <div className="h-24 flex flex-col justify-evenly items-center bg-black border-b-1 border-white">
        <div className="w-full flex justify-between items-center">
          <nav className="ml-10 text-white">
            <button onClick={() => handleScroll(acceuilRef)}
                    aria-label="Aller à la section Accueil"
                    className="cursor-pointer"
            >
              Logo
            </button>
          </nav>
          <button className="mr-10 cursor-pointer"
                  aria-label="Se connecter ou s'inscrire"
                  onClick={handleClickSign}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className="size-6 border-2 border-white rounded-full">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>

          </button>
        </div>

        <nav className="mr-4">
          <button className="mx-1 px-2 py-1 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black cursor-pointer"
            onClick={() => handleScroll(discussionRef)}
            aria-label="Faire apparaitre et défiler l'écrant jusqu'à la section des discussions"
          >
            discussions
          </button>
          <button className="mx-1 px-2 py-1 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black cursor-pointer"
            onClick={() => handleScroll(publicationRef)}
            aria-label="Faire apparaitre et défiler l'écrant jusqu'à la section des publications de l'auteur"
          >
            publications
          </button>
          <button className="mx-1 px-2 py-1 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black cursor-pointer"
            onClick={() => handleScroll(aboutRef)}
            aria-label="Faire apparaitre et défiler l'écrant jusqu'à la section à propos de l'auteur"
          >
            A propos
          </button>
          <button className="mx-1 px-2 py-1 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black cursor-pointer"
            onClick={handleScrollContact}
            aria-label="Faire défiler l'écrant jusqu'à la section contact"
          >
            contact
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Header