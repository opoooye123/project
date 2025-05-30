import mongoose from 'mongoose';


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Succesfully connected to database 😤✅')
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1)
    }
}

export default connectDb