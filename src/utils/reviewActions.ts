import { reviewData } from './types.js';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface reviewProps {
    reviewData: reviewData
}

export async function newReview({ reviewData }: reviewProps){
    const { name, mail, title, text, rating } = reviewData
    console.log("reviewData", reviewData)
    try {
        const review = await fetch(`${API_URL}/reviews/newReview`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                mail: mail,
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