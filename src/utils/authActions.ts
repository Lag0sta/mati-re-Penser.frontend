import { authData } from "../utils/types.js"
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface authProps {
    authData : authData  
}

//fonction pour s'inscrire
export async function signUp({ authData }: authProps) {
    const {name, surname, pseudo, email, password, confirmPassword, hp} = authData

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
        console.log("data", data)

        return data
       
    } catch (error) {
        return error
    }
}

//action pour se connecer
export async function signIn({ authData }: authProps) {
    const {email, password} = authData

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
        console.log("data", data)

        return data
    
    } catch (error) {
        return error
    }
}

//action de 2e auth pour sécuriser la modification
export async function auth({ authData, }: authProps){
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