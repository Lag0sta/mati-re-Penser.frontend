import { profilData } from "./types.js";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface profilProps {
    profilData : profilData
}

export async function changeAvatar({profilData}: profilProps) {
    const {token, style, seed} = profilData
    
    try {
        const AvatarChange = await fetch(`${API_URL}/users/avatar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                avatar: `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`
            }),
        });
        const data = await AvatarChange.json();
        
        return data 

    } catch (error) {
        console.error(error);
        return false
    }
}


