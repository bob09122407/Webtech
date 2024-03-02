const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// Configuration
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}

// Connecting to the database
connectDatabase(() => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Start the server
  const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening on https://localhost:${process.env.PORT}`);
  });

  // Unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");

    server.close(() => {
      process.exit(1);
    });
  });
});



