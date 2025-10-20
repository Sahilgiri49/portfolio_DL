
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import { EffectComposer, Bloom, Glitch } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- 3D Components for the Intro Scene ---

/**
 * Creates a "thunder" or synaptic lightning effect with random, jagged lines.
 */
const Thunder = () => {
    const lines = useMemo(() => {
        const lineSet = [];
        for (let i = 0; i < 7; i++) { // Generate 7 lightning bolts
            const points = [new THREE.Vector3((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, -10)];
            let lastPoint = points[0];
            for (let j = 0; j < 6; j++) { // 6 segments per bolt
                const newPoint = new THREE.Vector3(
                    lastPoint.x + (Math.random() - 0.5) * 6,
                    lastPoint.y + (Math.random() - 0.5) * 6,
                    lastPoint.z
                );
                points.push(newPoint);
                lastPoint = newPoint;
            }
            lineSet.push(points);
        }
        return lineSet;
    }, []);

    return (
        <group>
            {lines.map((points, i) => (
                <Line
                    key={i}
                    points={points}
                    color="#ffffff"
                    lineWidth={4}
                    transparent
                    opacity={1}
                />
            ))}
        </group>
    );
};

/**
 * Renders a cylindrical tunnel of particles.
 */
const NeuralTunnel = () => {
    const ref = useRef<any>(null);
    const count = 5000;
    const radius = 4;
    
    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = radius + (Math.random() - 0.5) * 2.5; // Distribute around a core radius
            const z = (Math.random() - 0.5) * 200; // Spread along the z-axis for depth
            temp[i * 3] = Math.cos(angle) * r;
            temp[i * 3 + 1] = Math.sin(angle) * r;
            temp[i * 3 + 2] = z;
        }
        return temp;
    }, [count, radius]);

    return (
        <Points ref={ref} positions={particles} stride={3}>
            <PointMaterial
                transparent
                color="#00ffff"
                size={0.06}
                sizeAttenuation
                depthWrite={false}
            />
        </Points>
    );
};

/**
 * Manages camera movement for the zoom effect.
 */
const CameraRig = ({ isZooming }: { isZooming: boolean }) => {
    useFrame((state, delta) => {
        if (isZooming) {
            // Accelerate the camera forward into the tunnel
            const acceleration = state.camera.position.z > -50 ? 1 : 4;
            state.camera.position.z -= delta * 25 * acceleration;
        }
        // Add a subtle, smooth sway to the camera
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(state.clock.elapsedTime * 0.4) * 0.3, 0.1);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, Math.cos(state.clock.elapsedTime * 0.4) * 0.3, 0.1);
        state.camera.lookAt(0, 0, state.camera.position.z - 1);
    });
    return null;
};


const Intro: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
    const [stage, setStage] = useState('start');
    const [showSkip, setShowSkip] = useState(false);

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];
        // Sequence of events
        timers.push(setTimeout(() => setShowSkip(true), 1000));
        timers.push(setTimeout(() => setStage('typing'), 1500));
        timers.push(setTimeout(() => setStage('flash'), 5000));
        timers.push(setTimeout(() => setStage('zoom'), 5300));
        timers.push(setTimeout(() => setStage('glitching'), 7300));
        // The timeout from the start of the glitch effect to the main content is now 10ms (0.01s).
        timers.push(setTimeout(onFinished, 7310));

        return () => timers.forEach(clearTimeout);
    }, [onFinished]);
    
    const handleSkip = () => {
        onFinished();
    };

    return (
        <div className="fixed inset-0 bg-black z-[100] overflow-hidden">
            {/* 3D Canvas for the background effects */}
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[0,0,10]} color="cyan" intensity={5} />

                {stage === 'zoom' && <NeuralTunnel />}
                
                <AnimatePresence>
                    {stage === 'flash' && (
                        // Fix: `motion.group` is not a valid component when using `framer-motion` for DOM.
                        // It is a feature of `framer-motion-3d`. Replaced with a standard `group` to
                        // resolve the compilation error. Note: this removes the exit animation.
                        <group>
                            <Thunder />
                        </group>
                    )}
                </AnimatePresence>

                <CameraRig isZooming={stage === 'zoom'} />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.5} height={400} intensity={2.5} />
                    <Glitch
                        delay={new THREE.Vector2(0.5, 1.5)}
                        duration={new THREE.Vector2(0.5, 0.8)}
                        strength={new THREE.Vector2(0.1, 0.3)}
                        active={stage === 'glitching'}
                    />
                </EffectComposer>
            </Canvas>

            {/* UI Overlays */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence>
                    {showSkip && stage !== 'glitching' && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleSkip}
                            className="absolute top-8 right-8 text-white/50 hover:text-white font-jetbrains-mono z-20 px-4 py-2 border border-white/30 rounded-md transition-colors hover:bg-white/10 pointer-events-auto"
                        >
                            [ SKIP ]
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {stage === 'typing' && (
                         <motion.div
                            key="typing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="font-jetbrains-mono text-cyan-glow text-lg md:text-2xl text-center px-4"
                        >
                            <p className="typing-effect">INITIATING CONNECTION TO AI MINDSPACE...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Fullscreen Flash Overlay */}
            <AnimatePresence>
                {stage === 'flash' && (
                     <motion.div
                        key="flash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0.5, 0] }}
                        transition={{ duration: 0.4, times: [0, 0.1, 0.2, 1] }}
                        className="absolute inset-0 bg-cyan-glow z-10 pointer-events-none"
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Intro;