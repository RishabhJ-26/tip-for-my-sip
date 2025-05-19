
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Create a transporter object using Gmail SMTP transport with environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSKEY,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${email}>`, // sender address
      to: process.env.EMAIL_ADDRESS, // receiver address from env variable
      subject: 'New Contact Form Message ', // Subject line
      text: `You have received a new message from your website contact form(Tip for my Sip).\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`, // plain text body
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Message sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 500 });
  }
}
