
import React, { Suspense } from 'react';
import Scene from './components/Scene';
import UI from './components/UI';
import { Loader } from '@react-three/drei';

const App: React.FC = () => {
  return (
    <main className="w-screen h-screen bg-black">
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
