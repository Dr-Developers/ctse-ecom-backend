const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true, // Enabling SSL connection
    }).then(() => {
      console.log("MongoDB connected");
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
