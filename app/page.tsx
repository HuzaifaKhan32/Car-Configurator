'use client'

import dynamic from 'next/dynamic'
import LeftSidebar from '@/components/LeftSidebar'
import RightControls from '@/components/RightControls'
import CameraFooterBar from '@/components/CameraFooterBar'
import BuildSummaryModal from '@/components/BuildSummaryModal'
import { useConfiguratorStore } from '@/store/useConfiguratorStore'

// Dynamically import the 3D Canvas with SSR disabled to prevent WebGL server rendering issues
const CarScene = dynamic(() => import('@/components/CarScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface gap-3 text-on-surface">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary">
        Initializing 3D Studio...
      </span>
    </div>
  ),
})

export default function Page() {
  const ambienceMode = useConfiguratorStore((s) => s.ambienceMode)

  return (
    <main className="relative w-screen h-screen overflow-hidden select-none">
      {/* 1. ARCHITECTURAL DAYLIGHT STUDIO BACKGROUND SIMULATION */}
      <div
        className={`absolute inset-0 z-0 transition-colors duration-700 pointer-events-none overflow-hidden ${
          ambienceMode === 'day'
            ? 'bg-gradient-to-b from-[#f2f3f5] via-[#eaecf0] to-[#dfe3e8]'
            : 'bg-gradient-to-b from-[#0f1117] via-[#141721] to-[#1c202c]'
        }`}
      >
        {/* Studio Overhead Diffused Lighting Rings */}
        <div
          className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[340px] rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
            ambienceMode === 'day' ? 'bg-white/70 opacity-80' : 'bg-blue-400/10 opacity-30'
          }`}
        />
        <div
          className={`absolute top-1/4 -right-20 w-[600px] h-[300px] rounded-full blur-2xl pointer-events-none transition-opacity duration-700 ${
            ambienceMode === 'day' ? 'bg-white/60 opacity-70' : 'bg-indigo-500/10 opacity-20'
          }`}
        />

        {/* Horizon Line & Subtle Architectural Studio Grid */}
        <div className="absolute inset-x-0 top-[58%] h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#191c1e_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* 2. REAL-TIME 3D CAR CANVAS (Full bleed) */}
      <div className="absolute inset-0 z-10">
        <CarScene />
      </div>

      {/* 3. THREE REQUIRED UI ELEMENTS:
          - Left sidebar (with dedicated toggle button)
          - Right sidebar (with dedicated toggle button)
          - Camera footer bar (kept unchanged)
          (Header omitted completely per specification)
      */}
      <LeftSidebar />
      <RightControls />
      <CameraFooterBar />

      {/* 4. SPECIFICATION PASSPORT MODAL */}
      <BuildSummaryModal />
    </main>
  )
}