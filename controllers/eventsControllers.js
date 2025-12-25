import { readEvents,writeEvents,readUsers } from "../utils/readWriteFile.js";

export async function createEvent(req,res) {
    try {
        const users = await readUsers()
        const isUser = users.find(user => user.username === req.body.username && user.password===req.body.password)
        if (isUser) {
            const events = await readEvents()
            const isExist = events.find(event => event.eventName===req.body.eventName )
            if (!isExist) {
                const event = {
                    eventName:req.body.eventName,
                    ticketsAvailable:parseInt(req.body.ticketsForSale),
                    createdBy:req.body.username
                }
                events.push(event)
                await writeEvents(events)
                res.status(200).json({ message: "Events created successfully", data: users })
            } else {
                res.status(404).json({ msg: "error:event already exist", data: null })
            }
        } else {
            res.status(404).json({ msg: "error:username ro password are wrong", data: null })
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ msg: "error" + err.message, data: null })
    }
}