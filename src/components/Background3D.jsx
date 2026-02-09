import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Background3D() {
  const meshRef = useRef()
  const particlesRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.02
      meshRef.current.rotation.y = t * 0.03
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.02
    }
  })

  const particleCount = 800
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 40
    positions[i + 1] = (Math.random() - 0.5) * 40
    positions[i + 2] = (Math.random() - 0.5) * 40
  }

  return (
    <group>
      {/* Subtle wireframe mesh */}
      <mesh ref={meshRef} position={[0, 0, -15]}>
        <icosahedronGeometry args={[12, 1]} />
        <meshBasicMaterial
          color="#0a0a0a"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#c9a962"
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>
    </group>
  )
}
