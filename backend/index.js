const express = require("express");
const connectDB = require("./config/config");
const userRoutes = require("./router/user.routes");
const authRoutes = require("./router/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

// database connection
const startConnection = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(PORT, () => {
      console.log(`Server is Runing on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(`Database is showing Error ${err.message}`);
  }
};

startConnection();

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//Middleware to handle the error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
