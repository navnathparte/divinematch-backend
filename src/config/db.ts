import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://DivineMatch:DivineMatch@testing.zsp6ljk.mongodb.net/DivineMatch");
    console.log("MongoDB connected successfully ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err);
  }
};

export default connectDB;
