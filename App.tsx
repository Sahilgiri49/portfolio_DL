
import React, { Suspense, useState, useEffect } from 'react';
import Scene from './components/Scene';
import UI from './components/UI';
import { Loader } from '@react-three/drei';
import Intro from './components/Intro';
import Admin from './components/Admin';
import { useStore } from './store/useStore';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Project } from './types';

const App: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [route, setRoute] = useState(window.location.hash);
  const { setProjects } = useStore();

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'projects');
        const projectSnapshot = await getDocs(projectsCollection);
        
        const projectsList = projectSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        } as Project));
        setProjects(projectsList);
      } catch (error) {
        // Log a more specific error for read operations
        console.error("Error fetching projects:", error);
      }
    };
    
    fetchProjects();
  }, [setProjects]);

  const handleIntroFinish = () => {
    setIntroFinished(true);
  };

  if (!introFinished) {
    return <Intro onFinished={handleIntroFinish} />;
  }

  if (route === '#admin') {
    return <Admin />;
  }
  
  return (
    <main className="w-screen h-screen bg-black animate-fade-in">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <UI />
      <Loader 
        containerStyles={{ background: 'black' }} 
        innerStyles={{ width: '100px', height: '10px', background: 'white' }}
        barStyles={{ height: '10px', background: '#00ffff' }}
        dataStyles={{ color: 'white', fontFamily: 'JetBrains Mono' }}
      />
    </main>
  );
};

export default App;
