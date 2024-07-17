const nodemailer = require("nodemailer");
const { USER_PASS, USER_EMAIL } = process.env;


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: USER_EMAIL,
    pass: USER_PASS,
  },
});


async function main(email, token) {
 
    const info = await transporter.sendMail({
      from: '"Forgot Password 👻" <maddison53@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: "Forgot Password  ✔", // Subject line
      html: `
      <b>Ingresa a este enlace para cambiar tu contraseña</b> 
      <a href="http://localhost:5173/new-password/${token}">Cambiar Contraseña</a>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
}


module.exports = main;
