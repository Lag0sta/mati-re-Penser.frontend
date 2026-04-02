import { nRData } from '../types/reviewActions.js';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


export async function newReviewRequest( nRData : nRData){
    const { name, title, text, rating } = nRData
    console.log("reviewData", nRData)
    try {
        const review = await fetch(`${API_URL}/reviews/newReview`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                title: title,
                text: text,
                rating: rating
            })
        })
        const response = await review.json()
        console.log("ReviewResponse", response)

        if (!response.result) return response

        return response

    } catch (error) {
        return error
    }
}