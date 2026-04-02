import { sUData, sIData, authData, logOutData } from "../types/authActions.js"
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

//fonction pour s'inscrire
export async function signUp(sUData: sUData) {
    const {name, surname, pseudo, email, password, confirmPassword, hp} = sUData

    try {
        const response = await fetch(`${API_URL}/users/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                surname: surname,
                pseudo: pseudo,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                hp: hp
            }),
        });
        const data = await response.json();

        return data
       
    } catch (error) {
        return error
    }
}

//action pour se connecer
export async function signInRequest(sIData : sIData) {
    const {email, password} = sIData

    try {
        const response = await fetch(`${API_URL}/auths/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const data = await response.json();

        return data
    
    } catch (error) {
        return error
    }
}

//action de 2e auth pour sécuriser la modification
export async function authRequest(authData : authData){
        const {token, password} = authData
      
    try {
        const response = await fetch(`${API_URL}/auths/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                password: password,
            }),
        })
        const data = await response.json()
        
        return data

    } catch (error) {
        return error
    }
}

export async function logOutRequest(logOutData : logOutData) {
    const {token, userId} = logOutData
    
    try {
        const logOut = await fetch(`${API_URL}/auths/logout`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                idd: userId
            })
        });
        const data = await logOut.json();

        return data

    } catch (error) {
        console.error(error);
        return false
    }
}