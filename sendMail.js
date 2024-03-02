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

  const sentFrom = new Sender("email@zive-dizajny.sk", "zive-dizajny.sk");

  // const replyTo = new Sender("zive.dizajny@gmail.com", "Bohdan Kostúrik");

  const recipients = [new Recipient(email, `${first_name} ${last_name}`)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("3D Vizualizácia - interiér, exteriér")
    .setHtml(
      ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">   
</head>
<body>
    <div> <p><strong>Dobrý deň,</strong></p></div>
       
        <div><p>Čoskoro sa vám ozveme.</p></div>
        
    
</body>
</html>
`
    )
    .setText("Čoskoro sa vám ozveme.");

  const businessRecipients = [
    new Recipient("zive.dizajny@gmail.com", "Bohdan Kostúrik"),
  ];

  const sentFromCustomer = new Sender(
    "email@zive-dizajny.sk",
    `${first_name} ${last_name}`
  );

  const formData = new EmailParams()
    .setFrom(sentFromCustomer)
    .setTo(businessRecipients)
    .setReplyTo(sentFrom)
    .setSubject(`Správa - ${first_name} ${last_name}`)
    .setHtml(
      ` <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
      <div>
      <h3>Meno</h3>
      <strong><p>${first_name} ${last_name}</p></strong>
      <h3>Správa</h3>
          <p>${message}</p>
      <h3>Kontakt</h3>
          <p>Mobil: ${phone}</p>
          <p>Email: ${email}</p>
      </div>
  </body>
  </html>
  `
    )
    .setText(`New message from ${first_name} ${last_name}`);

  try {
    await mailerSend.email.send(formData);

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
