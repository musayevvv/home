import { connectDB } from "./config/config.js";
import express, { urlencoded } from 'express'
import cors from 'cors'
import router from "./router/router.js";
connectDB()

const app = express()
app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use(cors('*'))
app.use('/products', router)

app.listen(5000, () => {
    console.log('backend running');
})