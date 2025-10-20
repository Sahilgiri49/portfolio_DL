

import React, { useState, useEffect } from 'react';
import { auth, provider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useStore } from '../store/useStore';
import type { Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash, LogOut, Github } from 'lucide-react';
import { projects as staticProjects } from '../data/portfolioData';

const ADMIN_EMAIL = 'sahilgiri59902@gmail.com';

const initialProjectState: Omit<Project, 'id'> = {
  name: '',
  description: '',
  image: '',
  live: '',
  github: '',
  tech: [],
  cluster: 'AI Applications',
  achievements: '',
};

const ProjectForm: React.FC<{
  currentProject: Project | null;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ currentProject, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(initialProjectState);
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (currentProject) {
      setFormData(currentProject);
      setTechInput(currentProject.tech.join(', '));
    } else {
      setFormData(initialProjectState);
      setTechInput('');
    }
  }, [currentProject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      tech: techInput.split(',').map(t => t.trim()).filter(Boolean),
    };

    try {
      if (currentProject) {
        const projectRef = doc(db, 'projects', currentProject.id);
        await updateDoc(projectRef, projectData);
      } else {
        await addDoc(collection(db, 'projects'), projectData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-cyan-glow/50 p-8 rounded-lg max-w-2xl w-full relative">
        <h2 className="text-2xl font-orbitron text-cyan-glow mb-6">{currentProject ? 'Edit Project' : 'Add New Project'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
            <input type="text" name="name" placeholder="Title" value={formData.name} onChange={handleChange} required className="w-full bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows={3} className="w-full bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow"></textarea>
            <input type="url" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required className="w-full bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow" />
            <input type="url" name="live" placeholder="Live Demo URL" value={formData.live} onChange={handleChange} required className="w-full bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow" />
            <input type="url" name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} required className="w-full bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow" />
            <input type="text" name="tech" placeholder="Tech Stack (comma-separated)" value={techInput} onChange={handleTechChange} required className="w-full bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow" />
            <select name="cluster" value={formData.cluster} onChange={handleChange} className="w-full bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow">
                <option>Remote Sensing & AI</option>
                <option>AI Applications</option>
                <option>Blockchain + AI</option>
                <option>Data Science</option>
            </select>
            <input type="text" name="achievements" placeholder="Achievements" value={formData.achievements} onChange={handleChange} required className="w-full bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow" />
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="font-bold text-lg text-cyan-glow border-2 border-cyan-glow px-6 py-2 rounded-full transition-all duration-300 hover:bg-cyan-glow/20">Cancel</button>
            <button type="submit" className="font-bold text-lg bg-cyan-glow text-black px-6 py-2 rounded-full transition-all duration-300 glow-button">Save Project</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<{ user: User }> = ({ user }) => {
    const { projects, fetchProjects } = useStore();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);

    useEffect(() => {
        const checkAndMigrate = async () => {
            const projectsCollection = collection(db, 'projects');
            const projectSnapshot = await getDocs(projectsCollection);

            if (projectSnapshot.empty) {
                console.log('Admin detected empty projects collection. Migrating from static data...');
                try {
                    for (const project of staticProjects) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { id, ...projectData } = project;
                        await addDoc(projectsCollection, projectData);
                    }
                    console.log('Migration complete. Fetching updated project list.');
                    await fetchProjects();
                } catch (error) {
                    console.error('Data migration failed:', error);
                    alert('An error occurred during data migration. Please check the console.');
                }
            }
        };

        checkAndMigrate();
    }, [fetchProjects]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.hash = '';
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setCurrentProject(null);
        setIsFormOpen(true);
    }
    
    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await deleteDoc(doc(db, "projects", id));
                fetchProjects();
            } catch (error) {
                console.error("Error deleting project:", error);
                alert("Failed to delete project.");
            }
        }
    }

    return (
        <div className="h-screen overflow-y-auto p-8 max-w-7xl mx-auto font-jetbrains-mono">
             <header className="flex justify-between items-center mb-8 pb-4 border-b border-cyan-glow/30">
                <div>
                    <h1 className="text-4xl font-orbitron text-glow-white">Admin Panel</h1>
                    <p className="text-cyan-glow/80">Logged in as {user.displayName} ({user.email})</p>
                </div>
                <div className="flex items-center gap-4">
                     <button onClick={handleAdd} className="flex items-center gap-2 font-bold text-lg bg-cyan-glow text-black px-6 py-2 rounded-full transition-all duration-300 glow-button">
                        <Plus size={20} /> Add Project
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-2 font-bold text-lg text-cyan-glow border-2 border-cyan-glow px-6 py-2 rounded-full transition-all duration-300 hover:bg-cyan-glow/20">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <div key={project.id} className="bg-black/50 border border-cyan-glow/30 p-4 rounded-lg flex flex-col">
                        <img src={project.image} alt={project.name} className="w-full h-40 object-cover rounded-md mb-4" />
                        <h3 className="text-xl font-bold text-cyan-glow mb-2 flex-grow">{project.name}</h3>
                        <p className="text-white/70 text-sm mb-4">{project.cluster}</p>
                        <div className="flex justify-between items-center mt-auto">
                           <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-cyan-glow/80 hover:text-cyan-glow"><Github size={24}/></a>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(project)} className="text-blue-glow hover:text-white p-2"><Edit size={20} /></button>
                                <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-white p-2"><Trash size={20} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {isFormOpen && (
                    <ProjectForm 
                        currentProject={currentProject} 
                        onClose={() => setIsFormOpen(false)}
                        onSuccess={fetchProjects}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

const Admin: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthorized(currentUser?.email === ADMIN_EMAIL);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Authentication failed:", error);
        }
    };
    
    if (loading) {
        return <div className="w-screen h-screen flex items-center justify-center text-cyan-glow text-2xl font-orbitron">Initializing Connection...</div>
    }

    if (!user) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-orbitron text-glow-white mb-4">Admin Access Required</h1>
                <p className="text-cyan-glow/80 mb-8 max-w-md">Please sign in with your authorized Google account to manage the portfolio content.</p>
                <button onClick={handleLogin} className="font-bold text-xl bg-cyan-glow text-black px-8 py-4 rounded-full transition-all duration-300 glow-button">
                    Sign in with Google
                </button>
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-orbitron text-red-500 mb-4">Access Denied</h1>
                <p className="text-white/80 mb-8 max-w-md">The account <span className="text-cyan-glow">{user.email}</span> is not authorized to access this panel.</p>
                <button onClick={() => signOut(auth)} className="font-bold text-lg text-cyan-glow border-2 border-cyan-glow px-6 py-2 rounded-full transition-all duration-300 hover:bg-cyan-glow/20">
                    Sign Out
                </button>
            </div>
        );
    }

    return <AdminDashboard user={user} />;
};

export default Admin;