const nodemailer = require('nodemailer');
const ContactMessage = require('../models/usermessage');

async function contactHandler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    if (!name, !email, !subject, !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      // Save data to MongoDB
      const contactMessage = new ContactMessage({ name, email, subject, message });
      await contactMessage.save();

      // Send confirmation email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Message Received',
        text: 'Thank you for contacting us! We have received your message and will get back to you soon.',
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

module.exports = contactHandler;
