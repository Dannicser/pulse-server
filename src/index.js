require("dotenv").config();

const express = require("express");

const app = express();
const port = 5000;

const cors = require("cors");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["POST"],
  })
);

app.use(express.json());

app.post("/api/email", async (req, res) => {
  if (!req?.body?.text) {
    return res.status(400).send({
      message: "there is no text to send",
      code: 400,
      error: true,
    });
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.USER,
      to: "qwrerty2016@gmail.com",
      subject: "In Pulse",
      text: req?.body?.text,
    });

    res.status(200).send({
      error: false,
      message: "the text has been sent",
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      error: true,
      message: error,
    });
  }
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
