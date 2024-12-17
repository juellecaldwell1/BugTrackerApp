import React, { useEffect } from "react";
import phone from "../../assets/images/home/phone.png";
import "./Navigator.css";
import { gsap } from "gsap";

const Navigation = () => {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    tl.fromTo(
      ".hero-heading span",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2 }
    );

    tl.fromTo(
      ".dashboard-image",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, rotation: 10, ease: "bounce.out" },
      "-=0.5"
    );


    gsap.to(".hero-img-bg-grad", {
      scale: 1.4,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });


    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.3, delay: 1 }
    );

    gsap.fromTo(
      ".navigator-signup-btn",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.2, delay: 0.5 }
    );
  }, []);

  return (
    <div className="navigator bg-gradient-to-br from-black via-purple-500 to-purple-500 text-white min-h-screen">

      <header className="navigator-header flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold">BugTracker</h1>
        <div className="navigator-header-links space-x-4">
          <a
            href="/user/login"
            className="navigator-signup-btn bg-white text-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition duration-300"
          >
            Login
          </a>
          <a
            href="/user/register"
            className="navigator-signup-btn bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </header>


      <section className="hero-section text-center px-6 py-20">
        <div className="hero-content max-w-3xl mx-auto">
          <h1 className="hero-heading text-5xl font-extrabold leading-tight">
            <span className="block">Effortlessly</span>
            <span className="block">Track Your Bugs</span>
            <span className="block">With Precision</span>
          </h1>
          <p className="hero-description text-lg mt-6">
            Streamline bug reporting and management with our intuitive bug tracker.
            Keep your team organized and solve issues faster.
          </p>
          <div className="mt-8">
            <a
              href="/user/register"
              className="navigator-signup-btn bg-indigo-500 px-6 py-3 rounded-lg text-lg font-bold hover:bg-indigo-600 transition duration-300"
            >
              Get Started Now
            </a>
          </div>
        </div>


        <div className="dashboard-container relative mt-12">
          <div className="hero-img-bg-grad absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-700 blur-lg rounded-lg"></div>
          <img
            src={phone}
            alt="Bug Tracker Dashboard"
            className="dashboard-image mx-auto shadow-lg rounded-lg"
          />
        </div>
      </section>

      <section className="features-section bg-white text-gray-800 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Why Choose BugTracker?</h2>
          <p className="mb-12">
            Designed for efficiency, our platform offers these key features:
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-bold mb-4">Intuitive Dashboard</h3>
              <p>Manage bugs effortlessly with our user-friendly interface.</p>
            </div>
            <div className="feature-card p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-bold mb-4">Customizable Reports</h3>
              <p>Generate detailed reports tailored to your team's needs.</p>
            </div>
            <div className="feature-card p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-bold mb-4">Real-Time Collaboration</h3>
              <p>Keep your team aligned with instant updates and notifications.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navigation;
