import type { Skill, Project, Achievement, Education } from '../types';

export const skills: Skill[] = [
  { id: 'python', name: 'Python', experience: '3+ Years', usedIn: 'AI/ML, Data Analysis, Backend Dev' },
  { id: 'ml', name: 'Machine Learning', experience: '3+ Years', usedIn: 'Scikit-learn, Pandas, NumPy' },
  { id: 'blockchain', name: 'Blockchain / Web3', experience: '1+ Year', usedIn: 'Smart Contracts, dApps' },
  { id: 'mern', name: 'MERN Stack', experience: '2+ Years', usedIn: 'Full-stack web applications' },
  { id: 'react', name: 'React.js', experience: '2+ Years', usedIn: 'Dynamic UIs, Portfolios' },
  { id: 'dl', name: 'Deep Learning', experience: '2+ Years', usedIn: 'PyTorch, Image & Data Analysis' },
  { id: 'comm', name: 'Teamwork & Communication', experience: 'Hackathon-Proven', usedIn: 'Leading teams and presenting projects' },
  { id: 'design', name: 'Designing', experience: '1+ Year', usedIn: 'UI/UX, User-Centric Flows' },
  { id: 'pm', name: 'Project Management', experience: '2+ Years', usedIn: 'Agile, Prototyping' },
];

export const projects: Project[] = [
  { 
    id: 'thermal-sr', 
    cluster: 'Remote Sensing & AI', 
    name: 'SAR-Vision', 
    description: 'A project utilizing Synthetic Aperture Radar (SAR) for advanced vision applications, likely involving object detection or environmental monitoring.',
    tech: ['Python', 'PyTorch', 'OpenCV'],
    github: 'https://github.com/Sahilgiri49/SAR-vision',
    live: 'https://sahilgiri49.github.io/SAR-vision/',
    image: 'https://pbs.twimg.com/media/Gndh9pHW4AAvO_A?format=jpg&name=large',
    achievements: 'Developed for a national-level hackathon.'
  },
  { 
    id: 'ai-copilot', 
    cluster: 'AI Applications', 
    name: 'Smart Contract Copilot', 
    description: 'An AI-powered assistant to help developers write, debug, and audit smart contracts, improving security and efficiency.',
    tech: ['Python', 'LLMs', 'Solidity'],
    github: 'https://github.com/Sahilgiri49/Smart-Contract-Copilot',
    live: 'https://www.youtube.com/watch?v=l6dWKZIxnRQ',
    image: 'https://pbs.twimg.com/media/Gndh9jmXUAA1kHc?format=jpg&name=large',
    achievements: 'Winner at HackSphere 2025.'
  },
  { 
    id: 'identity-verification', 
    cluster: 'AI Applications', 
    name: 'Identity Verification System', 
    description: 'A secure system using AI for facial recognition and document analysis to verify user identities in real-time.',
    tech: ['Python', 'OpenCV', 'FastAPI'],
    github: 'https://github.com/Sahilgiri49/identi-verse-secure-flow',
    live: 'https://identity-verify-1.netlify.app/',
    image: 'https://pbs.twimg.com/media/Gn2bS-aWgAAimKW?format=jpg&name=900x900',
    achievements: 'Implemented as a core security feature.'
  },
  { 
    id: 'blockchain-cert', 
    cluster: 'Blockchain + AI', 
    name: 'Blockchain Certificate Verification', 
    description: 'A decentralized application to issue and verify academic or professional certificates on the blockchain, preventing fraud.',
    tech: ['Solidity', 'React.js', 'Web3.js'],
    github: 'https://github.com/Sahilgiri49/Cert-Blockchain',
    live: 'https://youtu.be/I_ALu-kc2Jo?si=9kZT73Dd9ozYLiK9',
    image: 'https://raw.githubusercontent.com/Sahilgiri49/scr/main/Screenshot%202025-10-20%20101222.png',
    achievements: 'Presented at a tech conference.'
  },
  { 
    id: 'regression-models', 
    cluster: 'Data Science', 
    name: 'Restro Table Booking', 
    description: 'A comprehensive table booking system for restaurants, possibly with predictive analytics for demand forecasting.',
    tech: ['Python', 'Scikit-learn', 'Flask'],
    github: 'https://github.com/Sahilgiri49/table_booking-restro',
    live: 'https://ez-restro.netlify.app/',
    image: 'https://raw.githubusercontent.com/Sahilgiri49/scr/main/Screenshot%202025-10-20%20100932.png',
    achievements: 'Personal project demonstrating full-stack capabilities.'
  },
  { 
    id: 'fire-free-hub', 
    cluster: 'AI Applications', 
    name: 'Fire Free Arena Hub', 
    description: 'Built a platform to connect sponsors with Free Fire tournaments, enabling sponsor registration and promotion tracking.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/Sahilgiri49/fire-free-arena-hub',
    live: 'https://fire-free-arena-hub.vercel.app/',
    image: 'https://pbs.twimg.com/media/GrZBwe0XAAA013Y?format=jpg&name=large',
    achievements: 'Demonstrates full-stack web development skills.'
  },
  { 
    id: 'ticket-booking', 
    cluster: 'AI Applications', 
    name: 'Ticket Booking System', 
    description: 'A web-based platform designed to facilitate online ticket bookings for various events, integrating payment systems and real-time availability.',
    tech: ['React', 'Node.js', 'Payment Integration', 'Real-time Updates', 'Database Management'],
    github: 'https://github.com/Sahilgiri49/Ticketing-GPT-with-backend',
    live: 'https://www.linkedin.com/posts/activity-7288430291445039104-DCyP?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEP0RQcBWL7J2jy6bEK4Za8GGMpdg5PyWho',
    image: 'https://raw.githubusercontent.com/Sahilgiri49/scr/main/Screenshot%202025-10-20%20101332.png',
    achievements: 'Developed at Vincent Palloti Nagpur Hackathon.'
  },
  { 
    id: 'ai-dev-project', 
    cluster: 'Data Science', 
    name: 'AI Development Capstone', 
    description: 'Completed a capstone project showcasing end-to-end AI development processes. Used Python libraries like Pandas, NumPy, and Scikit-learn for data analysis and model building.',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
    github: 'https://github.com/Sahilgiri49/LLM-model',
    live: 'https://youtu.be/PPokMwolnBo?si=aeUCbJEQox57ar1N',
    image: 'https://pbs.twimg.com/media/Gndh9jjWEAAT_Un?format=jpg&name=large',
    achievements: 'Capstone project for AI Internship.'
  },
];

