import { startTransition } from "react";
import { useAppSelector } from "../store/hooks.js";


interface HeaderProps {
  acceuilRef: any;
  mainRef: any;
  contactRef: any;
  setMainComponent: (value: string) => any
  setModalComponent: (value: string) => any
  setIsModalOpen: (value: boolean) => any
}

function Header({ acceuilRef, mainRef, contactRef, setMainComponent, setModalComponent, setIsModalOpen, }: HeaderProps) {
  const token = useAppSelector((state: any) => state.authToken.value);
  const user = useAppSelector((state: any) => state.user.value);
  let avatar;


  //fonction Click scrollant la page
  const handleScroll = (ref: any, refTitle: any) => {
    startTransition(() => {

      if (ref.current) {
        window.scrollTo({
          top: ref.current.offsetTop,
          behavior: 'smooth'
        });
      }

      // MAJ des états en fonction de la ref passée en parametre
      if (ref === mainRef && refTitle === "forum") {
        setMainComponent("forum")
      } else if (ref === mainRef && refTitle === "publication") {
        setMainComponent("publication")
      } else if (ref === mainRef && refTitle === "about") {
        setMainComponent("about")
      } else {
        setMainComponent("acceuil")
      }
    })
  }

  const handleContactScroll = () => {
    startTransition(() => {

      if (contactRef.current) {
        window.scrollTo({
          top: contactRef.current.offsetTop,
          behavior: 'smooth'
        });
      }
    })
  }

  const handleClickSign = () => {
    startTransition(() => {
      setIsModalOpen(true);
      setModalComponent("signIn");
    })
  }

  const handleClickAvatar = () => {
    startTransition(() => {
      setIsModalOpen(true);
      setModalComponent("modalMenu");
    })
  }

  if (!user.avatar) {
    const str = user.pseudo;
    const avatarUrl = str.slice(0, 1).toUpperCase();
    avatar = (
      <div className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-full bg-white"
        onClick={handleClickAvatar}>
        <span className="text-xl">{avatarUrl}</span>
      </div>
    )
  } else {
    const avatarUrl = user.avatar
    avatar = (
      <div className="w-12 h-12 flex justify-center items-center cursor-pointer rounded-full bg-white"
      onClick={handleClickAvatar}>
        <img className="w-14 h-14 flex justify-center items-center cursor-pointer rounded-full" src={avatarUrl} />
      </div>
    )
  }

  return (
    <div className="w-screen ">
      <div className="h-24 flex  justify-between items-center bg-black border-b-1 border-white">
        <div className=" flex justify-between items-center ml-10">
          <nav className=" text-white">
            <button onClick={() => handleScroll(acceuilRef, "acceuil")}
              aria-label="Aller à la section Accueil"
              className="cursor-pointer"
            >
              Logo
            </button>
          </nav>

        </div>
        <div className="mt-10">
          <nav className="mr-4">
            <button className="mx-1 px-2 py-1 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black cursor-pointer"
              onClick={() => handleScroll(mainRef, "forum")}
              aria-label="Faire apparaitre et défiler l'écrant jusqu'à la section des forum"
            >
              discussions
            </button>
            <button className="mx-1 px-2 py-1 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black cursor-pointer"
              onClick={() => handleScroll(mainRef, "publication")}
              aria-label="Faire apparaitre et défiler l'écrant jusqu'à la section des publications de l'auteur"
            >
              publications
            </button>
            <button className="mx-1 px-2 py-1 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black cursor-pointer"
              onClick={() => handleScroll(mainRef, "about")}
              aria-label="Faire apparaitre et défiler l'écrant jusqu'à la section à propos de l'auteur"
            >
              A propos
            </button>
            <button className="mx-1 px-2 py-1 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black cursor-pointer"
              onClick={handleContactScroll}
              aria-label="Faire défiler l'écrant jusqu'à la section contact"
            >
              contact
            </button>
          </nav>
        </div>
        {!token &&
          <button className="mr-10 cursor-pointer"
            aria-label="Se connecter ou s'inscrire"
            onClick={handleClickSign}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className="size-6 border-2 border-white rounded-full">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>

          </button>
        }
        {token &&
          <div className="w-14 h-14 mr-10 flex justify-center items-center cursor-pointer rounded-full bg-white">
            {avatar}
          </div>
        }
      </div>
    </div>
  )
}

export default Header