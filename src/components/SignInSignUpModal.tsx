import SignIn from "./SignIn.js"
import SignUp from "./SignUp.js"

interface modalProps {
    setIsModalOpen: (value: boolean) => any
    isSignIn: boolean
    setIsSignIn: (value: boolean) => any
    isSignUp: boolean
    setIsSignUp: (value: boolean) => any
    setIsMessageModalOpen: (value: boolean) => any
    setErrorMessage : (value : string) => any
    setSuccessMessage: (value : string) => any
}

function SignInSignUpModal ({ setIsModalOpen, isSignIn, setIsSignIn, isSignUp, setIsSignUp, setIsMessageModalOpen, setErrorMessage, setSuccessMessage}: modalProps) {
    return (
        <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20 "
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-xs   " />
          <div className='z-50 w-[20rem]  bg-white rounded-lg overflow-hidden'>
            {isSignIn &&
              <SignIn setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
                setIsSignUp={(value: boolean) => setIsSignUp(value)}
                setIsSignIn={(value: boolean) => setIsSignIn(value)}
                setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
                setErrorMessage= {(value: string) => setErrorMessage(value)}
                setSuccessMessage = {(value: string) => setSuccessMessage(value)}
              />}
            {isSignUp &&
              <SignUp setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
                setIsSignUp={(value: boolean) => setIsSignUp(value)}
                setIsSignIn={(value: boolean) => setIsSignIn(value)}
                setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
                setErrorMessage= {(value: string) => setErrorMessage(value)}
                setSuccessMessage = {(value: string) => setSuccessMessage(value)}
                
              />
            }
            {/* {isAddComment &&
              <AddComments setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
                setIsAddComment={(value: boolean) => setIsAddComment(value)}
              />
            } */}
          </div>
        </div>
    )
}

export default SignInSignUpModal