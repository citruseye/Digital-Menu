import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "gauripawan.77@gmail.com",
    pass: "lvdljcmzvwimyrre",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to,subject,text,html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'gauripawan.77@gmail.com', // sender address
    to,
    subject: "A greeting mail", // Subject line
    text: "Thank you for ordering from our menu website. Your payment is done and order is accepted. We hope you enjoy your food. HAPPY EATING.", // plain text body
    html
  });


}

export {sendMail};
