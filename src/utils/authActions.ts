interface handleSignUpProps {
    setErrorMessage: (value: string) => void;
    setSuccessMessage: (value: string) => void;
    setIsModalOpen: (value: boolean) => void;
    setIsSignUp: (value: boolean) => void;
    setIsSignIn: (value: boolean) => void;
    setIsMessageModalOpen: (value: boolean) => void;
    name: string;
    setName: (value: string) => void;
    surname: string;
    setSurname: (value: string) => void;
    pseudo: string;
    setPseudo: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    confirmPassword: string;
    setConfirmPassword: (value: string) => void;
}

export async function handleSignUpAction({ setErrorMessage, setSuccessMessage, setIsModalOpen, setIsSignUp, setIsSignIn, setIsMessageModalOpen, name, setName, surname, setSurname, pseudo, setPseudo, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }: handleSignUpProps) {
    //réinitialisation des messages
    setErrorMessage("")
    setSuccessMessage("")

    //vérifications que les champs soient bien remplis
    if (!name || !surname || !pseudo || !email || !password || !confirmPassword) {
        setErrorMessage("Veuillez remplir tous les champs avec un *");
        setIsMessageModalOpen(true);
        return;
    }

    //vérifications que les mots de passe correspondent
    if (password !== confirmPassword) {
        setErrorMessage("Les mots de passe ne correspondent pas");
        setIsMessageModalOpen(true);

        return;
    }


    try {
        const response = await fetch("http://localhost:4000/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                surname: surname,
                pseudo: pseudo,
                email: email,
                password: password,
            }),

        });
        const data = await response.json();

        if (data.result) {
            setName("");
            setSurname("");
            setPseudo("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setSuccessMessage("Votre compte a bien été créé.");
            setIsMessageModalOpen(true);

        } else {
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
            setIsMessageModalOpen(true);

        }
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        setErrorMessage("Erreur réseau. Veuillez réessayer plus tard.");
        setIsMessageModalOpen(true);
    }
}

interface handleSignInActionProps {
    setErrorMessage: (value: string) => void;
    setSuccessMessage: (value: string) => void;
    setIsMessageModalOpen: (value: boolean) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
}

export async function handleSignInAction({setErrorMessage, setSuccessMessage, email, setEmail, password, setPassword, setIsMessageModalOpen} : handleSignInActionProps) {
    //réinitialisation des messages
    setErrorMessage("")
    setSuccessMessage("")

    //vérifications que les champs soient bien remplis
    if (!email || !password) {
        setErrorMessage("Veuillez remplir tous les champs");
        setIsMessageModalOpen(true);
        return;
    }

    try{
        const response = await fetch ("http://localhost:4000/users/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const data = await response.json();

        if (data.result) {
            setSuccessMessage("Bonjour " + data.pseudo);
            setIsMessageModalOpen(true);
        } else {
            setErrorMessage("mauvais identifiants");
            setIsMessageModalOpen(true);
        }
    } catch (error) {
        setErrorMessage("Erreur réseau. Veuillez réessayer plus tard.");
        setIsMessageModalOpen(true);
    }
    
    
}