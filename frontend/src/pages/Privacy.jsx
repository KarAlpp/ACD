import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white bg-[#1A1A1A] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 border-b border-gray-700 pb-2">Privacy Policy</h1>

      <p className="text-sm text-gray-400 mb-6">Last Updated: March 24, 2025</p>

      <p className="mb-4">
        At <strong>ACD STORE</strong>, we value your privacy and are committed to protecting your
        personal information. This Privacy Policy outlines how we collect, use, share, and safeguard
        your data when you use our website and services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 text-gray-300">
        <li>Full name</li>
        <li>Email address</li>
        <li>Shipping and billing addresses</li>
        <li>Phone number</li>
        <li>Payment information (processed securely via third-party providers)</li>
        <li>IP address and browser data (via cookies and analytics tools)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 text-gray-300">
        <li>Processing and delivering your orders</li>
        <li>Providing customer support</li>
        <li>Sending promotional emails and updates (if you opt in)</li>
        <li>Improving our website and shopping experience</li>
        <li>Ensuring legal and security compliance</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell your personal data. We only share your information with:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-300">
        <li>Trusted third-party service providers (e.g., payment processors, shipping partners)</li>
        <li>Legal authorities if required by law</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies & Tracking</h2>
      <p className="mb-4">
        Our website uses cookies to:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-300">
        <li>Remember your preferences and cart items</li>
        <li>Analyze website traffic</li>
        <li>Personalize your shopping experience</li>
      </ul>
      <p className="mb-4">
        You can control cookie preferences through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your information, including SSL
        encryption and secure payment gateways. However, no method is 100% secure, and we encourage
        you to protect your passwords and devices.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
      <ul className="list-disc list-inside mb-4 text-gray-300">
        <li>Access, update, or delete your personal data</li>
        <li>Opt-out of marketing communications</li>
        <li>Request a copy of the data we store about you</li>
      </ul>
      <p className="mb-4">
        To exercise your rights, please contact us at <a href="mailto:support@acdstore.com" className="underline">support@acdstore.com</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. All changes will be posted on this page
        with an updated revision date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us:
      </p>
      <p className="mt-2">
        <strong>ACD STORE</strong><br />
        Email: <a href="mailto:support@acdstore.com" className="underline">support@acdstore.com</a>
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;