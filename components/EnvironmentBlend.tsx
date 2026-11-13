'use client'

import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function Dome() {
  const { scene } = useGLTF('/models/environment/Dome.glb')

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.receiveShadow = true // Allows shadows from your Porsche to land on the dome floor/walls

        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
          mats.forEach((mat: any) => {
            // 1. CRITICAL: Render the inside of the sphere since your camera is trapped inside it
            mat.side = THREE.BackSide

            // 2. Simple clean showroom look (dark gray, matte/satin finish)
            mat.color.set('#1a1a1c')
            mat.roughness = 0.85
            mat.metalness = 0.05
            
            mat.needsUpdate = true
          })
        }
      }
    })
  }, [scene])

  return (
    <group>
      {/* Scale set to 0.06 as discovered in your sandbox */}
      <primitive object={scene} scale={0.05} position={[0, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/models/environment/Dome.glb')