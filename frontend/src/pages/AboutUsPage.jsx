import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto p-24 mt-6">
      {/* Breadcrumb */}
      <nav className="text-gray-500 text-sm mb-4 mt-6">
        <a href="/" className="hover:underline">Home</a> &gt; <span>About Us</span>
      </nav>
      
      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">The Core Program</h2>
          <p className="text-gray-600 mb-4">
            The Core Program has been designed to provide a common academic curriculum for students'
            first semester before they begin courses specific to their departments.
          </p>
          <p className="text-gray-600">
            Underlying the curriculum is the belief that a university should foster creative inquiry in students
            to prepare them for the rapid changes and new challenges in their specific fields and in society as a whole.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/path-to-your-logo.png" // Buraya logo resminin yolunu ekleyin
            alt="Core Program Logo"
            className="w-64 h-auto"
          />
        </div>
      </div>
      
      {/* Team Photo */}
      <div className="mt-16">
        <img
          src="/path-to-your-team-photo.jpg" // Buraya ekibin toplu fotoğrafını ekleyin
          alt="Our Team"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default AboutUs;