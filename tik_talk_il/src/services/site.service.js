import { remoteService } from './remote.service.js'; // Or './db.service.js' if using local storage

const FORM_KEY = 'formSubmissions'; // Use this key for local storage or to identify the collection in the backend

export const siteService = {
    submitForm,
    getSubmissions, 
};

let submissions = [];

async function submitForm(formData) {
    submissions.push(formData); // Store form data in memory
    return Promise.resolve();
}

async function getSubmissions() {
    return Promise.resolve(submissions); // Return stored submissions
}