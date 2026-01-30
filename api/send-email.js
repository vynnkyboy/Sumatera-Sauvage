import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Sumatera Sauvage" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Pesan dari Website",
      text: `Nama: ${name}\nEmail: ${email}\nPesan: ${message}`,
      replyTo: email
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Gagal mengirim email" });
  }
}
