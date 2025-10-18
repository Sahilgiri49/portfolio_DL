import type { Skill, Project, Achievement, Education } from '../types';

export const skills: Skill[] = [
  { id: 'python', name: 'Python', experience: '3+ Years', usedIn: 'AI/ML, Backend Dev' },
  { id: 'pytorch', name: 'PyTorch', experience: '2+ Years', usedIn: 'Deep Learning Models' },
  { id: 'fastapi', name: 'FastAPI', experience: '2+ Years', usedIn: 'High-performance APIs' },
  { id: 'react', name: 'React.js', experience: '2+ Years', usedIn: 'Dynamic UIs, Portfolios' },
  { id: 'sql', name: 'SQL / Oracle', experience: '2+ Years', usedIn: 'Database Management' },
  { id: 'ml', name: 'Machine Learning', experience: '3+ Years', usedIn: 'Predictive Modeling' },
  { id: 'dl', name: 'Deep Learning', experience: '2+ Years', usedIn: 'Image & Data Analysis' },
  { id: 'dataviz', name: 'Data Visualization', experience: '3+ Years', usedIn: 'Matplotlib, Seaborn' },
  { id: 'blockchain', name: 'Blockchain / Web3', experience: '1+ Year', usedIn: 'Smart Contracts' },
];

export const projects: Project[] = [
  { 
    id: 'thermal-sr', 
    cluster: 'Remote Sensing & AI', 
    name: 'SAR-Vision', 
    description: 'A project utilizing Synthetic Aperture Radar (SAR) for advanced vision applications, likely involving object detection or environmental monitoring.',
    tech: ['Python', 'PyTorch', 'OpenCV'],
    github: 'https://github.com/sahilgiri-sg',
    live: 'https://sahil-giri.netlify.app/',
    achievements: 'Developed for a national-level hackathon.'
  },
  { 
    id: 'ai-copilot', 
    cluster: 'AI Applications', 
    name: 'Smart Contract Copilot', 
    description: 'An AI-powered assistant to help developers write, debug, and audit smart contracts, improving security and efficiency.',
    tech: ['Python', 'LLMs', 'Solidity'],
    github: 'https://github.com/sahilgiri-sg',
    live: 'https://sahil-giri.netlify.app/',
    achievements: 'Winner at HackSphere 2025.'
  },
  { 
    id: 'identity-verification', 
    cluster: 'AI Applications', 
    name: 'Identity Verification System', 
    description: 'A secure system using AI for facial recognition and document analysis to verify user identities in real-time.',
    tech: ['Python', 'OpenCV', 'FastAPI'],
    github: 'https://github.com/sahilgiri-sg',
    live: 'https://sahil-giri.netlify.app/',
    achievements: 'Implemented as a core security feature.'
  },
  { 
    id: 'blockchain-cert', 
    cluster: 'Blockchain + AI', 
    name: 'Blockchain Certificate Verification', 
    description: 'A decentralized application to issue and verify academic or professional certificates on the blockchain, preventing fraud.',
    tech: ['Solidity', 'React.js', 'Web3.js'],
    github: 'https://github.com/sahilgiri-sg',
    live: 'https://sahil-giri.netlify.app/',
    achievements: 'Presented at a tech conference.'
  },
  { 
    id: 'regression-models', 
    cluster: 'Data Science', 
    name: 'Restro Table Booking', 
    description: 'A comprehensive table booking system for restaurants, possibly with predictive analytics for demand forecasting.',
    tech: ['Python', 'Scikit-learn', 'Flask'],
    github: 'https://github.com/sahilgiri-sg',
    live: 'https://sahil-giri.netlify.app/',
    achievements: 'Personal project demonstrating full-stack capabilities.'
  },
];

export const achievements: Achievement[] = [
  { id: 'hacksphere', title: '🏆 HackSphere 2025', details: 'Won first place in the Blockchain + AI Fusion track for the "Smart Contract Copilot" project.', proof: '#' },
  { id: 'internship', title: '🧩 Internship — IT Networkz', details: 'AI Internship using Python. Gained practical experience in data analysis, model building, and end-to-end AI development processes.', proof: '#' },
  { id: 'diploma', title: '🎓 Diploma in AIML (Ongoing)', details: 'Currently in the 2nd year of my diploma, maintaining a high GPA and focusing on advanced AI concepts.' },
  { id: 'team', title: '⚓ Team Conquerors', details: 'Led and collaborated in multiple hackathons, demonstrating strong problem-solving and teamwork under pressure.' },
  { id: 'goal', title: '🎯 Goal: AI Engineer Role', details: 'Actively seeking a challenging role as an AI Engineer to apply my skills in building innovative AI solutions. Target: ₹1L/month.' },
];

export const education: Education[] = [
  { id: 'edu-2023', year: '2023', title: 'Started Diploma in AIML', institution: 'Government Polytechnic, Nagpur', details: 'Began my specialized journey into Artificial Intelligence and Machine Learning, building a strong foundation.' },
  { id: 'edu-2024', year: '2024', title: 'Internship at IT Networkz', institution: 'Professional Experience', details: 'Applied academic knowledge to real-world problems, collaborating on a capstone project and strengthening understanding of AI applications.' },
  { id: 'edu-2025', year: '2025', title: 'AI + Blockchain Research', institution: 'Hackathons & Projects', details: 'Focused on the intersection of AI and Blockchain, leading to award-winning projects and innovative solutions.' },
  { id: 'edu-future', year: 'Future', title: 'Aim for B.Tech in AI', institution: 'Future Goal', details: 'Aspire to pursue a Bachelor of Technology in AI Engineering from a top-tier institution like an IIT to deepen my expertise.' },
];