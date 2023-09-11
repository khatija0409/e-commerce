//nodemailer to send email
const nodeMailer = require("nodemailer");
//options is the object that is sent a sparameter t this func
const sendEmail = async (options) => {
  //we dont use online mail testeing bcz email wont be sent and we get notif that its sent
  //we use gmail by creating fake id
  const transporter = nodeMailer.createTransport({
    //if gamil doesnt work use this below
    //host of the service taht is gamil
    host: process.env.SMTP_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      //making user from whom mail will be sent
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email, //extracted from options parameter received
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
