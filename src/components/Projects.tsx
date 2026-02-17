import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MessageSquare, Lock, Camera, Mic, Eye, Shield } from 'lucide-react';
import ProjectModal from './ProjectModal';

const projects = [
  {
    id: 1,
    title: 'AI Chatbot with Mistral LLM',
    description: 'Advanced multi-modal AI assistant with voice and vision capabilities',
    features: [
      'Voice input/output integration for natural conversation',
      'Camera interaction via OpenCV for visual context',
      'Real-time multi-modal assistant combining text, voice, and vision',
      'Custom GUI built with Tkinter for seamless user experience',
      'Integration with Mistral LLM for intelligent responses',
    ],
    technologies: ['Python', 'Mistral LLM', 'OpenCV', 'SpeechRecognition', 'Tkinter'],
    icon: MessageSquare,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Image Steganography & Slow-Scan Tool',
    description: 'Secure communication system with hidden message embedding',
    features: [
      'Secure hidden message embedding within images',
      'Encode/Decode workflow with intuitive interface',
      'Access-controlled message retrieval system',
      'Optional encryption for enhanced security',
      'Support for multiple image formats',
    ],
    technologies: ['Python', 'Cryptography', 'PIL', 'Tkinter', 'Security Protocols'],
    icon: Lock,
    gradient: 'from-emerald-500 to-teal-500',
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <section id="projects" className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-20">
        <div className="max-w-7xl mx-auto w-full" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-16 text-center"
          >
            Featured <span className="text-emerald-400">Projects</span>
          </motion.h2>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-400 transition-all duration-500"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300`}>
                      <project.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-lg mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-zinc-800 text-gray-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-6 py-3 bg-emerald-400 text-black font-bold rounded-lg hover:bg-emerald-300 transition-colors"
                    >
                      View Details
                    </button>
                  </div>

                  <div className="flex gap-4 flex-shrink-0">
                    {project.id === 1 ? (
                      <>
                        <Camera className="w-8 h-8 text-emerald-400" />
                        <Mic className="w-8 h-8 text-emerald-400" />
                        <MessageSquare className="w-8 h-8 text-emerald-400" />
                      </>
                    ) : (
                      <>
                        <Shield className="w-8 h-8 text-emerald-400" />
                        <Lock className="w-8 h-8 text-emerald-400" />
                        <Eye className="w-8 h-8 text-emerald-400" />
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default Projects;
