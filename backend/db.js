import mongoose from "mongoose";
async function connectDB() {
  try {
    await mongoose.connect(
      // "mongodb+srv://awaitzz49:Demo123@cluster0.blhgy.mongodb.net/paytm_clone?retryWrites=true&w=majority"
      "mongodb+srv://awaitzz49:Demo123@cluster0.blhgy.mongodb.net/paytm_clone"
    );
    console.log("✅ MongoDB Atlas connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
}
connectDB();
// import mongoose from "mongoose";

// // await mongoose.connect(
// //   "mongodb+srv://awaitzz49:Demo123@cluster0.blhgy.mongodb.net/paytm_clone"
// // );
// import mongoose from "mongoose";
