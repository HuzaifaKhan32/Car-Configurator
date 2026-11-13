'use client'

import React, { Suspense, useEffect, useRef } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
import { Environment, useGLTF, ContactShadows, Center, CameraControls } from '@react-three/drei'
import * as THREE from 'three'
import { useConfiguratorStore, CameraPreset } from '@/store/useConfiguratorStore'
import Dome from './EnvironmentBlend'

// Camera Preset coordinates: [x, y, z] for position and target
const PRESET_COORDINATES: Record<
  CameraPreset,
  { pos: [number, number, number]; target: [number, number, number]; minDistance: number; maxDistance?: number }
> = {
  overview: { pos: [4.2, 1.4, 4.2], target: [0, 0.5, 0], minDistance: 2.2, maxDistance: 8 },
  front: { pos: [5.6, 1.25, 0], target: [0, 0.55, 0], minDistance: 2.0, maxDistance: 8 },
  rear: { pos: [-5.6, 1.25, 0], target: [0, 0.55, 0], minDistance: 2.0, maxDistance: 8 },
  side: { pos: [0, 0.85, 4.5], target: [0, 0.5, 0], minDistance: 2.0, maxDistance: 8 },
  wheels: { pos: [1.9, 0.5, 1.7], target: [0.8, 0.35, 1.1], minDistance: 0.8, maxDistance: 2.8 },
  cockpit: { pos: [-0.75, 1.10, 0], target: [-0.50, 1.02, 0], minDistance: 0.15, maxDistance: 0.50 },
}

// Door front-hinge pivots and animation constants
const PIVOT_SCALE = 100 // RootNode is in centimeters (world scale 0.01)
const PIVOT_DOOR_1 = new THREE.Vector3(-1.552, 0.453, 0.869).multiplyScalar(PIVOT_SCALE)
const PIVOT_DOOR_2 = new THREE.Vector3(-1.552, 0.453, -0.869).multiplyScalar(PIVOT_SCALE) // Right / Passenger hinge
const MAX_DOOR_ANGLE = THREE.MathUtils.degToRad(38)           // ~38 degrees normal car swing
const UP_AXIS = new THREE.Vector3(0, 1, 0)
const _doorTempVec = new THREE.Vector3()

// Mirror stalk-hinge pivots in door local coordinates
const PIVOT_MIRROR_1 = new THREE.Vector3(-197.5, -84.0, 77.0) // Left / Driver mirror stalk
const PIVOT_MIRROR_2 = new THREE.Vector3(-197.5, 84.0, 77.0)  // Right / Passenger mirror stalk
const MIRROR_FOLD_ANGLE = 0.40                                // ~23 degrees inward fold
const MIRROR_AXIS = new THREE.Vector3(0, 0, 1)
const _mirrorTempVec = new THREE.Vector3()
const _deltaPosM1 = new THREE.Vector3()
const _deltaPosM2 = new THREE.Vector3()

// Headlight & Taillight tuning constants (calibrated to prevent glare/eyesore)
const HEADLIGHT_INTENSITY = 900
const TAILLIGHT_INTENSITY = 350
const FRONT_EMISSIVE_INTENSITY = 3.2
const REAR_EMISSIVE_INTENSITY = 3.8

