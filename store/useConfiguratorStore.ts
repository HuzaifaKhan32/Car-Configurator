import { create } from 'zustand'

export type CameraPreset = 'overview' | 'front' | 'rear' | 'side' | 'wheels' | 'cockpit'
export type PaintFinish = 'Gloss' | 'Satin' | 'Matte'
export type EnvironmentPreset = 'Weissach Studio' | 'Pacific Coast' | 'Alpine Pass' | 'Neon Midnight'
export type RimMaterial = "glossy_black" | "matte_black" | "satin" | "carbon" | "brushed_metal" | "chrome"
interface ConfigState {
  // Pricing breakdown
  rimMaterial: RimMaterial
  basePrice: number
  paintCost: number
  wheelCost: number
  caliperCost: number
  mirrorCost: number
  packageCost: number

  // Paint
  bodyColor: string
  paintName: string
  paintFinish: PaintFinish

  // Wheels & Rims
  wheelDesign: string
  rimColor: string
  rimName: string

  // Brakes
  brakeColor: string
  caliperName: string
  brakeSystem: string

  // Accents
  mirrorTrim: string
  sportDesignPackage: boolean

  // Studio & 3D Controls
  environmentPreset: EnvironmentPreset
  isTurntableActive: boolean
  isHeadlightsActive: boolean
  isWireframe: boolean
  isDoorsOpen: boolean
  isMirrorsFolded: boolean
  ambienceMode: 'day' | 'twilight'
  cameraPreset: CameraPreset
  cameraPresetVersion: number

  // UI Sidebar states
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
  isPanelCollapsed: boolean
  summaryModalOpen: boolean

  // Actions
  setRimMaterial: (material: RimMaterial) => void
  setBodyColor: (color: string, name: string, cost: number) => void
  setPaintFinish: (finish: PaintFinish) => void
  setWheelDesign: (design: string, cost: number) => void
  setRimColor: (color: string, name: string) => void
  setCaliper: (color: string, name: string, cost: number) => void
  setBrakeSystem: (system: string) => void
  setMirrorTrim: (trim: string, cost: number) => void
  toggleSportDesign: (enabled: boolean) => void
  setEnvironmentPreset: (preset: EnvironmentPreset) => void
  toggleTurntable: () => void
  toggleHeadlights: () => void
  toggleWireframe: () => void
  toggleDoors: () => void
  toggleMirrors: () => void
  toggleAmbience: () => void
  setCameraPreset: (preset: CameraPreset) => void
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  togglePanelCollapse: () => void
  setSummaryModalOpen: (open: boolean) => void
  resetToDefaults: () => void
  getTotalPrice: () => number
}

export const useConfiguratorStore = create<ConfigState>((set, get) => ({
  basePrice: 197200,
  paintCost: 0,
  wheelCost: 0,
  caliperCost: 0,
  mirrorCost: 0,
  packageCost: 21250,

  bodyColor: '#97999b', // GT Silver Metallic
  paintName: 'GT Silver Metallic',
  paintFinish: 'Gloss',

  wheelDesign: '20/21" 911 Turbo S Exclusive',
  rimColor: '#8a8c8e', // Satin Platinum
  rimName: 'Satin Platinum',
  rimMaterial: "matte_black",

  brakeColor: '#f5d000', // Racing Yellow (PCCB)
  caliperName: 'Racing Yellow (PCCB)',
  brakeSystem: 'Porsche Ceramic Composite (PCCB)',

  mirrorTrim: 'Body Color',
  sportDesignPackage: true,

  environmentPreset: 'Weissach Studio',
  isTurntableActive: true,
  isHeadlightsActive: false,
  isWireframe: false,
  isDoorsOpen: false,
  isMirrorsFolded: false,
  ambienceMode: 'day',
  cameraPreset: 'overview',
  cameraPresetVersion: 0,

  leftSidebarOpen: true,
  rightSidebarOpen: true,
  isPanelCollapsed: false,
  summaryModalOpen: false,

  setBodyColor: (color, name, cost) =>
    set({ bodyColor: color, paintName: name, paintCost: cost }),

  setPaintFinish: (finish) =>
    set({ paintFinish: finish }),

  setWheelDesign: (design, cost) =>
    set({ wheelDesign: design, wheelCost: cost }),

  setRimColor: (color, name) =>
    set({ rimColor: color, rimName: name }),
  
  setRimMaterial: (material: RimMaterial) =>
    set({ rimMaterial: material }),

  setCaliper: (color, name, cost) =>
    set({ brakeColor: color, caliperName: name, caliperCost: cost }),

  setBrakeSystem: (system) =>
    set({ brakeSystem: system }),

  setMirrorTrim: (trim, cost) =>
    set({ mirrorTrim: trim, mirrorCost: cost }),

  toggleSportDesign: (enabled) =>
    set((state) => ({
      sportDesignPackage: enabled,
      packageCost: enabled ? 21250 : 15810,
    })),

  setEnvironmentPreset: (preset) =>
    set({ environmentPreset: preset }),

  toggleTurntable: () =>
    set((state) => ({ isTurntableActive: !state.isTurntableActive })),

  toggleHeadlights: () =>
    set((state) => ({ isHeadlightsActive: !state.isHeadlightsActive })),

  toggleWireframe: () =>
    set((state) => ({ isWireframe: !state.isWireframe })),

  toggleDoors: () =>
    set((state) => ({ isDoorsOpen: !state.isDoorsOpen })),

  toggleMirrors: () =>
    set((state) => ({ isMirrorsFolded: !state.isMirrorsFolded })),

  toggleAmbience: () =>
    set((state) => ({
      ambienceMode: state.ambienceMode === 'day' ? 'twilight' : 'day',
    })),

  setCameraPreset: (preset) =>
    set((state) => ({
      cameraPreset: preset,
      cameraPresetVersion: state.cameraPresetVersion + 1,
    })),

  toggleLeftSidebar: () =>
    set((state) => ({ leftSidebarOpen: !state.leftSidebarOpen })),

  toggleRightSidebar: () =>
    set((state) => ({ rightSidebarOpen: !state.rightSidebarOpen })),

  togglePanelCollapse: () =>
    set((state) => ({ isPanelCollapsed: !state.isPanelCollapsed })),

  setSummaryModalOpen: (open) =>
    set({ summaryModalOpen: open }),

  resetToDefaults: () =>
    set({
      paintCost: 0,
      wheelCost: 0,
      caliperCost: 0,
      mirrorCost: 0,
      packageCost: 0,
      bodyColor: '#97999b',
      paintName: 'GT Silver Metallic',
      paintFinish: 'Gloss',
      wheelDesign: '20/21" 911 Turbo S Exclusive',
      rimColor: '#8a8c8e',
      rimName: 'Satin Platinum',
      brakeColor: '#f5d000',
      caliperName: 'Racing Yellow (PCCB)',
      mirrorTrim: 'Body Color',
      sportDesignPackage: false,
    }),

  getTotalPrice: () => {
    const s = get()
    return (
      s.basePrice +
      s.paintCost +
      s.wheelCost +
      s.caliperCost +
      s.mirrorCost +
      s.packageCost
    )
  },
}))