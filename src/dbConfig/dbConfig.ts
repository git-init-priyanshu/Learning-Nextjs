import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected sucessfully");
    });

    connection.on("error", () => {
      console.log("MongoDB connection eror: Make sure MongoDB is running");
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
  }
}
