import { useState } from "react"
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function forgotPassword() {
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const navigate = useNavigate();

    function returnHome() {
        navigate('/');
    }

    const handleSubmit = async () => {
        try {
            console.log("start", email);
            const response = await fetch(`${API_URL}/auths/forgotPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            console.log("data", data);
            if (data.result) {
                setMessage('Email envoyé pour réinitialisation de mot de passe.');
                console.log('Email envoyé pour réinitialisation de mot de passe.');
            } else {
                setMessage(data.error || 'Une erreur est survenue.');
                console.error(data.error || 'Une erreur est survenue.');
            }
        } catch (error) {
            setMessage('Impossible d’envoyer l’email.');
            console.error('Impossible d’envoyer l’email.', error);
        }

    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-800">
            <div className="bg-blue-800 p-4 rounded-md mb-6">
                <h1 className="text-3xl text-blue-200 font-bold mb-4">Réinitialiser le mot de passe</h1>
            </div>
            <input
                className="h-10 w-56 mt-2"
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className='w-56 flex justify-between mt-1'>
                <button className='h-9 w-20 rounded rounded-md hover:bg-yellow-400 hover:text-white text-sm'
                    onClick={returnHome}>Retour</button>
                <button className="h-9 w-32 rounded rounded-md hover:bg-yellow-400 hover:text-white text-sm"
                    onClick={handleSubmit}>
                    Envoyer
                </button>
            </div>
        </div>
    );
}