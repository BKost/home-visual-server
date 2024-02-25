const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const sendEmail = async (req, res) => {
  console.log(req.body);
  const { first_name, last_name, phone, email, message } = req.body;

  if (!first_name || !last_name || !phone || !email || !message) {
    return res
      .status(400)
      .json({ msg: "Prosím vyplňte všetky povinné polia vo formulári." });
  }

  const mailerSend = new MailerSend({
    apiKey: process.env.MAILER_SEND_KEY,
  });

  const sentFrom = new Sender("kontakt@zive-dizajny.sk", "Bohdan Kostúrik");

  const recipients = [new Recipient(email, `${first_name} ${last_name}`)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("3D Vizualizácia - interiér, exteriér")
    .setHtml(
      "<strong>Dobrý deň, Ďakujeme za váš email a čoskoro sa vám ozveme.</strong>"
    )
    .setText(`Dobrý deň, Ďakujeme za váš email a čoskoro sa vám ozveme. `);

  try {
    await mailerSend.email.send(emailParams);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Vyskytla sa chyba !", error });
  }

  res.status(200).json({ msg: "Form data sent" });
};
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "brenda.rempel44@ethereal.email",
//     pass: "mGVHa5V6Gwd3ZfhNfX",
//   },
// });

// const sendEmail = async (req, res) => {
//   console.log(req.body);
//   const { first_name, last_name, phone, email, message } = req.body;

//   if (!first_name || !last_name || !phone || !email || !message) {
//     return res
//       .status(400)
//       .json({ msg: "Prosím vyplňte všetky povinné polia vo formulári." });
//   }

//   const emailMessage = {
//     from: "visual@server",
//     to: "brenda.rempel44@ethereal.email",
//     subject: `Lead: ${first_name} ${last_name}`,
//     text: `${message}`,
//     html: `<p >test</p>`,
//   };

//   try {
//     const info = await transporter.sendMail(emailMessage);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "Sending email error" });
//   }

//   res.status(200).json({ msg: "Form data sent" });
// };

module.exports = { sendEmail };
