import { tTData, lockTData, editTData, newTData } from '../types/topicActions.js';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


export async function topicsRequest() {
    try {
        const response = await fetch(`${API_URL}/topics/topicsWithThreadCounts`)
        return response.json()
    } catch (error) {
        console.error(error)
    }
}