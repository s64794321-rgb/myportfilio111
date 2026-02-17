import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type About } from '../../../lib/supabase';
import { Save, Loader } from 'lucide-react';

const AboutEditor = () => {
  const [about, setAbout] = useState<About | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .single();
    if (error) {
      console.error('Error fetching about:', error);
    } else if (data) {
      setAbout(data);
      setContent(data.content);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!about) return;
    setSaving(true);

    const { error } = await supabase
      .from('about')
      .update({ content })
      .eq('id', about.id);

    if (error) {
      setMessage('Error saving changes');
    } else {
      setMessage('Saved successfully!');
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
        <h2 className="text-3xl font-bold text-white mb-6">About Section</h2>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-emerald-400 focus:outline-none transition-colors resize-none"
          />
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

        <motion.button
          onClick={handleSave}
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-emerald-400 text-black font-bold py-3 rounded-lg hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AboutEditor;
