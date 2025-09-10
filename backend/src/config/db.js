import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connect DB successfully");
  } catch (error) {
    console.error("Failed to connect DB: ", error);
    process.exit(1); // fail status (0: success, 1: fail)
  }
};
