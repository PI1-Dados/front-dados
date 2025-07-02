import axios from "./axios"

const BASE_URL="/experimentos"

export const createExperiment = async (data) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/novo`,
            data
        )
        return response.data;   
    } catch (err) {
        console.error("Error creating experiment", err)
        throw err;
    }
}

export const updateExperiment = async (id, data) => {
    try {
        const response = await axios.patch(
            `${BASE_URL}/${id}`,
            data
        )
        return response.data;   
    } catch (err) {
        console.error("Error saving experiment", err)
        throw err;
    }
}

export const getExperiment = async (id) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/${id}`,
        )
        return response.data;   
    } catch (err) {
        console.error("Error fetching experiment", err)
        throw err;
    }
}

export const getExperiments = async () => {
    try {
        const response = await axios.get(
            BASE_URL,
        )
        return response.data;   
    } catch (err) {
        console.error("Error fetching experiments", err)
        throw err;
    }
}

export const deleteExperiment = async (id) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/${id}`,
        )
        return response.data;   
    } catch (err) {
        console.error("Error deleting experiment", err)
        throw err;
    }
}

export const downloadCsv = async (id) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/download-csv/${id}`,
            {
                responseType: 'blob'
            }
        )
        return response.data;   
    } catch (err) {
        console.error("Error deleting experiments", err)
        throw err;
    }
}