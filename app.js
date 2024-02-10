const express = require("express");

require("dotenv").config();

const app = express();

const path = require("path");

// Email
const { sendEmail } = require("./sendMail");

const notFoundMiddleWare = require("./middleware/notFoundMiddleware");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

const helmet = require("helmet");

app.use(helmet());
app.use(express.json());

app.post("/api/contact", sendEmail);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(express.static("./dist"));

// Not Found
app.use(notFoundMiddleWare);

// Error handler
app.use(errorHandlerMiddleware);

const start = async () => {
  const port = process.env.PORT || 3500;

  try {
    app.listen(port, console.log(`App is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
