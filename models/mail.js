const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text, html) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
            user: 'ars.systm.info@gmail.com', 
            pass: 'goiya@ars' 
        }
    });

    let info = await transporter.sendMail({
        from: 'ars.systm.info@gmail.com', 
        to, 
        subject, 
        text, 
        html 
    });

    console.log(info);
}

module.exports = sendMail