function Car() {
  const { scene } = useGLTF('/models/cars/scene-transformed.glb')

  const bodyColor = useConfiguratorStore((s) => s.bodyColor)
  const paintFinish = useConfiguratorStore((s) => s.paintFinish)
  const brakeColor = useConfiguratorStore((s) => s.brakeColor)
  const rimColor = useConfiguratorStore((s) => s.rimColor)
  const rimMaterial = useConfiguratorStore((s) => s.rimMaterial)
  const isWireframe = useConfiguratorStore((s) => s.isWireframe)
  const isHeadlightsActive = useConfiguratorStore((s) => s.isHeadlightsActive)
  const isDoorsOpen = useConfiguratorStore((s) => s.isDoorsOpen)
  const isMirrorsFolded = useConfiguratorStore((s) => s.isMirrorsFolded)

  const door1Ref = useRef<THREE.Object3D | null>(null)
  const door2Ref = useRef<THREE.Object3D | null>(null)
  const mirror1Ref = useRef<THREE.Object3D | null>(null)
  const mirror2Ref = useRef<THREE.Object3D | null>(null)
  const cover1Ref = useRef<THREE.Object3D | null>(null)
  const cover2Ref = useRef<THREE.Object3D | null>(null)

  // Shelf reference for headlights & taillights animation access
  const headlightsRef = useRef<THREE.SpotLight[]>([])
  const taillightsRef = useRef<THREE.SpotLight[]>([])

  const doorAnimProgress = useRef(0)
  const mirrorAnimProgress = useRef(0)

  // Headlight & Taillight Spotlights system
  useEffect(() => {
    headlightsRef.current = []
    taillightsRef.current = []

    const frontPositions: [number, number, number][] = [
      [-0.637, 0.577, 0.7],
      [-0.637, 0.577, -0.7],
    ]

    const rearPositions: [number, number, number][] = [
      [-4.26, 0.62, 0.55],
      [-4.26, 0.62, -0.55],
    ]

    const extras: THREE.Object3D[] = []
    const lights: THREE.SpotLight[] = []

    // 1. Front Projector Headlights (aiming forward along +X)
    frontPositions.forEach((p) => {
      const light = new THREE.SpotLight('#f5faff', 0)
      light.position.set(p[0], p[1], p[2])
      light.angle = 0.42
      light.penumbra = 0.65
      light.distance = 16
      light.decay = 2

      const target = new THREE.Object3D()
      target.position.set(p[0] + 6, p[1] - 0.45, p[2])
      scene.add(target)
      light.target = target

      scene.add(light)
      lights.push(light)
      headlightsRef.current.push(light)
      extras.push(light, target)
    })

    // 2. Rear Brake/Taillights (aiming backward along -X with rich red glow)
    rearPositions.forEach((p) => {
      const light = new THREE.SpotLight('#ff1e1e', 0)
      light.position.set(p[0], p[1], p[2])
      light.angle = 0.55
      light.penumbra = 0.75
      light.distance = 8
      light.decay = 2

      const target = new THREE.Object3D()
      target.position.set(p[0] - 5, p[1] - 0.35, p[2])
      scene.add(target)
      light.target = target

      scene.add(light)
      lights.push(light)
      taillightsRef.current.push(light)
      extras.push(light, target)
    })

    return () => {
      extras.forEach((o) => scene.remove(o))
      lights.forEach((l) => l.dispose())
      headlightsRef.current = []
      taillightsRef.current = []
    }
  }, [scene])



  useEffect(() => {
    scene.traverse((child) => {
      if (child.name.toLowerCase().includes("wheel_rim")) {
        let matches = false

        if (rimMaterial === 'chrome' && child.name.toLowerCase().includes('chrome')) {
          matches = true
        } else if (rimMaterial === 'glossy_black' && (child.name.toLowerCase().includes('black') || child.name.toLowerCase().includes('glossy'))) {
          matches = true
        } else if (rimMaterial === 'matte_black' && child.name.toLowerCase().includes('black')) {
          matches = true
        } else if (child.name === 'wheel_rim') {
          matches = true
        }

        child.visible = matches
      }
    })
  }, [scene, rimMaterial])

  useEffect(() => {
    door1Ref.current = scene.getObjectByName('door_1') || null
    door2Ref.current = scene.getObjectByName('door_2') || null
    mirror1Ref.current = scene.getObjectByName('mirror_door_1') || null
    mirror2Ref.current = scene.getObjectByName('mirror_door_2') || null
    cover1Ref.current = scene.getObjectByName('mirror_cover_door_1') || null
    cover2Ref.current = scene.getObjectByName('mirror_cover_door_2') || null
  }, [scene])

  useFrame((_, delta) => {
    const step = Math.min(1, delta * 3.5)

    // 1. Smoothly animate headlights and taillights intensity (balanced dimmer switch lerp pattern)
    const targetHeadlights = isHeadlightsActive ? HEADLIGHT_INTENSITY : 0
    headlightsRef.current.forEach((light) => {
      light.intensity = THREE.MathUtils.lerp(light.intensity, targetHeadlights, step)
    })

    const targetTaillights = isHeadlightsActive ? TAILLIGHT_INTENSITY : 0
    taillightsRef.current.forEach((light) => {
      light.intensity = THREE.MathUtils.lerp(light.intensity, targetTaillights, step)
    })

    // Smooth door opening/closing animation around front hinge pivots
    const targetDoor = isDoorsOpen ? 1 : 0
    doorAnimProgress.current = THREE.MathUtils.lerp(doorAnimProgress.current, targetDoor, step)
    const pDoor = doorAnimProgress.current

    // Driver Door (door_1) — swings outward to +Z
    if (door1Ref.current) {
      const angle1 = pDoor * MAX_DOOR_ANGLE
      _doorTempVec.copy(PIVOT_DOOR_1).applyAxisAngle(UP_AXIS, angle1)
      door1Ref.current.position.copy(PIVOT_DOOR_1).sub(_doorTempVec)
      door1Ref.current.rotation.set(-Math.PI / 2, 0, angle1)
    }

    // Passenger Door (door_2) — swings outward to -Z
    if (door2Ref.current) {
      const angle2 = -pDoor * MAX_DOOR_ANGLE
      _doorTempVec.copy(PIVOT_DOOR_2).applyAxisAngle(UP_AXIS, angle2)
      door2Ref.current.position.copy(PIVOT_DOOR_2).sub(_doorTempVec)
      door2Ref.current.rotation.set(-Math.PI / 2, 0, angle2)
    }

    // Smooth mirror folding animation around stalk pivots
    const targetMirror = isMirrorsFolded ? 1 : 0
    mirrorAnimProgress.current = THREE.MathUtils.lerp(mirrorAnimProgress.current, targetMirror, step)
    const pMirror = mirrorAnimProgress.current

    // Driver side mirror assembly (mirror + housing)
    const foldAngle1 = -pMirror * MIRROR_FOLD_ANGLE
    _mirrorTempVec.copy(PIVOT_MIRROR_1).applyAxisAngle(MIRROR_AXIS, foldAngle1)
    _deltaPosM1.copy(PIVOT_MIRROR_1).sub(_mirrorTempVec)

    if (mirror1Ref.current) {
      mirror1Ref.current.position.copy(_deltaPosM1)
      mirror1Ref.current.rotation.z = foldAngle1
    }
    if (cover1Ref.current) {
      cover1Ref.current.position.copy(_deltaPosM1)
      cover1Ref.current.rotation.z = foldAngle1
    }

    // Passenger side mirror assembly (mirror + housing)
    const foldAngle2 = pMirror * MIRROR_FOLD_ANGLE
    _mirrorTempVec.copy(PIVOT_MIRROR_2).applyAxisAngle(MIRROR_AXIS, foldAngle2)
    _deltaPosM2.copy(PIVOT_MIRROR_2).sub(_mirrorTempVec)

    if (mirror2Ref.current) {
      mirror2Ref.current.position.copy(_deltaPosM2)
      mirror2Ref.current.rotation.z = foldAngle2
    }
    if (cover2Ref.current) {
      cover2Ref.current.position.copy(_deltaPosM2)
      cover2Ref.current.rotation.z = foldAngle2
    }
  })

  // 1. Run ONCE on mount: Clone materials and decouple front/rear optical components
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh

        if (mesh.name.toLowerCase().includes('invisible')) {
          mesh.visible = false
          return
        }

        mesh.castShadow = true
        mesh.receiveShadow = true

        // Decouple shared lights material on transparent outer cover (mesh_28)
        if (mesh.name === 'mesh_28' || mesh.name.includes('trans_covers')) {
          if (mesh.material) {
            const clearMat = Array.isArray(mesh.material) ? mesh.material[0].clone() : mesh.material.clone()
            clearMat.name = 'trans_covers_clear'
            mesh.material = clearMat
          }
        } else if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((mat) => mat.clone())
          } else {
            mesh.material = mesh.material.clone()
          }
        }

        // Split mesh_8 (lights_pattern_all) into front headlights pattern and rear taillight bar
        if ((mesh.name === 'mesh_8' || mesh.name.includes('lights_pattern')) && !mesh.userData.splitDone) {
          mesh.userData.splitDone = true
          const geom = mesh.geometry
          const indices = geom.index ? Array.from(geom.index.array) : []
          const pos = geom.attributes.position
          if (indices.length > 0 && pos) {
            const frontIdx: number[] = []
            const rearIdx: number[] = []
            for (let i = 0; i < indices.length; i += 3) {
              const i0 = indices[i], i1 = indices[i + 1], i2 = indices[i + 2]
              const avgX = (pos.getX(i0) + pos.getX(i1) + pos.getX(i2)) / 3
              if (avgX > -150) {
                frontIdx.push(i0, i1, i2)
              } else {
                rearIdx.push(i0, i1, i2)
              }
            }
            if (frontIdx.length > 0 && rearIdx.length > 0) {
              const baseMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material
              const frontMat = baseMat.clone()
              frontMat.name = 'headlights_pattern_front'
              const rearMat = baseMat.clone()
              rearMat.name = 'taillights_pattern_rear'

              const reordered = new Uint16Array([...frontIdx, ...rearIdx])
              geom.setIndex(new THREE.BufferAttribute(reordered, 1))
              geom.clearGroups()
              geom.addGroup(0, frontIdx.length, 0)
              geom.addGroup(frontIdx.length, rearIdx.length, 1)
              mesh.material = [frontMat, rearMat]
            }
          }
        }
      }
    })
  }, [scene])

  // 2. Efficiently update materials on store change
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]

        mats.forEach((mat: any) => {
          if (!mat) return

          // Wireframe mode
          mat.wireframe = isWireframe

          // Exterior paint
          if (mat.name === 'body_main') {
            mat.color.set(bodyColor)
            mat.envMapIntensity = 1.3

            if (paintFinish === 'Gloss') {
              mat.roughness = 0.12
              mat.metalness = 0.85
              if ('clearcoat' in mat) mat.clearcoat = 1.0
            } else if (paintFinish === 'Satin') {
              mat.roughness = 0.38
              mat.metalness = 0.6
              if ('clearcoat' in mat) mat.clearcoat = 0.4
            } else if (paintFinish === 'Matte') {
              mat.roughness = 0.72
              mat.metalness = 0.15
              if ('clearcoat' in mat) mat.clearcoat = 0.0
            }
          }

          // Brake calipers
          if (mat.name === 'brakes') {
            mat.color.set(brakeColor)
            mat.roughness = 0.25
            mat.metalness = 0.7
          }

          // Wheel rims
          if (mat.name === 'rim_black' || mat.name === 'rim_chrome') {
            mat.color.set(rimColor)
            mat.roughness = 0.2
            mat.metalness = 0.9
          }

          const matName = mat.name ?? ''
          const meshName = mesh.name ?? ''

          // A. Front Headlights (Projector bulbs, 4-point halo rings, front optic matrix)
          // Emits crisp, balanced cool-white LED without blinding eyesore glare
          const isFrontLight =
            meshName === 'mesh_23' ||
            meshName.includes('headlights_flash') ||
            meshName === 'mesh_34' ||
            meshName.includes('headlights_plastic_ring') ||
            matName === 'headlights_pattern_front' ||
            matName === 'headlights_plastic_ring' ||
            (matName === 'lights' && meshName !== 'mesh_28' && !meshName.includes('trans_covers'))

          if (isFrontLight) {
            if (mat.emissive) {
              if (isHeadlightsActive) {
                mat.emissive.set('#eaf4ff')
                mat.emissiveIntensity = FRONT_EMISSIVE_INTENSITY
              } else {
                mat.emissive.set('#000000')
                mat.emissiveIntensity = 0
              }
            }
            return
          }

          // B. Rear Backlights & Brake Lights (Porsche full-width LED light bar & rear optics)
          // Emits vibrant, saturated carmine red
          const isRearLight =
            meshName === 'mesh_16' ||
            meshName.includes('red_light_back') ||
            matName === 'red_light_main' ||
            matName === 'taillights_pattern_rear'

          if (isRearLight) {
            if (mat.emissive) {
              if (isHeadlightsActive) {
                mat.emissive.set('#ff1212')
                mat.emissiveIntensity = REAR_EMISSIVE_INTENSITY
              } else {
                mat.emissive.set('#000000')
                mat.emissiveIntensity = 0
              }
            }
            return
          }

          // C. Transparent outer covers (mesh_28): Ensure realistic non-emissive clear lens
          if (meshName === 'mesh_28' || meshName.includes('trans_covers') || matName === 'trans_covers_clear') {
            if (mat.emissive) {
              mat.emissive.set('#000000')
              mat.emissiveIntensity = 0
            }
          }
        })
      }
    })
  }, [scene, bodyColor, paintFinish, brakeColor, rimColor, isWireframe, isHeadlightsActive])

  return (
    <primitive
      object={scene}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
      }}
    />
  )
}

