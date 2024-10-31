import { remoteService } from '../remote.service.js';
import { storageService } from '../async-storage.service.js';
import { utilService } from '../util.service.js';

const ADULT_STORAGE_KEY = 'adult_submissions'
const KIDS_STORAGE_KEY = 'kids_submissions'

export const submissionService = {
    submitAdultForm,
    submitKidsForm,
    getAdultSubmissions,
    getKidsSubmissions,
    getSubmissions,
    getById,
    remove,
    save,
    addSubmissionManually,
  }
  
  // Manually keep in-memory arrays for quicker access
  let adultSubmissions = []
  let kidsSubmissions = []
  
  // Submit adult form data
  async function submitAdultForm(formData) {
    // Save the form data to the storage service
    await storageService.post(ADULT_STORAGE_KEY, formData)
    adultSubmissions.push(formData) // Update the in-memory array
    return Promise.resolve()
  }
  
  // Submit kids form data
  async function submitKidsForm(formData) {
    await storageService.post(KIDS_STORAGE_KEY, formData)
    kidsSubmissions.push(formData)
    return Promise.resolve()
  }
  
  // Get adult submissions from local storage and update in-memory array
  async function getAdultSubmissions() {
    adultSubmissions = await storageService.query(ADULT_STORAGE_KEY)
    return Promise.resolve(adultSubmissions)
  }
  
  // Get kids submissions from local storage and update in-memory array
  async function getKidsSubmissions() {
    kidsSubmissions = await storageService.query(KIDS_STORAGE_KEY)
    return Promise.resolve(kidsSubmissions)
  }
  
  // Get submissions (both adult and kids) based on filterBy criteria
  async function getSubmissions(filterBy = { term: '' }) {
    let adultResults = await storageService.query(ADULT_STORAGE_KEY)
    let kidsResults = await storageService.query(KIDS_STORAGE_KEY)
  
    const { term } = filterBy
    if (term) {
      const regex = new RegExp(term, 'i')
      adultResults = adultResults.filter(submission => regex.test(submission.fullName))
      kidsResults = kidsResults.filter(submission => regex.test(submission.parentFullName))
    }
  
    return [...adultResults, ...kidsResults] // Return combined results
  }
  
  // Get a specific submission by ID from the respective storage
  async function getById(submissionId, type ) {
    const storageKey = type === 'adult' ? ADULT_STORAGE_KEY : KIDS_STORAGE_KEY
    return storageService.get(storageKey, submissionId)
  }
  
  // Remove a submission by ID
  async function remove(submissionId, type ) {
    const storageKey = type === 'adult' ? ADULT_STORAGE_KEY : KIDS_STORAGE_KEY
    await storageService.remove(storageKey, submissionId)
  }
  
  // Save a submission (add new or update existing) based on type (adult or kids)
  async function save(submission, type ) {
    const storageKey = type === 'adult' ? ADULT_STORAGE_KEY : KIDS_STORAGE_KEY
    let savedSubmission
  
    if (submission._id) {
      // Update existing submission
      savedSubmission = await storageService.put(storageKey, submission)
    } else {
      // Add new submission
      submission._id = utilService.makeId() // Create a unique ID for the submission
      savedSubmission = await storageService.post(storageKey, submission)
    }
  
    // Update in-memory arrays based on the type
    if (type === 'adult') {
      adultSubmissions = await storageService.query(ADULT_STORAGE_KEY)
    } else {
      kidsSubmissions = await storageService.query(KIDS_STORAGE_KEY)
    }
  
    return savedSubmission
  }
  
  // Manually add a new submission (to simulate adding without form submission)
  async function addSubmissionManually(submissionData, type) {
    const storageKey = type === 'adult' ? ADULT_STORAGE_KEY : KIDS_STORAGE_KEY
    const newSubmission = {
      _id: utilService.makeId(),
      ...submissionData,
      isSubscribe: false,
      isRead: false,
    }
  
    const savedSubmission = await storageService.post(storageKey, newSubmission)
  
    // Update the in-memory arrays based on the type
    if (type === 'adult') {
      adultSubmissions.push(savedSubmission)
    } else {
      kidsSubmissions.push(savedSubmission)
    }
  
    return savedSubmission
  }
  
