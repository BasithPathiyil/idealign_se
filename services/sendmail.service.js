const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "basithpathiyil007@gmail.com",
    pass: "capjtqddpthnmusf",
  },
});

const sendContactMail = async (body, res) => {
  const { fullName, email, project, mobile, message } = body;
  const mailOptions = {
    from: "basithpathiyil007@gmail.com",
    to: "basithpathiyil7@gmail.com",
    subject: "New Form Submission",
    text: `Full Name: ${fullName}
    Email: ${email}
    Project: ${project}
    Mobile: ${mobile}
    Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
};

const sendSubscriptonMail = async (body, res) => {
  const { email } = body;
  const mailOptions = {
    from: "basithpathiyil007@gmail.com",
    to: "basithpathiyil7@gmail.com",
    subject: "New Email Subscription",
    text: `
    Email: ${email}
   `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
};

module.exports = {
  sendContactMail,
  sendSubscriptonMail,
};
