import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import type { Page, Project } from '../types';
import { Home, BrainCircuit, Code, Trophy, GraduationCap, Send, ExternalLink } from 'lucide-react';
import { skills, projects, achievements, education } from '../data/portfolioData';
import AIAgent from './AIAgent';

const icons: { [key in Page]: React.ReactNode } = {
  home: <Home size={24} />,
  skills: <BrainCircuit size={24} />,
  projects: <Code size={24} />,
  achievements: <Trophy size={24} />,
  education: <GraduationCap size={24} />,
  contact: <Send size={24} />,
};

const pageTitles: { [key in Page]?: string } = {
    skills: "Input Layer: Skills",
    projects: "Hidden Layers: Projects",
    achievements: "Output Layer: Achievements",
    education: "Memory Bank: Education",
}

// --- Page Components ---

const SkillsPage: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full h-full flex items-center justify-center p-4 md:p-8"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full h-[80vh] overflow-y-auto p-4">
            {skills.map((skill, i) => (
                <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black/50 border border-cyan-glow/30 p-6 rounded-lg font-jetbrains-mono hover:border-cyan-glow hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all"
                >
                    <h3 className="text-xl font-bold text-cyan-glow mb-2">{skill.name}</h3>
                    <p className="text-white/80"><span className="font-bold">Experience:</span> {skill.experience}</p>
                    <p className="text-white/80"><span className="font-bold">Used In:</span> {skill.usedIn}</p>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

const ProjectsPage: React.FC = () => {
    const { setActiveProject } = useStore();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-full flex items-center justify-center p-4 md:p-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full h-[80vh] overflow-y-auto p-4">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-black/50 border border-purple-glow/30 p-6 rounded-lg flex flex-col justify-between cursor-pointer hover:border-purple-glow hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all"
                        onClick={() => setActiveProject(project)}
                    >
                        <div>
                            <p className="text-sm text-purple-glow/80 font-space-grotesk mb-1">{project.cluster}</p>
                            <h3 className="text-xl font-bold text-purple-glow mb-3 font-orbitron">{project.name}</h3>
                            <p className="text-white/70 text-sm mb-4">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tech.slice(0, 3).map(t => <span key={t} className="bg-purple-glow/10 text-purple-glow px-2 py-1 text-xs rounded-full">{t}</span>)}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const AchievementsPage: React.FC = () => (
     <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full h-full flex items-center justify-center p-4 md:p-8"
    >
        <div className="space-y-6 max-w-4xl w-full h-[80vh] overflow-y-auto p-4">
            {achievements.map((ach, i) => (
                <motion.div
                    key={ach.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-black/50 border border-yellow-400/30 p-6 rounded-lg flex items-start justify-between gap-4 hover:border-yellow-400/80 transition-colors"
                >
                    <div>
                        <h3 className="text-xl font-bold text-yellow-400 font-orbitron mb-2">{ach.title}</h3>
                        <p className="text-white/80">{ach.details}</p>
                    </div>
                    {ach.proof && ach.proof !== '#' && (
                         <a href={ach.proof} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mt-1 flex items-center gap-2 text-yellow-400/80 hover:text-yellow-400 hover:underline">
                             Proof <ExternalLink size={16} />
                         </a>
                    )}
                </motion.div>
            ))}
        </div>
    </motion.div>
);

const EducationPage: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full h-full flex items-center justify-center p-4 md:p-8"
    >
        <div className="max-w-4xl w-full h-[80vh] overflow-y-auto p-4 font-space-grotesk">
            <div className="relative border-l-2 border-blue-glow/30 ml-6">
                {education.map((edu, i) => (
                    <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="mb-10 ml-8"
                    >
                        <span className="absolute -left-[1.35rem] flex items-center justify-center w-10 h-10 bg-blue-glow/20 rounded-full ring-8 ring-black">
                            <GraduationCap className="w-5 h-5 text-blue-glow"/>
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-white">{edu.title}
                            <span className="bg-blue-glow/20 text-blue-glow text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">{edu.year}</span>
                        </h3>
                        <p className="block mb-2 text-sm font-normal leading-none text-gray-400">{edu.institution}</p>
                        <p className="text-base font-normal text-gray-300">{edu.details}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </motion.div>
);

// --- Core UI Components ---

const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useStore();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm p-2 rounded-full z-50 flex space-x-2 border border-cyan-glow/20">
      {(Object.keys(icons) as Page[]).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`p-3 rounded-full transition-all duration-300 ${
            currentPage === page ? 'bg-cyan-glow text-black' : 'text-cyan-glow hover:bg-cyan-glow/20'
          }`}
          aria-label={page}
        >
          {icons[page]}
        </button>
      ))}
    </nav>
  );
};

const HomePage: React.FC = () => {
  const { setCurrentPage } = useStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
      transition={{ duration: 1, delay: 0.5 }}
      className="text-center font-orbitron"
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-4">
        <span className="text-white">SAHIL GIRI</span>
      </h1>
      <p className="text-lg md:text-2xl text-cyan-glow mb-8 font-space-grotesk">
        AI Developer | Innovator | Problem Solver
      </p>
      <p className="text-md md:text-xl text-white/80 mb-12 font-jetbrains-mono">
        Welcome to my MindSpace
      </p>
      <div className="flex justify-center space-x-6">
        <button
          onClick={() => setCurrentPage('skills')}
          className="font-bold text-lg bg-cyan-glow text-black px-8 py-3 rounded-full transition-all duration-300 glow-button transform hover:scale-105"
        >
          Enter Network
        </button>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-lg text-cyan-glow border-2 border-cyan-glow px-8 py-3 rounded-full transition-all duration-300 hover:bg-cyan-glow/20 transform hover:scale-105"
        >
          Resume.pdf
        </a>
      </div>
    </motion.div>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-black border border-purple-glow/50 p-8 rounded-lg max-w-2xl w-full font-space-grotesk relative"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 20px #a855f7, 0 0 40px #a855f7' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl">&times;</button>
        <h2 className="text-3xl font-orbitron font-bold text-purple-glow mb-4">{project.name}</h2>
        <p className="text-white/80 mb-6">{project.description}</p>
        <div className="mb-6">
          <h3 className="font-bold text-cyan-glow mb-2">Tech Stack:</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => <span key={t} className="bg-cyan-glow/10 text-cyan-glow px-3 py-1 text-sm rounded-full">{t}</span>)}
          </div>
        </div>
        <p className="text-white/80 mb-6 font-jetbrains-mono text-sm"><strong>Achievement:</strong> {project.achievements}</p>
        <div className="flex space-x-4">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="font-bold text-lg text-purple-glow border border-purple-glow px-6 py-2 rounded-full transition hover:bg-purple-glow/20">GitHub</a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="font-bold text-lg bg-purple-glow text-black px-6 py-2 rounded-full transition hover:bg-opacity-80">Live Demo</a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContactForm: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    }

    return (
        <motion.div 
            className="w-full max-w-lg mx-auto text-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
            {!submitted ? (
            <>
                <h2 className="text-4xl font-orbitron mb-2 text-blue-glow">Synaptic Connection</h2>
                <p className="text-white/70 mb-8 font-space-grotesk">Send a signal. Let's create something amazing together.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-jetbrains-mono">
                    <input type="text" placeholder="Name" required className="bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow" />
                    <input type="email" placeholder="Email" required className="bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow" />
                    <textarea placeholder="Message" required rows={4} className="bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow"></textarea>
                    <button type="submit" className="bg-blue-glow text-black font-bold p-3 rounded-md transition hover:bg-opacity-80">Transmit Signal</button>
                </form>
            </>
            ) : (
                <div className="flex flex-col items-center justify-center h-64">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                       <Send size={64} className="text-cyan-glow mb-4 animate-pulse-slow" />
                    </motion.div>
                    <h3 className="text-2xl font-orbitron text-cyan-glow">Connection Established</h3>
                    <p className="text-white/80 font-space-grotesk">Signal received successfully ⚡</p>
                </div>
            )}
        </motion.div>
    );
}

const PageTitle: React.FC = () => {
    const currentPage = useStore(state => state.currentPage);
    const title = pageTitles[currentPage];

    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 pointer-events-none z-20">
            <AnimatePresence>
                {title && (
                    <motion.h2
                        key={title}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-orbitron text-cyan-glow/80 text-center"
                    >
                        {title}
                    </motion.h2>
                )}
            </AnimatePresence>
        </div>
    );
}


const UI: React.FC = () => {
  const { currentPage, activeProject, setActiveProject } = useStore();
  
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <PageTitle />
      <div className="w-full h-full flex items-center justify-center pointer-events-auto pt-24 pb-24">
        <AnimatePresence mode="wait">
            {currentPage === 'home' && <HomePage key="home" />}
            {currentPage === 'skills' && <SkillsPage key="skills" />}
            {currentPage === 'projects' && <ProjectsPage key="projects" />}
            {currentPage === 'achievements' && <AchievementsPage key="achievements" />}
            {currentPage === 'education' && <EducationPage key="education" />}
            {currentPage === 'contact' && <ContactForm key="contact" />}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>
      
      <div className="pointer-events-auto">
        <Navbar />
        <AIAgent />
      </div>
    </div>
  );
};

export default UI;