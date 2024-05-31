const mongoose = require("mongoose");

const connectDB = async () => {
  const uri =
    "mongodb+srv://divyaprakash:divya123@cluster0.fmaep5a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
