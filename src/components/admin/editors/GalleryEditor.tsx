import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type Gallery } from '../../../lib/supabase';
import { Loader, Trash2 } from 'lucide-react';

const GalleryEditor = () => {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('display_order');
    if (error) {
      console.error('Error fetching gallery:', error);
    } else {
      setGallery(data || []);
    }
    setLoading(false);
  };

  const handleDeleteImage = async (id: string) => {
    setSaving(true);

    const { error } = await supabase.from('gallery').delete().eq('id', id);

    if (error) {
      setMessage('Error deleting image');
    } else {
      setMessage('Image deleted successfully!');
      fetchGallery();
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);

    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('portfolio-media')
      .upload(`gallery/${fileName}`, file);

    if (uploadError) {
      setMessage('Error uploading image');
      setSaving(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from('portfolio-media')
      .getPublicUrl(`gallery/${fileName}`);

    const { error: dbError } = await supabase
      .from('gallery')
      .insert([{ image_url: publicUrl }]);

    if (dbError) {
      setMessage('Error saving image');
    } else {
      setMessage('Image uploaded successfully!');
      fetchGallery();
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
        <h2 className="text-3xl font-bold text-white mb-6">Gallery</h2>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Upload Image
          </label>
          <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-emerald-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={saving}
              className="hidden"
            />
            <div className="text-center">
              <p className="text-gray-400">
                Drag and drop or click to upload
              </p>
              <p className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
          </label>
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
          {gallery.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No images uploaded yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery.map((img) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative rounded-lg overflow-hidden group"
                >
                  <img
                    src={img.image_url}
                    alt={img.title || 'Gallery image'}
                    className="w-full h-40 object-cover"
                  />
                  <motion.button
                    onClick={() => handleDeleteImage(img.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryEditor;
