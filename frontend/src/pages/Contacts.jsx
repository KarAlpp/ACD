import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-5xl mx-auto p-24 mt-6">
      {/* Breadcrumb */}
      <nav className="text-gray-500 text-sm mb-4 mt-6">
        <a href="/" className="hover:underline">Home</a> &gt; <span>Contact Us</span>
      </nav>
      
      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Bizimle İletişime Geçin</h2>
          <p className="text-gray-600 mb-4">
            Sorularınız, önerileriniz ya da destek talepleriniz için bizimle her zaman iletişime geçebilirsiniz.
          </p>
          <p className="text-gray-600">
            Email: <a href="mailto:info@acdstore.com.tr" className="text-blue-600 hover:underline">info@acdstore.com.tr</a>
          </p>
          <p className="text-gray-600">
            Telefon: <a href="tel:+905383997158" className="text-blue-600 hover:underline">0538 399 71 58</a>
          </p>
          <p className="text-gray-600">
            Adres: Acarlar Mahallesi, Polonez Bağlantı Yolu Kamer Çıkmazı No:2, Beykoz / İstanbul, Türkiye
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/contact-image.png" // Görselin yolunu buraya güncelle
            alt="Contact Us"
            className="w-64 h-auto"
          />
        </div>
      </div>
      
      {/* Contact Form */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bize Mesaj Gönderin</h3>
        <form className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Adınız</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Adınızı girin" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Adresiniz</label>
            <input type="email" className="w-full p-2 border rounded-md" placeholder="Email adresinizi girin" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mesajınız</label>
            <textarea className="w-full p-2 border rounded-md" rows="4" placeholder="Mesajınızı yazın"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Mesaj Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
