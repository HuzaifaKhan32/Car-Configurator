'use client'

import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import GUI from 'lil-gui'

function TestDomeMesh() {
  const { scene } = useGLTF('/models/environment/Dome.glb')
  const domeRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const gui = new GUI({ title: 'Dome Texture & Reflection Test' })
    
    const params = {
      scale: 0.06,
      materialType: 'Standard',
      roughness: 0.15,
      metalness: 0.9,
      color: '#1a1a1a',
      side: 'BackSide',
    }

    const updateMaterials = () => {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.castShadow = true
          mesh.receiveShadow = true

          if (mesh.material) {
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
            mats.forEach((mat: any) => {
              mat.roughness = params.roughness
              mat.metalness = params.metalness
              mat.color.set(params.color)

              if (params.side === 'BackSide') mat.side = THREE.BackSide
              else if (params.side === 'DoubleSide') mat.side = THREE.DoubleSide
              else mat.side = THREE.FrontSide

              mat.needsUpdate = true
            })
          }
        }
      })
    }

    updateMaterials()

    gui.add(params, 'scale', 0.01, 0.2, 0.001).onChange((v: number) => {
      if (domeRef.current) domeRef.current.scale.set(v, v, v)
    })
    gui.add(params, 'roughness', 0, 1, 0.01).onChange(updateMaterials)
    gui.add(params, 'metalness', 0, 1, 0.01).onChange(updateMaterials)
    gui.addColor(params, 'color').onChange(updateMaterials)
    gui.add(params, 'side', ['BackSide', 'DoubleSide', 'FrontSide']).onChange(updateMaterials)

    return () => { gui.destroy() }
  }, [scene])

  return (
    <group ref={domeRef}>
      <primitive object={scene} scale={0.06} />
    </group>
  )
}

export default function TestDomePage() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#0a0a0a]">
      <div className="absolute top-4 left-4 z-10 text-white bg-black/60 px-4 py-2 rounded-lg backdrop-blur text-sm pointer-events-none">
        <p className="font-bold">Reflective Dome Sandbox</p>
        <p className="text-xs text-zinc-400">Tweak roughness and metalness to make it a mirror studio.</p>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 1, 3], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={['#0a0a0a']} />
        
        <Environment preset="studio" environmentIntensity={1.0} background={false} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />

        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.5, 0.8, 3]} />
          <meshStandardMaterial color="#ff1e1e" metalness={0.8} roughness={0.2} />
        </mesh>

        <TestDomeMesh />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/environment/Dome.glb')
