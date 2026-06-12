import express from 'express'
import { authRouter } from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { productRouter } from './routes/product.routes.js'

export const app = express()

// CORS Option
const corsOption = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Institute-Code'],
    optionsSuccessStatus: 204,
}



app.use(cors(corsOption))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/auth', productRouter)