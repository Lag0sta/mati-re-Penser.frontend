import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const resetPasswordToken = new URLSearchParams(window.location.search).get('token'); // Access the dynamic token from the URL
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
// console.log(router.query.token)
console.log(successMessage)

  function handleResetPassword(e: React.MouseEvent<HTMLButtonElement>) {

    console.log("click")
    e.preventDefault(); // Empêche la soumission du formulaire par défaut

    // Réinitialise les messages d'erreur et de succès
    setError('');
    setSuccessMessage('');

    if (!resetPasswordToken) {
      setError("Token invalide ou expiré.");
      return
    }

    if (!newPassword || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    fetch(`http://localhost:3000/users/resetPassword/${resetPasswordToken}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({newPassword, confirmPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          setError(data.message);
        } else 
          setSuccessMessage('Mot de passe réinitialisé avec succès.');
        }
      )
      .catch((err) => {
        setError('Erreur du serveur. Veuillez réessayer.');
        console.error(err);      
      });
  }

  function returnHome() {
    navigate('/');
  }

  return (
    <div className='h-screen w-screen flex flex-col items-center'>
      <h1 className='m-8'>Reset Password</h1>
      <div className='flex flex-col justify-center items-center '>
        <input type="password" placeholder="Nouveau Mot de passe" onChange={(e) => setNewPassword(e.target.value)} />
        <input type="password" placeholder="Confirmation" onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <div className='m-4 flex flex-col justify-center items-center'>
      <button className='h-8 w-24 rounded-md'
              onClick={handleResetPassword}>Reset Password</button>

      {error && <p className='text-sm text-red-500'>{error}</p>}
      {successMessage && <p className='text-sm text-green-500'>{successMessage}</p>}
      
      </div>
      
      <div>
        <button className='h-8 w-16 rounded-md'
                onClick={returnHome}>Retour</button>
      </div>

    </div>
  );
};

export default ResetPasswordPage;