useGLTF.preload('/models/cars/scene-transformed.glb')

export default function CarScene() {
  const controlsRef = useRef<any>(null)
  const cameraPreset = useConfiguratorStore((s) => s.cameraPreset)
  const cameraPresetVersion = useConfiguratorStore((s) => s.cameraPresetVersion)
  const isTurntableActive = useConfiguratorStore((s) => s.isTurntableActive)
  const ambienceMode = useConfiguratorStore((s) => s.ambienceMode)
  const environmentPreset = useConfiguratorStore((s) => s.environmentPreset)

  const goToView = (position: [number, number, number], target: [number, number, number]) => {
    controlsRef.current?.setLookAt(...position, ...target, true)
  }

  useEffect(() => {
    const coords = PRESET_COORDINATES[cameraPreset]
    if (coords) {
      goToView(coords.pos, coords.target)
    }
  }, [cameraPreset, cameraPresetVersion])

  // Map studio environment preset to Drei built-in environment presets
  const envPreset =
    environmentPreset === 'Pacific Coast'
      ? 'sunset'
      : environmentPreset === 'Alpine Pass'
        ? 'forest'
        : environmentPreset === 'Neon Midnight'
          ? 'night'
          : 'studio'

  return (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <Canvas
      shadows
  camera={{ position: [4.2, 1.4, 4.2], fov: 32 }}
  dpr={[1, 2]}
  gl={{
    antialias: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 0.95,
  }}
  onCreated={({ gl }) => {
    gl.setClearColor('#121214') // Sets a solid dark studio background color
  }}
    >
      <gridHelper args={[20, 20, '#ffffff', '#444444']} position={[0, 0, 0]} />
<axesHelper args={[5]} />
      <Suspense fallback={null}>
        {/* The dome is the scene: no fog, no background color, no big floor plane */}
        <Dome />

        <Center top>
          <Car />
        </Center>

        {/* Reflections and ambient light only, no visible background */}
        <Environment
          preset={envPreset}
        />

        {/* One main light for shadows and a soft fill */}
        <directionalLight
          position={[10, 14, 6]}
          intensity={ambienceMode === 'day' ? 0.9 : 0.4}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight
          position={[-10, 8, -6]}
          intensity={ambienceMode === 'day' ? 0.4 : 0.2}
        />
        {/* <ambientLight intensity={ambienceMode === 'day' ? 0.1 : 0.05} /> */}

        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.9}
          scale={10}
          blur={2}
          far={1.2}
          color="#000000"
        />

        {/* Bloom goes last so it processes the whole scene */}
        {/* <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={1.2}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer> */}
      </Suspense>

      <CameraControls
        ref={controlsRef}
        makeDefault
        dampingFactor={0.06}
        minDistance={PRESET_COORDINATES[cameraPreset].minDistance}
        maxDistance={PRESET_COORDINATES[cameraPreset].maxDistance ?? 8}
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
    </Canvas>
  </div>
)
}