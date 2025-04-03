import axios from 'axios';

const FetchUser = async (id, setUserLoginData) => {

    const token = localStorage.getItem('token');

    const API_URL = `${process.env.REACT_APP_API_URL}/user/${id}`;

    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            console.log(response.data)
            setUserLoginData(response?.data)
        }
        
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
    }
};

const FetchUserOnLogin = async (id) => {

    console.log(id)

    const token = localStorage.getItem('token');

    const API_URL = `${process.env.REACT_APP_API_URL}/user/${id}`;

    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return(response)
        }
        
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
    }
};

export { FetchUser, FetchUserOnLogin };