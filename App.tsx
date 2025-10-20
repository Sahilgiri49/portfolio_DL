
import React, { Suspense, useState } from 'react';
import Scene from './components/Scene';
import UI from './components/UI';
import { Loader } from '@react-three/drei';
import Intro from './components/Intro';

// Fix: Augment the global JSX namespace to include react-three-fiber's intrinsic elements.
// This is placed in a central file to avoid duplicate declarations and fix errors
// for components like `<mesh>`, `<group>`, `<sphereGeometry>`, etc. across the app.
declare global {
  namespace JSX {
    type R3FElements = import('@react-three/fiber').ThreeElements;
    interface IntrinsicElements extends R3FElements {}
  }
}

const App: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);

  const handleIntroFinish = () => {
    setIntroFinished(true);
  };

  if (!introFinished) {
    return <Intro onFinished={handleIntroFinish} />;
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