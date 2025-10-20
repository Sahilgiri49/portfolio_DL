import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import type { Page, Project } from '../types';
import { Home, BrainCircuit, Code, Trophy, GraduationCap, Send, ExternalLink, Instagram, Linkedin, Twitter, Github, FileText } from 'lucide-react';
import { skills, achievements, education } from '../data/portfolioData';
import AIAgent from './AIAgent';

// Declare emailjs for TypeScript since it's loaded from a script tag
declare const emailjs: any;

const icons: { [key in Page]: React.ReactNode } = {
  home: <Home size={24} />,
  skills: <BrainCircuit size={24} />,
  projects: <Code size={24} />,
  achievements: <Trophy size={24} />,
  education: <GraduationCap size={24} />,
  resume: <FileText size={24} />,
  contact: <Send size={24} />,
};

const pageTitles: { [key in Page]?: string } = {
    skills: "Input Layer: Skills",
    projects: "Hidden Layers: Projects",
    achievements: "Output Layer: Achievements",
    education: "Memory Bank: Education",
    resume: "Core Data: Resume",
    contact: "Synaptic Connection",
}

// --- Page Components ---

const SkillsPage: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full h-full flex items-center justify-center p-4 md:p-8"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full h-full overflow-y-auto p-4 no-scrollbar">
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
    const { setActiveProject, projects } = useStore();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-full flex items-center justify-center p-4 md:p-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 max-w-6xl w-full h-full overflow-y-auto p-4 no-scrollbar">
                {projects.map((project, i) => (
                   <div key={project.id} className="flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-black/50 border border-cyan-glow/30 rounded-lg overflow-hidden w-full aspect-[4/3]"
                        >
                           <img 
                                src={project.image} 
                                alt={project.name} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                           />
                           <div className="absolute inset-0 bg-black/80 flex flex-col p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                               <div className="flex-grow overflow-hidden">
                                    <p className="text-sm text-cyan-glow/80 font-space-grotesk mb-1">{project.cluster}</p>
                                    <h3 className="text-lg font-bold text-cyan-glow mb-2 font-orbitron">{project.name}</h3>
                                    <p className="text-white/70 text-xs mb-2">{project.description}</p>
                               </div>
                               <div className="flex flex-wrap gap-1 mt-2">
                                    {project.tech.slice(0, 3).map(t => <span key={t} className="bg-cyan-glow/10 text-cyan-glow px-2 py-1 text-[10px] rounded-full">{t}</span>)}
                               </div>
                               <button 
                                 onClick={() => setActiveProject(project)}
                                 className="w-full mt-4 text-center bg-cyan-glow/20 text-cyan-glow py-2 rounded-md text-sm font-bold hover:bg-cyan-glow/40 transition-colors"
                               >
                                 View Details
                               </button>
                           </div>
                        </motion.div>
                        <div className="flex items-center gap-8">
                            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center gap-2 text-cyan-glow/70 hover:text-cyan-glow transition-transform hover:scale-110">
                                <Github size={20} />
                                <span className="text-sm font-jetbrains-mono">GitHub</span>
                            </a>
                            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="flex items-center gap-2 text-cyan-glow/70 hover:text-cyan-glow transition-transform hover:scale-110">
                                <ExternalLink size={20} />
                                <span className="text-sm font-jetbrains-mono">Demo</span>
                            </a>
                        </div>
                   </div>
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
        <div className="space-y-6 max-w-4xl w-full h-full overflow-y-auto p-4 no-scrollbar">
            {achievements.map((ach, i) => (
                <motion.div
                    key={ach.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-black/50 border border-cyan-glow/30 p-6 rounded-lg flex items-start justify-between gap-4 hover:border-cyan-glow/80 transition-colors"
                >
                    <div>
                        <h3 className="text-xl font-bold text-cyan-glow font-orbitron mb-2">{ach.title}</h3>
                        <p className="text-white/80">{ach.details}</p>
                    </div>
                    {ach.proof && ach.proof !== '#' && (
                         <a href={ach.proof} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mt-1 flex items-center gap-2 text-cyan-glow/80 hover:text-cyan-glow hover:underline">
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
        <div className="max-w-4xl w-full h-full overflow-y-auto p-4 font-space-grotesk no-scrollbar">
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

const ResumePage: React.FC = () => {
    const professionalExperience = [
        {
            role: 'AI Internship (Python)',
            company: 'IT Networkz Company',
            year: '2024',
            points: [
                'Gained practical experience in using Python libraries like Pandas, NumPy, and Scikit-learn for data analysis and model building.',
                'Collaborated with a team to complete a capstone project, showcasing end-to-end AI development processes.',
                'Strengthened understanding of AI concepts and their real-world applications through hands-on learning.'
            ]
        },
        {
            role: 'Assistant - Vote Counting',
            company: 'Maharashtra Election Commission, Nagpur',
            year: '2024',
            points: [
                'Assisted in the accurate counting and verification of votes during local elections.',
                'Collaborated with a team to ensure a transparent and smooth electoral process.',
                'Demonstrated strong attention to detail and responsibility in high-pressure situations.'
            ]
        }
    ];

    const ResumeSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div className="mb-6">
            <h2 className="text-2xl font-bold font-orbitron text-cyan-glow border-b-2 border-cyan-glow/30 pb-2 mb-4">{title}</h2>
            {children}
        </div>
    );
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-full flex items-center justify-center p-4 md:p-8"
        >
            <div className="max-w-4xl w-full h-full overflow-y-auto p-6 bg-black/50 border border-cyan-glow/20 rounded-lg font-space-grotesk text-white/90 no-scrollbar">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-orbitron text-glow-white">SAHIL GIRI</h1>
                    <p className="text-xl text-cyan-glow">DIPLOMA IN AIML</p>
                    <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 text-sm text-white/70 mt-2">
                        <span>Ayodhyanagar, Nagpur</span>
                        <span>|</span>
                        <a href="https://sahil-giri.netlify.app/" className="hover:text-cyan-glow">https://sahil-giri.netlify.app/</a>
                        <span>|</span>
                        <a href="mailto:sahilgiri59902@gmail.com" className="hover:text-cyan-glow">sahilgiri59902@gmail.com</a>
                    </div>
                </div>

                {/* Summary */}
                <p className="text-center text-white/80 mb-8 border-y border-cyan-glow/20 py-4">
                    A dedicated and versatile Artificial Intelligence and Machine Learning (AIML) student with hands-on experience in solving real-world problems through participation in multiple hackathons. Proven ability to collaborate effectively in teams, demonstrated by contributing to innovative projects.
                </p>

                {/* Professional Experience */}
                <ResumeSection title="Professional Experience">
                    {professionalExperience.map(exp => (
                        <div key={exp.role} className="mb-4">
                            <h3 className="text-lg font-bold text-white">{exp.role} | {exp.company}
                                <span className="text-sm font-normal text-white/60 ml-2">{exp.year}</span>
                            </h3>
                            <ul className="list-disc list-inside mt-1 text-white/80 space-y-1">
                                {exp.points.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                    ))}
                </ResumeSection>
                
                {/* Education */}
                 <ResumeSection title="Education">
                    {education.filter(e => e.id.startsWith('edu-diploma') || e.id.startsWith('edu-ssc')).map(edu => (
                         <div key={edu.id} className="mb-2">
                            <h3 className="text-lg font-bold text-white">{edu.title}
                                <span className="text-sm font-normal text-white/60 ml-2">({edu.year})</span>
                            </h3>
                            <p className="text-white/80">{edu.institution}</p>
                        </div>
                    ))}
                </ResumeSection>

                {/* Skills */}
                <ResumeSection title="Skills">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                        {skills.map(skill => <div key={skill.id} className="bg-cyan-glow/10 text-cyan-glow p-2 rounded-md">{skill.name}</div>)}
                    </div>
                </ResumeSection>

                 {/* Additional Information */}
                <ResumeSection title="Additional Information">
                    <p className="text-white/80"><strong className="text-white">Languages:</strong> English, Marathi, Hindi, German (ongoing).</p>
                    <p className="text-white/80"><strong className="text-white">Certifications:</strong> Recognized with multiple certificates for excellence in technology, UI/UX design, sports, and visual arts.</p>
                </ResumeSection>
            </div>
        </motion.div>
    );
};


// --- Core UI Components ---

const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useStore();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm p-2 rounded-full z-50 flex space-x-1 sm:space-x-2 border border-cyan-glow/20">
      {(Object.keys(icons) as Page[]).filter(page => page !== 'resume').map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
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
  const [skillIndex, setSkillIndex] = React.useState(0);
  const skillsToAnimate = ['AI Developer', 'Innovator', 'Problem Solver', 'Deep Learning Engineer', 'Creative Coder'];

  React.useEffect(() => {
      const interval = setInterval(() => {
        setSkillIndex((prevIndex) => (prevIndex + 1) % skillsToAnimate.length);
      }, 2000);
      return () => clearInterval(interval);
  }, [skillsToAnimate.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12 px-4 md:px-8"
    >
      <div className="text-center md:text-left font-orbitron order-2 md:order-1">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
          <span className="text-glow-white">SAHIL GIRI</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-cyan-glow mb-8 font-space-grotesk h-8">
          <AnimatePresence mode="wait">
              <motion.span
                  key={skillIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
              >
                  {skillsToAnimate[skillIndex]}
              </motion.span>
          </AnimatePresence>
        </p>
        <div className="mb-12">
          <p className="text-base md:text-xl text-white/80 mb-4 font-jetbrains-mono">
            Welcome to my MindSpace
          </p>
          <p className="text-sm md:text-base text-white/70 font-space-grotesk max-w-xl mx-auto md:mx-0">
            A dedicated and versatile AIML student with hands-on experience solving real-world problems in hackathons. Proven ability to collaborate and contribute to innovative projects.
          </p>
        </div>
        <div className="flex justify-center md:justify-start space-x-4 md:space-x-6">
          <button
            onClick={() => setCurrentPage('skills')}
            className="font-bold text-lg bg-cyan-glow text-black px-6 py-3 md:px-8 rounded-full transition-all duration-300 glow-button transform hover:scale-105"
          >
            Enter Network
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className="font-bold text-lg text-cyan-glow border-2 border-cyan-glow px-6 py-3 md:px-8 rounded-full transition-all duration-300 hover:bg-cyan-glow/20 transform hover:scale-105"
          >
            Send Signal
          </button>
        </div>
         <div className="flex justify-center md:justify-start space-x-8 mt-10">
            <a href="https://www.instagram.com/sahill.___17/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cyan-glow/70 hover:text-cyan-glow transition-transform hover:scale-110">
                <Instagram size={28} />
            </a>
            <a href="https://www.linkedin.com/in/sahil-g-773989279/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-cyan-glow/70 hover:text-cyan-glow transition-transform hover:scale-110">
                <Linkedin size={28} />
            </a>
            <a href="https://github.com/Sahilgiri49" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-cyan-glow/70 hover:text-cyan-glow transition-transform hover:scale-110">
                <Github size={28} />
            </a>
            <a href="https://x.com/SahilGiri37559" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-cyan-glow/70 hover:text-cyan-glow transition-transform hover:scale-110">
                <Twitter size={28} />
            </a>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-6 order-1 md:order-2">
        <motion.div
          className="relative w-48 h-48 md:w-72 md:h-72 flex-shrink-0"
          animate={{ y: [-5, 5] }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 4, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 rounded-full bg-blue-glow blur-3xl opacity-60 animate-pulse-slow"></div>
          <img
              src="https://pbs.twimg.com/profile_images/1906565509916803072/dTJQW0cr_400x400.jpg"
              alt="Sahil Giri"
              className="relative w-full h-full object-cover rounded-full border-4 border-blue-glow/80 filter grayscale contrast-125"
              style={{ boxShadow: '0 0 15px rgba(37, 99, 235, 0.8), 0 0 25px rgba(37, 99, 235, 0.6)' }}
          />
          <div className="absolute inset-0 bg-blue-glow/30 rounded-full mix-blend-color pointer-events-none"></div>
        </motion.div>

        <motion.button
          onClick={() => setCurrentPage('resume')}
          className="flex items-center gap-3 font-bold text-lg text-blue-glow border-2 border-blue-glow px-8 py-3 rounded-full transition-all duration-300 hover:bg-blue-glow/20 transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          aria-label="View CV"
        >
          <FileText size={20} />
          View CV
        </motion.button>
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
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 pointer-events-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-black border border-cyan-glow/50 p-6 md:p-8 rounded-lg max-w-2xl w-full font-space-grotesk relative"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 20px #00ffff, 0 0 40px #00ffff' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl">&times;</button>
        <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-cyan-glow mb-4">{project.name}</h2>
        <p className="text-white/80 mb-6">{project.description}</p>
        <div className="mb-6">
          <h3 className="font-bold text-cyan-glow mb-2">Tech Stack:</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => <span key={t} className="bg-cyan-glow/10 text-cyan-glow px-3 py-1 text-sm rounded-full">{t}</span>)}
          </div>
        </div>
        <p className="text-white/80 mb-6 font-jetbrains-mono text-sm"><strong>Achievement:</strong> {project.achievements}</p>
        <div className="flex space-x-4">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="font-bold text-lg text-cyan-glow border border-cyan-glow px-6 py-2 rounded-full transition hover:bg-cyan-glow/20">GitHub</a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="font-bold text-lg bg-cyan-glow text-black px-6 py-2 rounded-full transition hover:bg-opacity-80 glow-button">Live Demo</a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContactForm: React.FC = () => {
    const form = React.useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    // IMPORTANT: These template IDs must exist in your EmailJS account.
    // 'contactUsTemplateID' is for the email sent to you.
    // 'autoReplyTemplateID' is for the confirmation email to the user.
    const serviceID = 'service_b6lhnc5';
    const contactUsTemplateID = 'template_b6hhuh2';
    const autoReplyTemplateID = 'template_kyh7ygy';
    const publicKey = 'AatovzBbBLdb2boqR';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const currentForm = form.current;
        if (!currentForm || typeof emailjs === 'undefined') {
            setError("Email service is not available.");
            return;
        };

        setIsSubmitting(true);
        setError(null);

        // Send the main contact email to the portfolio owner
        emailjs.sendForm(serviceID, contactUsTemplateID, currentForm, publicKey)
            .then(() => {
                // On success, send an auto-reply to the user.
                const userName = (currentForm.elements.namedItem('from_name') as HTMLInputElement)?.value;
                const userEmail = (currentForm.elements.namedItem('from_email') as HTMLInputElement)?.value;
                const userMessage = (currentForm.elements.namedItem('message') as HTMLTextAreaElement)?.value;

                // The auto-reply template (`template_kyh7ygy`) in EmailJS is configured to use these parameters.
                // 'email' is used in the "To Email" field.
                // 'name', 'message', and 'reply_to' are used in the template body and settings.
                const autoReplyParams = {
                    name: userName,
                    email: userEmail,
                    message: userMessage,
                    reply_to: 'sahilgiri59902@gmail.com',
                };
                
                emailjs.send(serviceID, autoReplyTemplateID, autoReplyParams, publicKey)
                    .then((response: any) => {
                        console.log('Auto-reply sent successfully!', response.status, response.text);
                    }, (err: any) => {
                        // Log auto-reply error but don't bother the user with a UI message
                        console.error('Failed to send auto-reply:', err);
                    });

                setSubmitted(true);
                currentForm.reset();
                setTimeout(() => setSubmitted(false), 5000);
            }, (err: any) => {
                console.error('EmailJS Error:', err);
                setError('Failed to transmit signal. Please try again.');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
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
                <p className="text-white/70 mb-8 font-space-grotesk">Send a signal. Let's create something amazing together.</p>
                <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-4 font-jetbrains-mono">
                    <input type="text" name="from_name" placeholder="Name" required className="bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow" />
                    <input type="email" name="from_email" placeholder="Email" required className="bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow" />
                    <textarea name="message" placeholder="Message" required rows={4} className="bg-black/50 border border-blue-glow/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow"></textarea>
                    <button type="submit" disabled={isSubmitting} className="bg-blue-glow text-black font-bold p-3 rounded-md transition hover:bg-opacity-80 disabled:bg-gray-500 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Transmitting...' : 'Transmit Signal'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
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
        <div className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 pointer-events-none z-20 w-full px-4">
            <AnimatePresence>
                {title && (
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-2xl md:text-4xl font-orbitron text-cyan-glow text-center tracking-widest uppercase pb-2">
                            {title}
                        </h2>
                        <div className="h-[2px] w-32 bg-cyan-glow glow-button" />
                    </motion.div>
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
      <div className="w-full h-full flex items-center justify-center pointer-events-auto pt-20 md:pt-24 pb-24">
        <AnimatePresence mode="wait">
            {currentPage === 'home' && <HomePage key="home" />}
            {currentPage === 'skills' && <SkillsPage key="skills" />}
            {currentPage === 'projects' && <ProjectsPage key="projects" />}
            {currentPage === 'achievements' && <AchievementsPage key="achievements" />}
            {currentPage === 'education' && <EducationPage key="education" />}
            {currentPage === 'resume' && <ResumePage key="resume" />}
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