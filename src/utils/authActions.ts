import { authData } from "../utils/types.js"
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
// const API_URL =  'http://localhost:4000';

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
        
        console.log("dataResponse", data)

        return data

        // const text = await response.text()
        // try {
        //     const data = JSON.parse(text);
        //     console.log("Parsed JSON:", data);
        // } catch (err) {
        //     console.error("Not JSON:", err);
        // }
        // return text

    } catch (error) {
        return error
    }

}

export async function logOut(profileData: authData) {
    const {token, userId} = profileData
    console.log("profileData", profileData)
    try {
        const logOut = await fetch(`${API_URL}/auths/logout`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                id: userId
            })
        });
        const data = await logOut.json();
        console.log("logOutdata", data)
        return data
    } catch (error) {
        console.error(error);
        return false
    }
}