import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
const port = process.env.port || 8080;
import productRouter from "./routers/productRoutes.js";
import uploadRouter from "./routers/uploadRouter.js";
import userRouter from "./routers/userRoutes.js";

const app = express();
app.use("/uploads", express.static(path.join("uploads")));

app.use(bodyParser.json());
const db =
  "mongodb+srv://admin:admin@cluster0.b1q1k.mongodb.net/Lear?retryWrites=true&w=majority";
mongoose
  .connect(db)
  .then((res) => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error in conneting DB", err);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, POST, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// app.use('/api/uploads', uploadRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
});

app.listen(port, () => {
    console.log(`Rest api is running on port no ${port}...`);
  });
