import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connect from "./schemas";
import userRouter from "./routes/user";
import diaryRouter from "./routes/diary";

const app = express();

dotenv.config();
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/user", userRouter);
app.use("/api/diary", diaryRouter);

app.listen(process.env.PORT, () => {
  console.log(`서버 가동중 http://localhost:${process.env.PORT}`);
  process.send("ready");
});

process.on("SIGINT", () => {
  app.close(() => {
    console.log("server closed");
    process.exit(0);
  });
});
