const { VITE_LOCAL, MODE } = import.meta.env;

import { userService as local } from './user.service.local'
import { userService as remote } from './user.service.remote'

function getEmptyUser(type) {
    return type === 'adult'
      ? { fullName: '', email: '', phone: '', courseType: '', isSubscribe: false, isRead: false }
      : { parentFullName: '', parentEmail: '', parentPhone: '', kidsAge: '', isSubscribe: false, isRead: false }
  }

const service = VITE_LOCAL === 'true' ? local : remote
export const userService = { getEmptyUser, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

// Expose service for debugging in dev mode
if (MODE === 'development') {
    window.userService = userService;
}
