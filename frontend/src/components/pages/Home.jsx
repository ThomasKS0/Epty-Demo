import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "../ui/Button";
import heroImage from "../../assets/mashions/mashion1.jpg";
import MapPage from "./MapPage";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src={heroImage}
          alt="Modern home"
          className="w-full h-[70vh] object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find Your Dream Property
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Our AI-powered platform helps you discover properties that match
              your lifestyle and budget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/search")}
                className="bg-blue-600 text-white hover:bg-blue-700 font-bold cursor-pointer"
              >
                Browse Properties
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-white text-gray-900 font-bold hover:bg-gray-100 cursor-pointer"
              >
                List Your Property
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Epty
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "AI-Powered Search",
                desc: "Our algorithms learn your preferences to show the most relevant properties",
              },
              {
                icon: "📊",
                title: "Market Insights",
                desc: "Get real-time data on pricing trends and neighborhood stats",
              },
              {
                icon: "🔒",
                title: "Secure Transactions",
                desc: "BankID verified users and blockchain-backed contracts",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-lg bg-gray-50"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
<MapPage/>
    </>
  );
}
