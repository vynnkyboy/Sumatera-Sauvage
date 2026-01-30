import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post("/send-email", async (req, res) => {
    const { email, name, message } = req.body;

    try {
        await transporter.sendMail({
            from: `"Sumatera Sauvage" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Pesan dari ${name}`,
            html: `
                <h3>Pesan Baru</h3>
                <p><b>Email:</b> ${email}</p>
                <p><b>Nama:</b> ${name}</p>
                <p><b>Pesan:</b><br>${message}</p>
            `
        });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

app.listen(3000, () => {
    console.log("📧 Email server running on http://localhost:3000");
});
