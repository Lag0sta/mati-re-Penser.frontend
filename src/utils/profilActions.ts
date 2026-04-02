import { cAData } from "../types/profilActions.js";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function changeAvatarRequest( cAData: cAData ) {
    const {token, style, seed} = cAData
    
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


