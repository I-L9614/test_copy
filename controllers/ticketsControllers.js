import { readEvents, readUsers, writeEvents, writeReceipts, readReceipts } from "../utils/readWriteFile.js";

export async function buyTickets(req, res) {
    try {
        const users = await readUsers()
        const isUser = users.filter(user => user.username === req.body.username && user.password === req.body.password)
        if (isUser.length > 0) {
            const events = await readEvents()
            const index = events.findIndex(event => event.eventName === req.body.eventName)
            if (index !== undefined) {
                if (events[index].ticketsAvailable >= req.body.quantity) {
                    events[index].ticketsAvailable = events[index].ticketsAvailable - req.body.quantity
                    await writeEvents(events)
                    const receipts = await readReceipts()
                    receipts.push({ username: req.body.username, eventName: req.body.eventName, ticketsBought: req.body.quantity })
                    await writeReceipts(receipts)
                    res.status(200).json({ message: "Tickets purchased successfully", data: receipts })
                } else {
                    res.status(500).json({ msg: "error:there is not enufgh tickets available:", data: null })
                }
            } else {
                res.status(404).json({ msg: "error:event not exsist", data: null })
            }
        } else {
            res.status(404).json({ msg: "error:user name or password is wrong", data: null })
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "error" + err.message, data: null })
    }
}