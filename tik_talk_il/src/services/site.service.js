import { remoteService } from './remote.service.js'; // Or './db.service.js' if using local storage

const FORM_KEY = 'formSubmissions'; // Use this key for local storage or to identify the collection in the backend

export const siteService = {
    submitAdultForm,
    submitKidsForm,
    getAdultSubmissions,
    getKidsSubmissions, 
};

let adultSubmissions = [];
let kidsSubmissions = [];

async function submitAdultForm(formData) {
    adultSubmissions.push(formData); // Store form data in the adult submissions array
    return Promise.resolve();
}

async function submitKidsForm(formData) {
    kidsSubmissions.push(formData); // Store form data in the kids submissions array
    return Promise.resolve();
}

async function getAdultSubmissions() {
    return Promise.resolve(adultSubmissions); // Return adult submissions
}

async function getKidsSubmissions() {
    return Promise.resolve(kidsSubmissions); // Return kids submissions
}