interface HeaderProps {
  acceuilRef: any;
  discussionRef: any;
  publicationRef: any;
  aboutRef: any;
  contactRef: any;
  setIsAcceuil: any
  setIsDiscussions: any
  setIsPublication: any
  setIsAbout: any
}

function Header({ acceuilRef, discussionRef, publicationRef, aboutRef, contactRef, setIsAcceuil, setIsDiscussions, setIsPublication, setIsAbout }: HeaderProps) {

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

  return (
    <div className="w-screen ">
      <div className="h-24 flex justify-between items-center bg-black border-b-1 border-white">
        <div className="ml-4 text-white">
          <span onClick={() => handleScroll(acceuilRef)}>Logo</span>
        </div>
        <div className="mr-4">
          <span className="mx-1 px-2 py-1 bg-black text-white border border-white  rounded-md"
            onClick={() => handleScroll(discussionRef)}
          >
            discussions
          </span>
          <span className="mx-1 px-2 py-1 bg-black text-white border border-white  rounded-md"
            onClick={() => handleScroll(publicationRef)}
          >
            publications
          </span>
          <span className="mx-1 px-2 py-1 bg-black text-white border border-white  rounded-md"
            onClick={() => handleScroll(aboutRef)}
          >
            A propos
          </span>
          <span className="mx-1 px-2 py-1 bg-black text-white border border-white  rounded-md"
            onClick={handleScrollContact}>contact</span>
        </div>
      </div>
    </div>
  )
}

export default Header