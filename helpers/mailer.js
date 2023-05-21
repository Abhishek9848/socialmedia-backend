const nodemailer = require('nodemailer')
const fs = require("fs").promises;
const path = require("path");
const handlebars = require("handlebars");
const relativeTemplatePath = "../email.html";

exports.sendVerificationEmail = async (email, name, url) => {
    try {
        const templatePath = path.join(__dirname, relativeTemplatePath);
        const templateFile = await fs.readFile(templatePath, 'utf-8');
        const template = handlebars.compile(templateFile);
        const replacements = {
            username: name,
            url
        };
        const finalHtml = template(replacements);
        const smtp = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: "Social media email verification",
            html: finalHtml,
        }
        console.log("mail to  --->>" , mailOptions.to)
        smtp.sendMail(mailOptions, (err, res) => {
            if (err) return err;
            console.log("Email Response -->>", { success: true, message: 'Mail sent', response: res.response })
            return res;
        })
    } catch (err) {
        createError(400, err)
        return
    }
}