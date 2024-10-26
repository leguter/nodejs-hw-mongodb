// src/index.js
import express from 'express';
import  pino from 'pino-http';
import cors from 'cors';
import * as contactServices from './services/contacts.js'
const PORT = 3000;
export const setupServer = ()=>{
    const app = express();
    app.use(express.json())
   
    app.get('/contacts', async(req,res)=> {
     const data = await contactServices.getContacts()
     res.json({
        status: 200,
        message: "Successfully find contacts",
        data: data,
    })
    })
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        }
    }),
)
app.use(cors())
    app.get('/contacts/:id', async (req, res)=> {
     const {id} = req.params;
     const data =  await contactServices.getContactsById(id)
if (!data) {
  return   res.status(404).json({
        message: `Contact with ID=${id}, not found`,
    })
}
     res.json({
        status: 200,
        message: "Successfully find contact",
        data,
    })
    })
    app.use('*', (req,res)=>{
        res.status(404).json({
            message:'Not found'
        })
    })
    app.use((err,req,res)=> {
        res.status(500).json({
            message:'Something went wrong',
            error: err.message,
        })
    })
     app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
     })
    }

