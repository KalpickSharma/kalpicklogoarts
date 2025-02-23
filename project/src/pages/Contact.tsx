import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-black to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-40 h-40 rounded-full overflow-hidden border-4 border-gradient p-1 mb-6 transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/videos/FB_IMG_1605888651622.jpg"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </motion.div>
          <h1 className="neon-text text-5xl md:text-6xl font-bold text-center mb-4">
            Contact Us
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-8"
          >
            <h2 className="neon-text text-3xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-accent-cyan" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:kalpicksharma@gmail.com" className="text-white/60 hover:text-white/90 transition-colors">
                    kalpicksharma@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-accent-pink" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a href="tel:+918810308974" className="text-white/60 hover:text-white/90 transition-colors">
                    +91 8810308974
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-accent-gold" />
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-white/60">Delhi, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-8"
          >
            <h2 className="neon-text text-3xl font-bold mb-6">Social Links</h2>
            <div className="space-y-8">
              <a 
                href="https://instagram.com/kalpicklogoarts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-white/60 hover:text-accent-pink transition-colors"
              >
                <Instagram className="w-6 h-6" />
                <span>@kalpicklogoarts</span>
              </a>
              
              <a 
                href="https://twitter.com/kalpicklogoarts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-white/60 hover:text-accent-cyan transition-colors"
              >
                <Twitter className="w-6 h-6" />
                <span>@kalpicklogoarts</span>
              </a>
              
              <a 
                href="www.linkedin.com/in/kalpick-sharma-20a759250" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-white/60 hover:text-accent-blue transition-colors"
              >
                <Linkedin className="w-6 h-6" />
                <span>Kalpick Sharma</span>
              </a>
              
              <a 
                href="https://facebook.com/kalpicklogoarts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-white/60 hover:text-accent-gold transition-colors"
              >
                <Facebook className="w-6 h-6" />
                <span>Kalpick Logo Arts</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;