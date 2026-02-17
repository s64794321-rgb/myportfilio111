import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminSidebar from '../components/admin/AdminSidebar';
import HeroEditor from '../components/admin/editors/HeroEditor';
import AboutEditor from '../components/admin/editors/AboutEditor';
import SkillsEditor from '../components/admin/editors/SkillsEditor';
import ProjectsEditor from '../components/admin/editors/ProjectsEditor';
import GalleryEditor from '../components/admin/editors/GalleryEditor';
import ContactEditor from '../components/admin/editors/ContactEditor';

type Section = 'hero' | 'about' | 'skills' | 'projects' | 'gallery' | 'contact';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin');
      } else {
        setSession(data.session);
      }
      setLoading(false);
    };

    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (loading) {
    return <div className="min-h-screen bg-black" />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {activeSection === 'hero' && <HeroEditor />}
          {activeSection === 'about' && <AboutEditor />}
          {activeSection === 'skills' && <SkillsEditor />}
          {activeSection === 'projects' && <ProjectsEditor />}
          {activeSection === 'gallery' && <GalleryEditor />}
          {activeSection === 'contact' && <ContactEditor />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
