import React from "react";
import { Heart, Phone, Mail, MapPin, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 overflow-hidden">
      <div className="relative xl:max-w-[1440px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-xl shadow-lg">🩸</div>
              <div>
                <h2 className="text-2xl lg:leading-[40px] font-bold text-gray-800">
                  LifeDrop
                </h2>
                <p className="text-sm text-red-600 font-medium">
                  Every drop counts
                </p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Join our mission to save lives through blood donation. Together,
              we can make a difference in someone's life.
            </p>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              {[
                { icon: Facebook, link:"https://www.facebook.com/aminul.islam.arnob.2025", color: "hover:bg-blue-500" },
                { icon: Linkedin, link:"https://www.linkedin.com/in/aminul-islam-arnob-571a7a314/", color: "hover:bg-sky-500" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className={`p-3 bg-white rounded-xl shadow-md text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="font-bold text-gray-800 text-lg">Quick Access</h3>
            <div className="space-y-[20px]">
                <a
                  href="/donate"
                  className="block text-gray-600 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
                >
                  Donate Blood
                </a>
                <a
                  href="/request"
                  className="block text-gray-600 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
                >
                  Post Blood Request
                </a>
                <a
                  href="/donors"
                  className="block text-gray-600 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
                >
                  Find Donors
                </a>
                <a
                  href="/chat"
                  className="block text-gray-600 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
                >
                  Inbox
                </a>
                <a
                  href="/appointment/status"
                  className="block text-gray-600 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
                >
                  Appointment
                </a>
                <a
                  href="mailto:aiarnob23@gmail.com"
                  className="block text-gray-600 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
                >
                  Contact an Admin
                </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="font-bold text-gray-800 text-lg">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Phone className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Emergency Hotline
                  </p>
                  <p className="text-red-600 font-bold">+880-1731-588825</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Mail className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-gray-700 font-medium">
                    aiarnob23@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="p-2 bg-red-50 rounded-lg">
                  <MapPin className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Location
                  </p>
                  <p className="text-gray-700 font-medium">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/50 bg-white/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-600">
              © 2025 LifeDrop. Made for humanity 🩸
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors font-medium"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors font-medium"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
