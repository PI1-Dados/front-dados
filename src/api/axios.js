import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 8000
});