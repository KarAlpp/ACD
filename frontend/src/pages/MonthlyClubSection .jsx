import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MonthlyClubSection = () => {
  const sectionRef = useRef(null);
  const topImageRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomImageRef = useRef(null);
  const bottomTextRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // Scroll ile opacity ve y animasyonu
    [topImageRef, topTextRef, bottomTextRef, bottomImageRef].forEach((ref) => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Mouse hareketi ile parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = section.getBoundingClientRect();
      const xPos = (clientX - left - width / 2) / width;
      const yPos = (clientY - top - height / 2) / height;

      gsap.to(topImageRef.current, {
        x: xPos * -30,
        y: yPos * -30,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(topTextRef.current, {
        x: xPos * 20,
        y: yPos * 20,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(bottomTextRef.current, {
        x: xPos * -20,
        y: yPos * -20,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(bottomImageRef.current, {
        x: xPos * 30,
        y: yPos * 30,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#eee6f2] py-16 px-4 flex flex-col items-center"
    >
      <div className="w-full max-w-6xl relative z-0">

        {/* ÜST KISIM */}
        <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
          <img
            ref={topImageRef}
            src="/photos/bottom.jpg"
            alt="Top Visual"
            className="rounded-xl w-full md:w-1/2 object-cover"
          />
          <div ref={topTextRef} className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">
              <span className="bg-yellow-300 px-1">Visit</span>  our design studio to experience true craftsmanship
            </h2>
            <p className="text-sm text-gray-800 mb-4">
            You can also visit us in person at our design studio to experience our full collection and speak with our product specialists

            </p>
            <a href="/ContactUs" className="bg-[#5874BF] hover:bg-[#405d96] text-white px-5 py-2 rounded-full text-sm transition">
    CONTACT US
  </a>
          </div>
        </div>

        {/* ALT KISIM */}
        <div className="flex flex-col md:flex-row gap-6 items-end mt-[-60px] relative z-0">
          <div ref={bottomTextRef} className="w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-2">Explore  <span className="bg-yellow-300 px-1">Partner</span> Collections</h2>
<p className="text-sm text-gray-800 mb-4">
  Discover signature pieces crafted by our trusted brand partners — selected to complement our design philosophy and elevate your living space.
</p>
<li>
  <a href="/collections/all?brand=FERMOB" className="bg-[#5874BF] hover:bg-[#405d96] text-white px-5 py-2 rounded-full text-sm transition">
    FIND YOUR PERFECT FIT
  </a>
</li>

          </div>

          <img
            ref={bottomImageRef}
            src="/photos/top.jpg"
            alt="Bottom Visual"
            className="rounded-xl w-full md:w-1/2 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default MonthlyClubSection;
