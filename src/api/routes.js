import axios from "./axios"

const BASE_URL="/experimentos"

export const createExperiment = (data) => {
    try {
        const response = axios.post(
            `${BASE_URL}/novo`,
            data
        )
        return response.data;   
    } catch (err) {
        console.error("Error creating experiment", err)
        throw err;
    }
}

export const updateExperiment = (id, data) => {
    try {
        const response = axios.patch(
            `${BASE_URL}/${id}`,
            data
        )
        return response.data;   
    } catch (err) {
        console.error("Error saving experiment", err)
        throw err;
    }
}

export const getExperiment = (id) => {
    try {
        const response = axios.get(
            `${BASE_URL}/${id}`,
        )
        return response.data;   
    } catch (err) {
        console.error("Error fetching experiment", err)
        throw err;
    }
}

export const getExperiments = () => {
    try {
        const response = axios.get(
            BASE_URL,
        )
        return response.data;   
    } catch (err) {
        console.error("Error fetching experiments", err)
        throw err;
    }
}

export const deleteExperiment = (id) => {
    try {
        const response = axios.delete(
            `${BASE_URL}/${id}`,
        )
        return response.data;   
    } catch (err) {
        console.error("Error deleting experiments", err)
        throw err;
    }
}