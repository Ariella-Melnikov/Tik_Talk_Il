import axios from 'axios';

export const remoteService = {
    query,
    get,
    remove,
    post,
    put,
    insert,
    submitToGoogleForm,
};

const BASE_URL = 'https://your-backend-api.com/api'; // Replace with your backend API base URL

async function query(collectionName) {
    try {
        const res = await axios.get(`${BASE_URL}/${collectionName}`);
        return res.data;
    } catch (error) {
        handleError(error);
    }
}

async function get(collectionName, id) {
    try {
        const res = await axios.get(`${BASE_URL}/${collectionName}/${id}`);
        return res.data;
    } catch (error) {
        handleError(error);
    }
}

async function remove(collectionName, id) {
    try {
        await axios.delete(`${BASE_URL}/${collectionName}/${id}`);
    } catch (error) {
        handleError(error);
    }
}

async function post(collectionName, item) {
    try {
        const res = await axios.post(`${BASE_URL}/${collectionName}`, item);
        return res.data;
    } catch (error) {
        handleError(error);
    }
}

async function put(collectionName, item) {
    try {
        const res = await axios.put(`${BASE_URL}/${collectionName}/${item._id}`, item);
        return res.data;
    } catch (error) {
        handleError(error);
    }
}

async function insert(collectionName, items) {
    try {
        const res = await axios.post(`${BASE_URL}/${collectionName}/bulk`, items);
        return res.data;
    } catch (error) {
        handleError(error);
    }
}



async function submitToGoogleForm(formData) {
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf7lVBAx-i9KgKHwAzz2HYZYXm9EUQe7Wsi5mwf3OTE69Du6Q/formResponse';
    
    // Map formData to the corresponding Google Form entry IDs
    const formFields = {
        'entry.1564799628': formData.parentFullName,        // Replace with your actual entry ID for Name
        'entry.1636229087': formData.parentEmail,       // Replace with your actual entry ID for Email
        'entry.250051217': formData.parentPhone,       // Replace with your actual entry ID for Phone
        'entry.427496753': formData.kidsAge,     // Replace with your actual entry ID for Kid's Age
        'entry.255221397': formData.isSubscribe ? 'Yes' : '', // Replace with your actual entry ID for Subscribe
    };

    // Prepare the data for submission
    const data = new URLSearchParams();
    for (const key in formFields) {
        if (formFields.hasOwnProperty(key)) {
            data.append(key, formFields[key]);
        }
    }

    try {
        const response = await axios.post(GOOGLE_FORM_URL, data);
        console.log('Form data successfully submitted to Google Form');
        return response;
    } catch (error) {
        console.error('Error submitting data to Google Form:', error);
        throw new Error('Failed to submit form data to Google Form');
    }
}

// Error handling function
function handleError(error) {
    console.error('Error in remote service:', error);
    throw new Error('Failed to communicate with the backend');
}