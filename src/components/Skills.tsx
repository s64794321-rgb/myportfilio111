import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Laptop, Shield, Wrench, Monitor } from 'lucide-react';

const skillCategories = [
  {
    icon: Code2,
    title: 'Programming',
    skills: ['Python', 'C/C++', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: Brain,
    title: 'AI & ML',
    skills: ['Mistral LLM', 'OpenCV', 'SpeechRecognition', 'Computer Vision'],
  },
  {
    icon: Laptop,
    title: 'GUI Development',
    skills: ['Tkinter', 'PyQt', 'Desktop Applications'],
  },
  {
    icon: Shield,
    title: 'Security',
    skills: ['Image Steganography', 'Cryptography', 'Data Protection'],
  },
  {
    icon: Wrench,
    title: 'Tools',
    skills: ['MS Office', 'Tally', 'Git', 'VS Code'],
  },
  {
    icon: Monitor,
    title: 'Operating System',
    skills: ['Windows', 'Command Line', 'System Administration'],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center bg-black px-4 py-20">
      <div className="max-w-7xl mx-auto w-full" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-16 text-center"
        >
          Skills & <span className="text-emerald-400">Expertise</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-emerald-400 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-400/20 transition-colors">
                  <category.icon className="w-6 h-6 text-emerald-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{category.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-sm group-hover:bg-emerald-400/20 group-hover:text-emerald-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
