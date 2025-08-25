import mongoose from "mongoose";

let isConnected = false; // Track connection status

export default async function dbConnect() {
  if (isConnected) {
    // If already connected, reuse the connection
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("⚠️ Please add your MONGODB_URI to .env.local");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "rentals", // ✅ change DB name if needed
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected:", db.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
}