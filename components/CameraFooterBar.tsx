'use client'

import React, { useEffect } from 'react'
import { useConfiguratorStore, CameraPreset } from '@/store/useConfiguratorStore'

const CAMERA_PRESETS: { id: CameraPreset; label: string; keyNumber: string }[] = [
  { id: 'overview', label: 'Overview', keyNumber: '1' },
  { id: 'front', label: 'Front', keyNumber: '2' },
  { id: 'rear', label: 'Rear', keyNumber: '3' },
  { id: 'side', label: 'Profile', keyNumber: '4' },
  { id: 'wheels', label: 'Wheels', keyNumber: '5' },
  { id: 'cockpit', label: 'Cockpit', keyNumber: '6' },
]

export default function CameraFooterBar() {
  const cameraPreset = useConfiguratorStore((s) => s.cameraPreset)
  const setCameraPreset = useConfiguratorStore((s) => s.setCameraPreset)

  // Keyboard shortcut listener for camera switching (1-6)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      const key = e.key
      if (['1', '2', '3', '4', '5', '6'].includes(key)) {
        const idx = parseInt(key, 10) - 1
        if (CAMERA_PRESETS[idx]) {
          setCameraPreset(CAMERA_PRESETS[idx].id)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setCameraPreset])

  return (
    <div className="fixed bottom-6 inset-x-0 z-30 pointer-events-none flex flex-col items-center gap-2">
      {/* Camera Preset Floating Dock */}
      <nav
        aria-label="Camera Presets"
        className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-white/75 backdrop-blur-[28px] border border-white/60 shadow-[0_20px_48px_-8px_rgba(25,28,30,0.12)]"
      >
        {CAMERA_PRESETS.map((preset) => {
          const isActive = cameraPreset === preset.id
          return (
            <button
              key={preset.id}
              onClick={() => setCameraPreset(preset.id)}
              className={`cam-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary font-medium shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
              }`}
            >
              <span>{preset.label}</span>
              <span
                className={`font-label-caps text-[9px] px-1 py-0.2 rounded ${
                  isActive
                    ? 'bg-white/20 text-on-primary'
                    : 'bg-surface-container-highest text-secondary'
                }`}
              >
                {preset.keyNumber}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Attribution Credit Sub-line */}
      <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/45 backdrop-blur-md border border-white/40 shadow-xs">
        <span className="font-body-sm text-[11px] text-secondary">
          3D Model: “Porsche 911 with interior” by n.brizitskaya, licensed under CC BY 4.0. Built with React Three Fiber, Drei & Zustand.
        </span>
      </div>
    </div>
  )
}
