import { propData } from "./types.js";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface newProps {
    propData: propData
}

export async function saveBookInfo({ propData }: newProps) {
    const { titre, text, pseudo, token } = propData
    console.log("propData", propData)
    try {
        const newBookInfo = await fetch(`${API_URL}/books/newBookInfo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                titre: titre,
                text: text,
                pseudo: pseudo,
                token: token
            })
        });
        const response = await newBookInfo.json();
        console.log("responseOfNew", response)
        if (!response.result) return response;
        return response;
    } catch (error) {
        return error;
    }
}