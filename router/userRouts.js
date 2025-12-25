import express from 'express'
import * as userControllers from '../controllers/usersCntrollers.js'
import * as ticketsControllers from '../controllers/ticketsControllers.js'

const router = express.Router()

router.route('/register')
    .post(userControllers.createNewUser)


router.route('/tickets/buy')
    .post(ticketsControllers.buyTickets)

router.route('/:username/summary')
    .get(userControllers.UserPurchaseSummary)







export default router