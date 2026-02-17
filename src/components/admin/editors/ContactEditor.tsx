import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type Contact } from '../../../lib/supabase';
import { Save, Loader } from 'lucide-react';

const ContactEditor = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    const { data, error } = await supabase
      .from('contact')
      .select('*')
      .single();
    if (error) {
      console.error('Error fetching contact:', error);
    } else if (data) {
      setContact(data);
      setFormData({
        email: data.email,
        phone: data.phone,
        location: data.location,
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!contact) return;
    setSaving(true);

    const { error } = await supabase
      .from('contact')
      .update(formData)
      .eq('id', contact.id);

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
        <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-emerald-400 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-emerald-400 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-emerald-400 focus:outline-none transition-colors"
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

export default ContactEditor;