export const achievements: Achievement[] = [
  { id: 'hackathons', title: '🏆 Multiple Hackathon Winner', details: 'Participated in and led teams through multiple state and national-level hackathons, demonstrating strong problem-solving, teamwork, and rapid prototyping skills.', proof: '#' },
  { id: 'internship', title: '🧩 AI Internship — IT Networkz (2024)', details: 'Gained practical experience in data analysis, model building with Pandas, NumPy, Scikit-learn, and end-to-end AI development processes.', proof: '#' },
  { id: 'vote-counting', title: '🗳️ Vote Counting Assistant — Election Commission (2024)', details: 'Assisted in the accurate counting and verification of votes during local elections, ensuring a transparent and smooth electoral process with high attention to detail.' },
  { id: 'certifications', title: '🏅 Multiple Certifications', details: 'Recognized for excellence in technology, UI/UX design, sports, and visual arts, reflecting a well-rounded and consistent skill set.'},
  { id: 'goal', title: '🎯 Goal: AI Engineer Role', details: 'Actively seeking a challenging role as an AI Engineer to apply my skills in building innovative AI solutions.' },
];

export const education: Education[] = [
  { id: 'edu-diploma', year: '2023 - 2026 (Ongoing)', title: 'Diploma in AI & Machine Learning', institution: 'Government Polytechnic, Nagpur', details: 'Pursuing a comprehensive diploma focused on core AI/ML concepts, practical applications, and building a strong theoretical foundation.' },
  { id: 'edu-ssc', year: '2023', title: 'Secondary School Certificate (SSC)', institution: 'NMC School, Nagpur', details: 'Completed secondary education with a focus on science and mathematics, laying the groundwork for a career in technology.' },
  { id: 'edu-experience', year: '2024', title: 'Professional Experience', institution: 'IT Networkz & Election Commission', details: 'Gained hands-on industry experience through an AI internship and demonstrated responsibility in a public service role with the election commission.' },
  { id: 'edu-future', year: 'Future', title: 'Aspiring for B.Tech in AI', institution: 'Future Goal', details: 'Plan to pursue a Bachelor of Technology in AI Engineering from a top-tier institution to deepen expertise and contribute to cutting-edge research.' },
];