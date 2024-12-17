import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from "dotenv";
dotenv.config();

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});


const sendUserActivity = async (message, secondMessage) => {
try{
    const data = {
        from: 'juelleco@gmail.com',
        to: 'juellecc@gmail.com',
        subject: 'User Activity',
        text: message,
        html: `<h3>${message}</h3><p>${secondMessage}</p>`
    }
    console.log("the data : " , data )
    await mg.messages.create(process.env.MAILGUN_DOMAIN, data)
      .then(msg => console.log("Email sent ", msg)) 
      .catch(err => console.error("The was an error sending the email ", err)); 
}
catch(error){
    console.error(error);
}}

export default sendUserActivity