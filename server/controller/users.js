import express from "express";
import db from "../database/connect.js";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;

router.post("/register", async (req, res) => {
  try {
    const userExists = await db.Users.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      res.status(400).send("User already exists");
      return;
    }
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    new db.Users({
      username,
      email,
      password: hashedPassword,
    }).save();
    res.send("User created");
  } catch {
    res.status(400).send("Registration successful");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await db.Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(401).send("User not found");
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.loggedIn = true;
      res.json({ message: "User logged in", user: user.username });
    } else {
      res.status(401).send("Login unsuccessful");
    }
  } catch (error) {
    console.log(error);
    res.status(418).send("Server error");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("User logged out");
});

export default router;
