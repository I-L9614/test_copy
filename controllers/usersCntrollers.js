import { readUsers,writeUsers,readReceipts } from "../utils/readWriteFile.js";
import fs from 'fs/promises'

export async function createNewUser(req, res) {
    try {
    const users = await readUsers()
    const isUser = users.find(user => user.username === req.body.username)
    if (!isUser) {
        const user  = {
            username:req.body.username,
            password:req.body.password
        }
        users.push(user)
        await writeUsers(users)
        res.status(200).json({ message: "User registered successfully", data: users });
    } else {
        res.status(404).json({ msg: "eror:username olready exsist" , data: null })
    }
    } catch (err){
        console.error(err);
        res.status(500).json({ msg: "error" + err.message, data: null });
    }
}

export async function UserPurchaseSummary(req,res) {
    try{
        const userInfo = {
                totalTicketsBought:0,
                events:[],
                averageTicketsPerEvent:0
            }
        const receipts = await readReceipts()
        const userReceipts = receipts.filter(receipt => receipt.username===req.params.username)
        if (userReceipts.length > 0) {
            for (let i = 0;i<userReceipts.length;i++) {
                userInfo.totalTicketsBought += userReceipts[i].ticketsBought
                userInfo.events.push(userReceipts[i].eventName)

            }
            userInfo.averageTicketsPerEvent = userInfo.totalTicketsBought / userInfo.events.length 
            res.status(200).json({ message: "Calculated successfuly:", data: userInfo })
        } else {
            res.status(404).json({ message: "zero eventes has found", data: null })
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ msg: "error" + err.message, data: null })
    }
}

