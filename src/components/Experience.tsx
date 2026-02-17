import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center bg-black px-4 py-20">
      <div className="max-w-5xl mx-auto w-full" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-16 text-center"
        >
          Work <span className="text-emerald-400">Experience</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute left-0 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-transparent" />

          <div className="relative pl-8 md:pl-24">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute left-0 md:left-12 transform -translate-x-1/2 w-4 h-4 bg-emerald-400 rounded-full"
            />

            <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-emerald-400 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Computer Operator
                  </h3>
                  <p className="text-emerald-400 font-medium">1+ Year Experience</p>
                </div>
              </div>

              <p className="text-xl text-white mb-4">
                Manisha Computers & Typing Institute
              </p>

              <div className="space-y-3 text-gray-400">
                <p className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Managed daily computer operations and technical support for students and staff</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Provided training on MS Office, Tally, and other essential computer applications</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Troubleshot hardware and software issues, ensuring minimal downtime</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Developed practical skills in system maintenance and user support</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
