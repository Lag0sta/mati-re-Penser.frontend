import { sBIData, eBTData, eBIData, aSData, eRData} from "../types/newActions.js";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function saveBookInfoRequest( sBIData : sBIData) {
    const { titre, text, pseudo, token } = sBIData

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

        if (!response.result) return response;

        return response;

    } catch (error) {
        return error;
    }
}

export async function editBookTxtRequest( eBTData : eBTData) {
    const { id, text, titre, pseudo, token } = eBTData
    
    console.log("eBTData22", eBTData)
    try {
        const editBookInfo = await fetch(`${API_URL}/books/editBookText`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                text: text,
                titre: titre,
                pseudo: pseudo,
                token: token
            })
        });
        const response = await editBookInfo.json();

        if (!response.result) return response;

        return response;

    } catch (error) {
        return error;
    }
}

export async function editBookImgRequest(eBIData: eBIData) {
    const { id, pseudo, token, img } = eBIData

    try {
        const editBookInfo = await fetch(`${API_URL}/books/editBookImg`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                img: img,
                pseudo: pseudo,
                token: token
            })
        });
        const response = await editBookInfo.json();

        if (!response.result) return response;

        return response;

    } catch (error) {
        return error;
    }
}

export async function editMarketURLRequest(eRData: eRData) {
    const { id, pseudo, token, url } = eRData
    console.log("newAction eRData", eRData)
    try {
        const editBookInfo = await fetch(`${API_URL}/books/editBookMarketURL`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                url: url,
                pseudo: pseudo,
                token: token
            })
        });
        const response = await editBookInfo.json();

        if (!response.result) return response;

        return response;

    } catch (error) {
        return error;
    }
}

export async function archiveStatusRequest(aSData: aSData) {
    const { id, pseudo, token, isArchived } = aSData

    try {
        const editBookMarketURL = await fetch(`${API_URL}/books/archiveStatus`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                isArchived: !isArchived,
                pseudo: pseudo,
                token: token
            })
        });
        const response = await editBookMarketURL.json();

        if (!response.result) return response;

        return response;

    } catch (error) {
        return error;
    }
}

