import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./src/routes/index.js";
import Boom from "boom";
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Database error:", err));

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/", router);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  if (Boom.isBoom(err)) {
    // If it's a Boom error, send the Boom formatted response
    return res.status(err.output.statusCode).json(err.output.payload);
  }

  // Generic error handler for unhandled errors
  return res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
  });
});
