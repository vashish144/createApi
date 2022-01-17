import express from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.js";

const userRouter = express.Router();

userRouter.get("/get", async (req, res, next) => {
  const result = await User.find().exec();
  if (result) {
    res.json(result);
  } else {
    res
      .status(404)
      .send({ message: "Something went wrong. Please try later." });
  }
});

userRouter.post("/post", async (req, res, next) => {
  const newUser = new User({
    userName: req.body.userName,
    emailId: req.body.emailId,
    password: bcryptjs.hashSync(req.body.password, 10),
  });
  const createdUser = await newUser.save();
  if (createdUser) {
    res.send({ message: "User created" });
  } else {
    res.status(500).send({ message: "User cannot be created." });
  }
});

userRouter.put("/put/:id", async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    (User.userName = req.body.userName),
      (User.emailId = req.body.emailId),
      (User.password = req.body.password);
  }
  const updatedUser = await user.save();
  if (updatedUser) {
    res.send({ message: "User updated" });
  } else {
    res.status(500).send({ message: "User not found" });
  }
});

userRouter.delete("/delete/:id", async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    const deletedUser = await user.remove();
    res.send({ message: "User deleted" });
  } else {
    res.status(500).send({ message: "User not found" });
  }
});

userRouter.post("/login", async (req, res, next) => {
  const user = await User.findOne({ emailId: req.body.emailId });
  if (user) {
    if (bcryptjs.compareSync(req.body.password, user.password)) {
      res.send("Loing Successfully...");
    } else {
      res.status(500).send("Enter Valid Credential");
    }
  } else {
    res.status(500).send("user not found");
  }
});

export default userRouter;
