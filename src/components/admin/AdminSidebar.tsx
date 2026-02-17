import { motion } from 'framer-motion';
import {
  Layout,
  FileText,
  Code,
  FolderOpen,
  Image,
  Mail,
  LogOut,
} from 'lucide-react';

type Section = 'hero' | 'about' | 'skills' | 'projects' | 'gallery' | 'contact';

interface AdminSidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  onLogout: () => void;
}

const AdminSidebar = ({
  activeSection,
  onSectionChange,
  onLogout,
}: AdminSidebarProps) => {
  const sections: Array<{ id: Section; label: string; icon: React.ReactNode }> =
    [
      { id: 'hero', label: 'Hero', icon: <Layout className="w-5 h-5" /> },
      { id: 'about', label: 'About', icon: <FileText className="w-5 h-5" /> },
      { id: 'skills', label: 'Skills', icon: <Code className="w-5 h-5" /> },
      {
        id: 'projects',
        label: 'Projects',
        icon: <FolderOpen className="w-5 h-5" />,
      },
      { id: 'gallery', label: 'Gallery', icon: <Image className="w-5 h-5" /> },
      { id: 'contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
    ];

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 h-screen flex flex-col sticky top-0">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Admin</h1>
        <p className="text-sm text-gray-400">Portfolio Manager</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            whileHover={{ x: 5 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === section.id
                ? 'bg-emerald-400 text-black font-semibold'
                : 'text-gray-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {section.icon}
            {section.label}
          </motion.button>
        ))}
      </nav>

      <motion.button
        onClick={onLogout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="m-4 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 px-4 py-3 rounded-lg transition-colors font-semibold"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </motion.button>
    </div>
  );
};

export default AdminSidebar;
