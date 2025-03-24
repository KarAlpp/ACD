// /api/contact.js veya routes/contact.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Mail gönderici ayarları
const transporter = nodemailer.createTransport({
  service: "gmail", // Örn: Gmail
  auth: {
    user: "gonderen@gmail.com",       // KENDİ gmail adresin
    pass: "uygulama_sifresi",         // Gmail uygulama şifresi (2 adımlı doğrulama varsa gerekli)
  },
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "info@acdstore.com.tr", // Maili alacak adres
    subject: `Yeni İletişim Formu Mesajı - ${name}`,
    text: `
    Gönderen: ${name}
    Email: ${email}
    
    Mesaj:
    ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mail gönderildi" });
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    res.status(500).json({ message: "Mail gönderilirken hata oluştu" });
  }
});

module.exports = router;
