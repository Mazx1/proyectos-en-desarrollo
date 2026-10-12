import mongoose from "mongoose";
import 'dotenv/config';

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

const uri = process.env.MONGODB_URI;
console.log('URI:', uri?.replace(/:([^:@]+)@/, ':****@'));
console.log('Largo de la URI:', uri?.length);

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://manuelzarate1988:manuelzarate@cluster0.mqtvixy.mongodb.net/Cluster0")
        console.log("Database connected");
    }catch (error) {
        console.log(error);
    }
}; 

