import React from "react";
import Epty_Logo from "../../assets/Logo/Logo.png";
export default function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: ["About", "Careers", "Press", "Blog"],
    },
    {
      title: "Resources",
      links: ["Help Center", "Terms", "Privacy", "Status"],
    },
    {
      title: "Contact",
      links: ["Support", "Sales", "Partnerships"],
    },
  ];

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <img src={Epty_Logo} className="rounded w-20 h-10" />
            <p className="text-gray-400">
              AI-powered real estate platform for <br /> modern buyers and
              sellers
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-5 pt-5 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Epty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
