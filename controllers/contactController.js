import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
  const { name, email, message } = req.body;

  const contact = new Contact({
    name,
    email,
    message,
  });

  try {
    await contact.save();

    // Create a transporter to send email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email
    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: 'New Contact Form Submission',
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};