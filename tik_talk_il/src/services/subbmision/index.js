const { VITE_LOCAL, MODE } = import.meta.env;

import { submissionService as local } from './sub.service.local'
import { submissionService as remote } from './sub.service.remote'

function getEmptySubmission(type) {
    return type === 'adult'
      ? { fullName: '', email: '', phone: '', courseType: '', isSubscribe: false, isRead: false }
      : { parentFullName: '', parentEmail: '', parentPhone: '', kidsAge: '', courseType: '', isSubscribe: false, isRead: false }
  }

const service = VITE_LOCAL === 'true' ? local : remote
export const submissionService = { getEmptySubmission, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

// Expose service for debugging in dev mode
if (MODE === 'development') {
    window.submissionService = submissionService;
}
