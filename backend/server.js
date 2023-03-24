import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import pitchRoutes from "./routes/pitchRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const PORT = process.env.PORT || 4000;

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/pitch", pitchRoutes);
app.use("/api/user", userRoutes);

// Connect to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Connected to: MongoDB and Server started on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
