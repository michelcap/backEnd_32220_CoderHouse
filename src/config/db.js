import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

let uri = process.env.MONGO_URI;

mongoose.set('strictQuery', false);
mongoose.connect(uri, (err) => {
    if (err) {
        console.log('Error: ', err)
    } else {
        console.log(' 🚀 Conectado a MongoDB Ecommerce')
    }
})