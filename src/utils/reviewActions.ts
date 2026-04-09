import { nRData, rData } from '../types/reviewActions.js';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


export async function newReviewRequest( nRData : nRData){
    const { book, name, title, text, rating } = nRData

    try {
        const review = await fetch(`${API_URL}/reviews/newReview`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                book: book,
                name: name,
                title: title,
                text: text,
                rating: rating
            })
        })
        const response = await review.json()

        if (!response.result) return response

        return response

    } catch (error) {
        return error
    }
}

export async function reviewsRequest( rData : rData){
    const { id } = rData

    try {
        const review = await fetch(`${API_URL}/reviews/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
            })
        })
        const response = await review.json()

        if (!response.result) return response

        return response

    } catch (error) {
        return error
    }
}