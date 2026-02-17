import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-20">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-12">
            About <span className="text-emerald-400">Me</span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            <p className="text-2xl md:text-3xl font-light text-white mb-8">
              Computer Science student with a passion for building intelligent, secure systems.
            </p>

            <p>
              With over a year of hands-on experience as a Computer Operator, I've developed a strong foundation in practical computing and software development. My work focuses on the intersection of artificial intelligence, security, and interactive applications.
            </p>

            <p>
              I specialize in creating multi-modal AI systems that integrate voice, vision, and text processing. From building conversational assistants with real-time camera integration to developing secure communication tools using steganography, I'm driven by the challenge of making complex technology accessible and powerful.
            </p>

            <p className="text-emerald-400 font-medium">
              Currently exploring the frontiers of AI development, security systems, and creating desktop applications that push the boundaries of user interaction.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
