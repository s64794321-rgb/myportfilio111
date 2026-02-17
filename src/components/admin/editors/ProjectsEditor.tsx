import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type Project } from '../../../lib/supabase';
import { Save, Loader, Plus, Trash2 } from 'lucide-react';

const ProjectsEditor = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech_stack: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order');
    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleAddProject = async () => {
    if (!newProject.title.trim() || !newProject.description.trim()) return;
    setSaving(true);

    const techStack = newProject.tech_stack
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t);

    const { error } = await supabase.from('projects').insert([
      {
        title: newProject.title,
        description: newProject.description,
        tech_stack: techStack,
      },
    ]);

    if (error) {
      setMessage('Error adding project');
    } else {
      setMessage('Project added successfully!');
      setNewProject({ title: '', description: '', tech_stack: '' });
      fetchProjects();
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const handleDeleteProject = async (id: string) => {
    setSaving(true);

    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      setMessage('Error deleting project');
    } else {
      setMessage('Project deleted successfully!');
      fetchProjects();
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Projects</h2>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              placeholder="e.g., AI Chatbot"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-emerald-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              placeholder="Project description..."
              rows={4}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-emerald-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tech Stack (comma-separated)
            </label>
            <input
              type="text"
              value={newProject.tech_stack}
              onChange={(e) =>
                setNewProject({ ...newProject, tech_stack: e.target.value })
              }
              placeholder="e.g., Python, OpenCV, Tkinter"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-emerald-400 focus:outline-none transition-colors"
            />
          </div>

          <motion.button
            onClick={handleAddProject}
            disabled={
              saving ||
              !newProject.title.trim() ||
              !newProject.description.trim()
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-emerald-400 text-black font-bold py-2 rounded-lg hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </motion.button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-emerald-400 text-sm"
          >
            {message}
          </motion.div>
        )}

        <div className="space-y-4 pt-6 border-t border-zinc-700">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-800 p-4 rounded-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {project.description}
                  </p>
                  {project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <motion.button
                  onClick={() => handleDeleteProject(project.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsEditor;
