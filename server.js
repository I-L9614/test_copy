import express from 'express';
import userRouter from './router/userRouts.js';
import creatorRout from './router/creatorRout.js';


const app = express() 
const PORT = 8000

app.use(express.json())

app.use('/users',userRouter)
app.use('/creator',creatorRout)



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})