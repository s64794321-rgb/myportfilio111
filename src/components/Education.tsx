import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-20">
      <div className="max-w-5xl mx-auto w-full" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-16 text-center"
        >
          <span className="text-emerald-400">Education</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-emerald-400 transition-colors duration-300">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-emerald-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="flex-grow">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Bachelor of Computer Science
                </h3>
                <p className="text-emerald-400 font-medium text-lg mb-4">
                  Current Student
                </p>
                <p className="text-gray-400 mb-4">
                  Pursuing comprehensive education in Computer Science with focus on:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300">Artificial Intelligence & Machine Learning</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300">Software Development</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300">Data Structures & Algorithms</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300">System Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
