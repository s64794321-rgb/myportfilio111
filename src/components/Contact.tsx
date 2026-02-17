import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-black px-4 py-20">
      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-16 text-center"
        >
          Get In <span className="text-emerald-400">Touch</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Let's work together
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-6 mb-8">
              <motion.a
                href="mailto:siddharthdesai560@gmail.com"
                className="flex items-center gap-4 text-gray-300 hover:text-emerald-400 transition-colors group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center group-hover:bg-emerald-400/10 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg">siddharthdesai560@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:9168839841"
                className="flex items-center gap-4 text-gray-300 hover:text-emerald-400 transition-colors group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center group-hover:bg-emerald-400/10 transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-lg">+91 9168839841</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 text-gray-300"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-lg">Kolhapur, India</p>
                </div>
              </motion.div>
            </div>

            <div className="flex gap-4">
              <motion.a
                href="#"
                className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-emerald-400 hover:text-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-emerald-400 hover:text-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-emerald-400 hover:text-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-lg px-4 py-4 text-white focus:border-emerald-400 focus:outline-none transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    focused === 'name' || formData.name
                      ? 'top-2 text-xs text-emerald-400'
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-lg px-4 py-4 text-white focus:border-emerald-400 focus:outline-none transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    focused === 'email' || formData.email
                      ? 'top-2 text-xs text-emerald-400'
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  rows={6}
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-lg px-4 py-4 text-white focus:border-emerald-400 focus:outline-none transition-colors resize-none peer"
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    focused === 'message' || formData.message
                      ? 'top-2 text-xs text-emerald-400'
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Message
                </label>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-emerald-400 text-black font-bold py-4 rounded-lg hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center text-gray-500"
        >
          <p>Built with React, TypeScript, Tailwind CSS, and Framer Motion</p>
          <p className="mt-2">2024 Siddharth Ramesh Desai. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
