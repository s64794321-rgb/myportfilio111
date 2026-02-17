import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type Skill } from '../../../lib/supabase';
import { Save, Loader, Plus, Trash2 } from 'lucide-react';

const SkillsEditor = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Programming' });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category');
    if (error) {
      console.error('Error fetching skills:', error);
    } else {
      setSkills(data || []);
    }
    setLoading(false);
  };

  const handleAddSkill = async () => {
    if (!newSkill.name.trim()) return;
    setSaving(true);

    const { error } = await supabase.from('skills').insert([newSkill]);

    if (error) {
      setMessage('Error adding skill');
    } else {
      setMessage('Skill added successfully!');
      setNewSkill({ name: '', category: 'Programming' });
      fetchSkills();
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const handleDeleteSkill = async (id: string) => {
    setSaving(true);

    const { error } = await supabase.from('skills').delete().eq('id', id);

    if (error) {
      setMessage('Error deleting skill');
    } else {
      setMessage('Skill deleted successfully!');
      fetchSkills();
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  const categories = [
    'Programming',
    'AI & ML',
    'GUI Development',
    'Security',
    'Tools',
    'Operating System',
  ];

  const groupedSkills = categories.reduce(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Skills</h2>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill({ ...newSkill, name: e.target.value })
              }
              placeholder="e.g., React"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-emerald-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={newSkill.category}
              onChange={(e) =>
                setNewSkill({ ...newSkill, category: e.target.value })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-emerald-400 focus:outline-none transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            onClick={handleAddSkill}
            disabled={saving || !newSkill.name.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-emerald-400 text-black font-bold py-2 rounded-lg hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
            Add Skill
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

        <div className="space-y-6 pt-6 border-t border-zinc-700">
          {Object.entries(groupedSkills).map(([category, categorySkills]) =>
            categorySkills.length > 0 ? (
              <div key={category}>
                <h3 className="text-lg font-semibold text-emerald-400 mb-3">
                  {category}
                </h3>
                <div className="space-y-2">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg"
                    >
                      <span className="text-gray-300">{skill.name}</span>
                      <motion.button
                        onClick={() => handleDeleteSkill(skill.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsEditor;
