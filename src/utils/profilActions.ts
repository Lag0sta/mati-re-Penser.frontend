import { profilData } from "./types.js";

interface profilProps {
    profilData : profilData
}

export async function changeAvatar({profilData}: profilProps) {
    const {token, style, seed} = profilData
    
    try {
        const AvatarChange = await fetch(`http://localhost:4000/users/avatar`, {
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


