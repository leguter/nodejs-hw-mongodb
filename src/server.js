// src/index.js
import express from 'express';


const PORT = 3000;
export const startServer = ()=>{
    const app = express();
    app.get('/contacts', (req,res)=> {
        res.json({
            message: 'Hello world!', 
        })
    })
    // app.get('/contacts/:contactID', (req, res)=> {
    
    // })
     app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
     })
}
