const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "brenda.rempel44@ethereal.email",
    pass: "mGVHa5V6Gwd3ZfhNfX",
  },
});

module.exports = { transporter };
