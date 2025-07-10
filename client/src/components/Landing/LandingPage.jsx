import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import Header from "../Landing/Header";
import Footer from "../Landing/Footer";
import landingImg from "../../assets/landing2.png";

const Landing = () => {
  const [showUploadBtn, setShowUploadBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowUploadBtn(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed flex flex-col min-h-screen w-full bg-white">
      <Header />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-snug">
              Analyze and Visualize Excel Data Effortlessly with{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Sheetly
              </span>
            </h1>

            <p className="text-gray-700 text-lg mb-4">
              Sheetly is your smart companion for turning Excel files into
              clean, interactive, and beautiful visuals charts, graphs, tables,
              and summaries without using any complex tools or writing a single
              line of code.
            </p>

            <p className="text-gray-600 mb-6">
              Whether you're a business analyst, a student, or just trying to
              make sense of data, Sheetly empowers you with the right tools to
              generate insights instantly. Upload your file, and we'll handle
              the rest from parsing and analyzing to dynamic chart generation.
            </p>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:scale-105 transition"
            >
              <UploadCloud className="w-5 h-5" />
              Get Started for Free
            </Link>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={landingImg}
              alt="Excel analytics illustration"
              className="w-full max-w-md mx-auto"
            />
          </motion.div>
        </section>
      </main>

      <Footer />

      {showUploadBtn && (
        <motion.button
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition z-50"
          whileHover={{ scale: 1.1 }}
        >
          <UploadCloud className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
};

export default Landing;

