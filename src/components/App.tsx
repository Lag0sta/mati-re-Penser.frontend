import { useState, useRef, useEffect, Suspense } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks.js';
import { loadPublication } from '../store/reducers/publication.js';
import Header from './Header.js';
import Contact from './Contact.js';
import Modal from './Modal.js';
import MainComponent from './MainComponent.js';

import { getReview } from '../store/reducers/reviews.js';
import { reviewsRequest } from '../utils/reviewActions.js';

function App() {
  const [mainComponent, setMainComponent] = useState<string>('acceuil');
  const [modalComponent, setModalComponent] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState<boolean>(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [authType, setAuthType] = useState<string>("");
  const [replyTo, setReplyTo] = useState<string>("");
  const [loading, setLoading] = useState(true)
  const [publicationID, setPublicationID] = useState<string>("");
  const [response, setResponse] = useState<boolean>(false);
  const [book, setBook] = useState<string>("");
  const [marketURL, setMarketURL] = useState<string>("");
  
  const headerHeight = 80; // Ajuste à la hauteur réelle de ton header en px
  let pID: string = "";

  const publications = useAppSelector((state) => state.publication.value);
  const dispatch = useAppDispatch();

  const acceuilRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  //Props List
  const msgProps = {successMessage, setSuccessMessage, errorMessage, setErrorMessage};
  const modalProps = {modalComponent, setModalComponent, isModalOpen, setIsModalOpen, isMessageModalOpen, setIsMessageModalOpen, isTextModalOpen,setIsTextModalOpen}
  const screenActionProps = {mainComponent, setMainComponent, acceuilRef, mainRef, contactRef}
  for (const publication of publications) {
    if (publication) pID = publication._id
  }

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/books/publications`)
        const data = await response.json()
        console.log("dataPublication", data)
        dispatch(loadPublication(data.books))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    if (!pID) return
    const fetchReviews = async () => {
      try {
        const rData = { id: pID };
        const response = await reviewsRequest(rData);
        console.log("responseReviewsRequest", response)
        if (response.result) dispatch(getReview(response.reviews));
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchReviews();

  }, [pID])

  return (
    <main className="max-w-screen mx-auto grid grid-rows-[auto_1fr_auto] grid-cols-4 bg-gray-200 min-h-screen">

      {/* Header */}
      <header className="row-start-1 row-end-2 col-start-1 col-end-5 z-10 fixed w-full">
        <Suspense fallback={<div>Chargement...</div>}>
          <Header screenActionProps={screenActionProps}
            modalProps={modalProps}/>
        </Suspense>
      </header>

      {/* Accueil Banderole */}
      <div ref={acceuilRef}
        className={`row-start-1 row-end-2 col-start-1 col-end-5`}
        style={{ paddingTop: `${headerHeight}px` }}>
        <div
          className="w-full flex flex-col justify-center items-center h-[calc(100vh-80px)]  bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: "url(../assets/img/2aaad4_83b9b366fcc24f808c1f0d9beeef546d~mv2.avif)" }}>
          <h1 className="text-7xl text-white">MATIÈRE À PENSER</h1>
          <h2 className="text-1xl mt-4 text-white">
            Site de discussion philosophique et de publication de Jean Christophe Ronnet
          </h2>
        </div>
      </div>

      {/* Main */}
      <MainComponent msgProps={msgProps}
        modalProps={modalProps}
        screenActionProps={screenActionProps}
        setPublicationID={setPublicationID}
        setAuthType={setAuthType}
        setBook={setBook}
        setReplyTo={setReplyTo}
        replyTo={replyTo}
        setMarketURL={setMarketURL}/>

      {/* Footer */}
      <footer ref={contactRef}
        className="row-start-3 row-end-4 col-start-1 col-end-5 pt-24">
        <Suspense fallback={<div>Chargement...</div>}>
          <Contact />
        </Suspense>
      </footer>

      {/* Modals */}
        <Modal modalProps={modalProps}
          msgProps={msgProps}
          screenActionProps={screenActionProps}
          authType={authType}
          setAuthType={setAuthType}
          setResponse={setResponse}
          book={book}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
          publicationID={publicationID}
          marketURL={marketURL}/>
     
      
    </main>
  );
}

export default App;
