'use client'

import React, { useState } from 'react'
import { useConfiguratorStore } from '@/store/useConfiguratorStore'
import { playPorscheEngineRev } from '@/lib/sound'

export default function RightControls() {
  const [isRevving, setIsRevving] = useState(false)

  const {
    isHeadlightsActive,
    isWireframe,
    isDoorsOpen,
    isMirrorsFolded,
    ambienceMode,
    rightSidebarOpen,
    toggleHeadlights,
    toggleWireframe,
    toggleDoors,
    toggleMirrors,
    toggleAmbience,
    toggleRightSidebar,
  } = useConfiguratorStore()

  const handleRevClick = () => {
    setIsRevving(true)
    playPorscheEngineRev()
    setTimeout(() => setIsRevving(false), 600)
  }

  const baseButtonClass = 'w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-2xl border border-white/70 shadow-[0_8px_32px_rgba(25,28,30,0.08)]'

  return (
    <>
      {/* Studio Tools Toggle - Top Right */}
      <div className="fixed top-6 right-6 z-30 pointer-events-auto">
        <button
          onClick={toggleRightSidebar}
          aria-label={rightSidebarOpen ? 'Hide Studio Controls' : 'Show Studio Controls'}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(25,28,30,0.08)] transition-all cursor-pointer ${
            rightSidebarOpen
              ? 'bg-white/85 text-on-surface hover:bg-white'
              : 'bg-primary text-on-primary hover:bg-primary/90'
          }`}
          title={rightSidebarOpen ? 'Hide Studio Controls' : 'Show Studio Controls'}
        >
          <span className="font-label-md text-label-md font-medium">
            {rightSidebarOpen ? 'Controls' : 'Studio Tools'}
          </span>
          <span className="material-symbols-outlined text-[18px]">
            {rightSidebarOpen ? 'arrow_forward' : 'tune'}
          </span>
        </button>
      </div>

      {/* Floating Control Buttons - Stacked vertically with smooth spacing */}
      <div
        className={`fixed right-6 top-20 z-30 pointer-events-auto flex flex-col gap-3 transition-opacity duration-300 ${
          rightSidebarOpen
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Headlights */}
        <button
          onClick={toggleHeadlights}
          className={`${baseButtonClass} ${
            isHeadlightsActive
              ? 'bg-white/85 text-on-surface'
              : 'bg-white/75 text-on-surface-variant hover:bg-white/85'
          } relative`}
          title="Matrix LED Headlights"
        >
          <span className="material-symbols-outlined text-[20px]">highlight</span>
          <span
            className={`absolute right-1.5 top-1.5 w-2 h-2 rounded-full transition-all ${
              isHeadlightsActive
                ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b] scale-110'
                : 'bg-secondary-fixed-dim'
            }`}
          />
        </button>

        {/* Ambience */}
        <button
          onClick={toggleAmbience}
          className={`${baseButtonClass} bg-white/75 text-on-surface-variant hover:bg-white/85`}
          title={`Showroom Ambience (${ambienceMode === 'day' ? 'Daylight 5600K' : 'Twilight Dusk'})`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {ambienceMode === 'day' ? 'wb_twilight' : 'wb_sunny'}
          </span>
        </button>

        {/* Sound FX */}
        <button
          onClick={handleRevClick}
          className={`${baseButtonClass} ${
            isRevving
              ? 'scale-125 bg-primary text-on-primary'
              : 'bg-white/75 text-on-surface-variant hover:bg-white/85'
          }`}
          title="Twin-Turbo Flat-6 Exhaust Note"
        >
          <span className={`material-symbols-outlined text-[20px] ${isRevving ? 'animate-pulse' : ''}`}>
            volume_up
          </span>
        </button>

        {/* Wireframe */}
        <button
          onClick={toggleWireframe}
          className={`${baseButtonClass} ${
            isWireframe
              ? 'bg-primary text-on-primary'
              : 'bg-white/75 text-on-surface-variant hover:bg-white/85'
          }`}
          title="CAD Wireframe Overlay"
        >
          <span className="material-symbols-outlined text-[20px]">grid_4x4</span>
        </button>

        {/* Doors */}
        <button
          onClick={toggleDoors}
          className={`${baseButtonClass} ${
            isDoorsOpen
              ? 'bg-primary text-on-primary'
              : 'bg-white/75 text-on-surface-variant hover:bg-white/85'
          } relative`}
          title={isDoorsOpen ? 'Close Doors' : 'Open Doors'}
        >
          <span className="material-symbols-outlined text-[20px]">sensor_door</span>
          <span
            className={`absolute right-1.5 top-1.5 w-2 h-2 rounded-full transition-all ${
              isDoorsOpen
                ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] scale-110'
                : 'bg-secondary-fixed-dim'
            }`}
          />
        </button>

        {/* Mirrors */}
        <button
          onClick={toggleMirrors}
          className={`${baseButtonClass} ${
            isMirrorsFolded
              ? 'bg-primary text-on-primary'
              : 'bg-white/75 text-on-surface-variant hover:bg-white/85'
          } relative`}
          title={isMirrorsFolded ? 'Unfold Mirrors' : 'Fold Power Mirrors'}
        >
          <span className="material-symbols-outlined text-[20px]">sync_alt</span>
          <span
            className={`absolute right-1.5 top-1.5 w-2 h-2 rounded-full transition-all ${
              isMirrorsFolded
                ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee] scale-110'
                : 'bg-secondary-fixed-dim'
            }`}
          />
        </button>
      </div>
    </>
  )
}
