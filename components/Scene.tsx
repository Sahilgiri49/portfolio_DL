// Fix: The global types for react-three-fiber are imported in `index.tsx` and do not
// need to be re-imported here. This resolves issues with JSX elements like `<mesh>`
// not being recognized.
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree, RootState } from '@react-three/fiber';
import { Points, PointMaterial, Line, Html } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useStore } from '../store/useStore';
import { skills, achievements, education } from '../data/portfolioData';

// Configuration
const NODE_COUNT = 200;
const NODE_RADIUS = 15;
const CONNECTION_DISTANCE = 2.5;

// --- 3D Components ---

const FloatingParticles: React.FC = () => {
  // Fix: Initialized useRef with null to fix "Expected 1 arguments, but got 0" error.
  const ref = useRef<any>(null);
  const [points] = useState(() => {
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < 500 * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 40;
    }
    return positions;
  });

  useFrame((state, delta) => {
    // Fix: Added a null check for ref.current to prevent potential runtime errors.
    if (ref.current) {
      ref.current.rotation.x += delta / 20;
      ref.current.rotation.y += delta / 25;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00ffff" size={0.02} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
};

const NeuronNode: React.FC<{ node: any; type: string }> = ({ node, type }) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [isHovered, setIsHovered] = useState(false);
  const { setHoveredNode, setActiveProject, projects } = useStore();
  
  useFrame((_, delta) => {
    const pulse = Math.sin(_.clock.getElapsedTime() * 2 + node.position.x) * 0.1 + 0.9;
    if (ref.current) {
      ref.current.scale.set(pulse, pulse, pulse);
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setIsHovered(true);
    setHoveredNode(node.id);
  };
  
  const handlePointerOut = () => {
    setIsHovered(false);
    setHoveredNode(null);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (type === 'project') {
      const projectData = projects.find(p => p.id === node.id);
      if (projectData) setActiveProject(projectData);
    }
    if (type === 'achievement' && node.proof && node.proof !== '#') {
      window.open(node.proof, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <mesh
      ref={ref}
      position={node.position as any}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <sphereGeometry args={[isHovered ? 0.3 : 0.2, 16, 16]} />
      <meshStandardMaterial color={isHovered ? '#a855f7' : '#00ffff'} emissive={isHovered ? '#a855f7' : '#00ffff'} emissiveIntensity={isHovered ? 2 : 1} />
      {isHovered && node.label && (
        <Html distanceFactor={10}>
          <div className="bg-black/70 p-3 rounded-md font-jetbrains-mono text-xs text-cyan-glow w-64 -translate-x-1/2 -translate-y-[calc(100%+1rem)]">
            <h3 className="font-bold whitespace-normal mb-1">{node.label}</h3>
            {node.details && <p className="text-white/80 whitespace-normal">{node.details}</p>}
            {node.proof && node.proof !== '#' && (
              <a
                href={node.proof}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-purple-glow font-bold mt-2 block hover:underline"
              >
                [ View Proof ]
              </a>
            )}
          </div>
        </Html>
      )}
    </mesh>
  );
};

const NeuralNetwork: React.FC = () => {
    const projects = useStore(state => state.projects);

    const { nodes, connections } = useMemo(() => {
        const tempNodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
            id: `bg-node-${i}`,
            position: new THREE.Vector3(
                (Math.random() - 0.5) * NODE_RADIUS * 2,
                (Math.random() - 0.5) * NODE_RADIUS * 2,
                (Math.random() - 0.5) * NODE_RADIUS * 2
            ),
        }));

        const tempConnections: [THREE.Vector3, THREE.Vector3][] = [];
        for (let i = 0; i < tempNodes.length; i++) {
            for (let j = i + 1; j < tempNodes.length; j++) {
                if (tempNodes[i].position.distanceTo(tempNodes[j].position) < CONNECTION_DISTANCE) {
                    tempConnections.push([tempNodes[i].position, tempNodes[j].position]);
                }
            }
        }
        return { nodes: tempNodes, connections: tempConnections };
    }, []);
    
    // Content Nodes
    const contentNodes = useMemo(() => {
      const skillNodes = skills.map((skill, i) => ({
        id: skill.id,
        label: skill.name,
        details: skill.experience,
        position: new THREE.Vector3(
          -15 + Math.cos((i / skills.length) * Math.PI * 2) * 4,
          Math.sin((i / skills.length) * Math.PI * 2) * 4,
          5
        ),
        type: 'skill'
      }));

      const projectClusters = Array.from(new Set(projects.map(p => p.cluster)));
      const projectNodes = projects.map((project, i) => {
        const clusterIndex = projectClusters.indexOf(project.cluster);
        const angle = (clusterIndex / projectClusters.length) * Math.PI * 2 + (i * 0.5);
        return {
          id: project.id,
          label: project.name,
          details: project.cluster,
          position: new THREE.Vector3(
            Math.cos(angle) * 6,
            15 + Math.sin(angle) * 6,
            5 + (Math.random() - 0.5) * 2
          ),
          type: 'project'
        };
      });
      
      const achievementNodes = achievements.map((ach, i) => ({
        id: ach.id,
        label: ach.title,
        details: ach.details,
        proof: ach.proof,
        position: new THREE.Vector3(
            15 + (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            5 + (Math.random() - 0.5) * 2
        ),
        type: 'achievement'
      }));

      const educationNodes = education.map((edu, i) => ({
        id: edu.id,
        label: edu.title,
        details: edu.year,
        position: new THREE.Vector3(
          Math.cos(i * 1.5) * (2 + i * 0.8),
          -15 + Math.sin(i * 1.5) * (2 + i * 0.8),
          5
        ),
        type: 'education'
      }))
      
      const contactNodes = [
        { id: 'contact-1', position: new THREE.Vector3(-3, 0, -15), type: 'contact' },
        { id: 'contact-2', position: new THREE.Vector3(3, 0, -15), type: 'contact' },
      ];
      
      const resumeNodes = [
        { id: 'resume-1', position: new THREE.Vector3(-8, 8, 8), type: 'resume' },
        { id: 'resume-2', position: new THREE.Vector3(8, -8, 8), type: 'resume' },
      ];

      return [...skillNodes, ...projectNodes, ...achievementNodes, ...educationNodes, ...contactNodes, ...resumeNodes];
    }, [projects]);

    return (
        <group>
            {connections.map((conn, i) => (
                <Line key={i} points={conn} color="#00ffff" lineWidth={0.5} transparent opacity={0.1} />
            ))}
            {nodes.map(node => (
                <mesh key={node.id} position={node.position}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color="#2563eb" transparent opacity={0.5} />
                </mesh>
            ))}
            {contentNodes.map(node => (
                <NeuronNode key={node.id} node={node} type={node.type} />
            ))}
        </group>
    );
};

// Camera Positions & Targets for each page
const viewCenters: { [key: string]: THREE.Vector3 } = {
  home: new THREE.Vector3(0, 0, 0),
  skills: new THREE.Vector3(-15, 0, 5),
  projects: new THREE.Vector3(0, 15, 5),
  achievements: new THREE.Vector3(15, 0, 5),
  education: new THREE.Vector3(0, -15, 5),
  contact: new THREE.Vector3(0, 0, -15),
  resume: new THREE.Vector3(0, 0, 8),
};

const cameraPositions: { [key: string]: THREE.Vector3 } = {
  home: new THREE.Vector3(0, 0, 20),
  skills: new THREE.Vector3(-15, 0, 15),
  projects: new THREE.Vector3(0, 15, 15),
  achievements: new THREE.Vector3(15, 0, 15),
  education: new THREE.Vector3(0, -15, 15),
  contact: new THREE.Vector3(0, 0, -5),
  resume: new THREE.Vector3(0, 0, 18),
};

const CameraRig: React.FC = () => {
    const { camera } = useThree();
    const currentPage = useStore(state => state.currentPage);
    
    const targetPosition = useMemo(() => cameraPositions[currentPage], [currentPage]);
    const targetLookAt = useMemo(() => viewCenters[currentPage], [currentPage]);
    
    const lookAtVec = useRef(camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3())));

    useFrame((_, delta) => {
        camera.position.lerp(targetPosition, delta * 1.5);
        lookAtVec.current.lerp(targetLookAt, delta * 1.5);
        camera.lookAt(lookAtVec.current);
    });

    return null;
};


const Scene: React.FC = () => {
  const [webglError, setWebglError] = useState(false);

  const handleCanvasCreated = useCallback((state: RootState) => {
    const canvas = state.gl.domElement;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn("WebGL Context Lost");
      setWebglError(true);
    };
    const handleContextRestored = () => {
      console.log("WebGL Context Restored");
      setWebglError(false);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
  }, []);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }} onCreated={handleCanvasCreated}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} intensity={0.5} color="cyan" />
        <NeuralNetwork />
        <FloatingParticles />
        <CameraRig />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
        </EffectComposer>
      </Canvas>
      {webglError && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 text-cyan-glow font-jetbrains-mono">
            <div className="animate-pulse-slow text-2xl mb-4">
                Connection Interrupted
            </div>
            <p className="text-white/80">
                Graphics context lost. Attempting to restore the neural link...
            </p>
        </div>
      )}
    </>
  );
};

export default Scene;