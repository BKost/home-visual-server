const express = require("express");

const app = express();

const path = require("path");

// Email
const { transporter } = require("./sendMail");

const notFoundMiddleWare = require("./middleware/notFoundMiddleware");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

const helmet = require("helmet");

// app.use(helmet());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  console.log(req.body);
  const { first_name, last_name, phone, email, message } = req.body;

  if (!first_name || !last_name || !phone || !email || !message) {
    return res
      .status(400)
      .json({ msg: "Prosím vyplňte všetky povinné polia vo formulári." });
  }

  const emailMessage = {
    from: "visual@server",
    to: "brenda.rempel44@ethereal.email",
    subject: `Lead: ${first_name} ${last_name}`,
    text: `${message}`,
    html: `<p >test</p>`,
  };

  try {
    const info = await transporter.sendMail(emailMessage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Sending email error" });
  }

  res.status(200).json({ msg: "Form data sent" });
});

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
