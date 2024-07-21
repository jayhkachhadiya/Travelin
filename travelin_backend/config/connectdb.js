import mongoose from "mongoose";

const connectdb = async (DATABASE_URL) => {
    try {
        const DB_NAME = {
            dbName: "travelin"
        }
        await mongoose.connect(DATABASE_URL, DB_NAME)
        console.log("connected")
    } catch (error) {
        console.log(error) 
    } 
}

export default connectdb   