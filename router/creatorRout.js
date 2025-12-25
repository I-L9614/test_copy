import express from 'express'
import * as eventsControllers from '../controllers/eventsControllers.js'

const router = express.Router()


router.route('/events')
    .post(eventsControllers.createEvent)


export default router