import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Upon successful connection, log the host of the connected database
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs during connection, log the error and exit the process
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
