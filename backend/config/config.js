import { configDotenv } from "dotenv";
import mongoose from "mongoose";


configDotenv()

export const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database qosuldu');
    }
    catch (error) {
        console.log(error);
    }
}

// MONGO_URI = mongodb+srv://aykhanfmaf107:AAZwhFGe0RNZMbns@cluster0.h03slp9.mongodb.net/
