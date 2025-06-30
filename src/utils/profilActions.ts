

import { update } from "../store/reducers/user.js";

export async function changeAvatar(style: string, seed: string, token: string, setErrorMessage: (value: string) => void, dispatch: any) {
    try {
        if (!token) {
            setErrorMessage("Veuillez vous connecter");
            return
        }

        if (!style || !seed) {
            setErrorMessage("Choisissez un avatar");
            return
        }
        
        const response = await fetch(`http://localhost:4000/users/avatar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                avatar: `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`
            }),
        });
        const data = await response.json();
        dispatch(update(data));
        console.log("data", data)


    } catch (error) {
        console.error(error);
    }
}


