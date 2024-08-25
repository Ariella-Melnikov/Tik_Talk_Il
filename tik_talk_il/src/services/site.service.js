import { remoteService } from './remote.service.js'; // Or './db.service.js' if using local storage

const FORM_KEY = 'formSubmissions'; // Use this key for local storage or to identify the collection in the backend

export const siteService = {
    submitForm,
};

async function submitForm(formData) {
    try {
        // This assumes you're using a remote service. Switch to dbService for local storage.
        const savedForm = await remoteService.submitToGoogleForm(formData);
        return savedForm;
    } catch (error) {
        console.error('Failed to submit form:', error);
        throw error;
    }
}