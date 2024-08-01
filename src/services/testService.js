import axios from 'axios';

// Base URL for your API
const API_URL = 'http://localhost:8000/api/tests';

export const fetchTestById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
