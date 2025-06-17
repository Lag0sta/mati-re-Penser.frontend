interface HeaderProps {
    discussionRef: any;
    publicationRef: any;
    aboutRef: any;
    contactRef: any;
}

function Header({discussionRef, publicationRef, aboutRef, contactRef}: HeaderProps) {

  //fonction Click scrollant la page vers le top
  const handleScrollAcceuil = () => {
    console.log('Acceuil Click')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const handleScrollDiscussion = () => {
    if (discussionRef.current) {
      window.scrollTo({
        top: discussionRef.current.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  const handleScrollPublication = () => {
      if (discussionRef.current) {
      window.scrollTo({
        top: discussionRef.current.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  const handleScrollAbout = () => {
    if (aboutRef.current) {
      window.scrollTo({
        top: aboutRef.current.offsetTop,
        behavior: 'smooth'
      });
    }
  }

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
                    <span onClick={handleScrollAcceuil}>Logo</span>
                </div>
                <div className="mr-4">
                    <span className="mx-1 px-2 py-1 bg-black text-white border border-white  rounded-md">discussions</span>
                    <span className="mx-1 px-2 py-1 bg-black text-white border border-white  rounded-md">publications</span>
                    <span className="mx-1 px-2 py-1 bg-black text-white border border-white  rounded-md">A propos</span>
                    <span className="mx-1 px-2 py-1 bg-black text-white border border-white  rounded-md"
                          onClick={handleScrollContact}>contact</span>
                </div>
            </div>
        </div>


    )
}

export default Header