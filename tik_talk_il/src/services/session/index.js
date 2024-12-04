const { VITE_LOCAL, MODE } = import.meta.env

import { sessionService as local } from './session.service.local.js'
import { sessionService as remote } from './session.service.remote.js'

const service = VITE_LOCAL === 'true' ? local : remote

export const sessionService = { ...service }

if (MODE === 'development') {
    window.sessionService = sessionService
}