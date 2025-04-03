import axios from 'axios';
import toast from 'react-hot-toast';

const FetchIssues = async (setCourseUnits) => {

    const token = localStorage.getItem('token');

    const API_URL = `${process.env.REACT_APP_API_URL}/issues/list/`;

    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            setCourseUnits(response.data)
        }

    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
    }
};

const DeleteIssue = async (id) => {

    const token = localStorage.getItem('token');

    const API_URL = `${process.env.REACT_APP_API_URL}/issues/${id}/delete/`;

    try {
        const response = await axios.delete(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            console.log(response)
        }

    } catch (error) {
        console.error("Delete failed:", error.response?.data || error.message);
    }
};

const UpdateIssue = async (id, data) => {

    const token = localStorage.getItem('token');

    const API_URL = `${process.env.REACT_APP_API_URL}/issues/${id}/update/`;

    try {
        const response = await axios.patch(API_URL, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            console.log(response)
            toast('Updated Issue Successfully', {style: {backgroundColor: 'green', color: 'white'}})
        }

    } catch (error) {
        toast('Issue Update Failed', {style: {backgroundColor: 'red', color: 'white'}})
        console.error("Delete failed:", error.response?.data || error.message);
    }
};
const ResolveIssue = async (id) => {
    const token = localStorage.getItem('token');
    console.log("Token:", token);
    
    const API_URL = `${process.env.REACT_APP_API_URL}/issues/${id}/resolve/`;
    
    try {
        const response = await axios.patch(
            API_URL, 
            {},
            { 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        console.log(response);
        if (response.status === 200) {
            toast('Issue Resolved Successfully', {style: {backgroundColor: 'green', color: 'white'}});
        }
    } catch (error) {
        if (error.message) {
            toast(error.response?.data.error, {style: {backgroundColor: 'red', color: 'white'}});
        } else {
            toast('Issue Update Failed', {style: {backgroundColor: 'red', color: 'white'}});
        }
        console.error("Issue Update Failed:", error.response?.data || error.message);
    }
};


export { FetchIssues, DeleteIssue, UpdateIssue, ResolveIssue }