// src/index.js
import express from 'express';
import  pino from 'pino-http';
import cors from 'cors';
// import * as contactServices from './services/contacts.js'
import studentsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
const PORT = 3000;
export const setupServer = ()=>{
    const app = express();
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        }
    }),
)
app.use(express.json())
app.use(cors())
app.use(studentsRouter)
    app.use(notFoundHandler)
    app.use(errorHandler)
     app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
     })
    }

