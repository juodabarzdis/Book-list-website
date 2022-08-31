import express from "express";
import books from "./controller/books.js";
import users from "./controller/users.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.set("trust proxy", 1); // trust first proxy if 0 then it will not trust any proxy
app.use(
  session({
    name: "session",
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // only send cookie over https if true
      maxAge: 6000000,
    },
  })
);

app.use("/api/books/", books);
app.use("/api/users/", users);

app.listen(3000);
