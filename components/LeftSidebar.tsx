'use client'

import React, { useRef, useState } from 'react'
import {
  useConfiguratorStore,
  PaintFinish,
  EnvironmentPreset,
} from '@/store/useConfiguratorStore'

const PAINT_SWATCHES = [
  {
    name: 'GT Silver Metallic',
    cost: 0,
    hex: '#97999b',
    gradient: 'from-[#97999b] via-[#c4c6ce] to-[#f0f2f5]',
  },
  {
    name: 'Guards Red',
    cost: 0,
    hex: '#d42222',
    gradient: 'from-[#a81313] via-[#d42222] to-[#ff4747]',
  },
  {
    name: 'Racing Yellow',
    cost: 0,
    hex: '#ffd014',
    gradient: 'from-[#cca20c] via-[#ffd014] to-[#ffea75]',
  },
  {
    name: 'Gentian Blue Metallic',
    cost: 840,
    hex: '#1b3d6c',
    gradient: 'from-[#0a1e38] via-[#1b3d6c] to-[#3f6ea8]',
  },
  {
    name: 'Jet Black Metallic',
    cost: 840,
    hex: '#222428',
    gradient: 'from-[#111214] via-[#222428] to-[#45474d]',
  },
  {
    name: 'Crayon / Chalk Special',
    cost: 3270,
    hex: '#dbdcda',
    gradient: 'from-[#bfc0be] via-[#dbdcda] to-[#ededeb]',
  },
  {
    name: 'Python Green Special',
    cost: 3270,
    hex: '#2cb353',
    gradient: 'from-[#157833] via-[#2cb353] to-[#71db8c]',
  },
]

const RIM_OPTIONS = [
  { name: 'Satin Platinum', hex: '#8a8c8e' },
  { name: 'High Gloss Black', hex: '#1a1c1e' },
  { name: 'Titanium Metallic', hex: '#5a5c60' },
  { name: 'Neodyme Gold', hex: '#b39e7a' },
]

const CALIPER_OPTIONS = [
  { name: 'Racing Yellow (PCCB)', hex: '#f5d000', cost: 0 },
  { name: 'Guards Red', hex: '#d11f1f', cost: 0 },
  { name: 'Acid Green', hex: '#9ded00', cost: 900 },
  { name: 'High Gloss Black', hex: '#16191f', cost: 900 },
]

export default function LeftSidebar() {
  const [activeTab, setActiveTab] = useState<'paint' | 'wheels' | 'brakes' | 'accent' | 'environment'>('paint')
  const customColorInputRef = useRef<HTMLInputElement>(null)

  const {
    bodyColor,
    paintName,
    paintCost,
    paintFinish,
    wheelDesign,
    wheelCost,
    rimColor,
    rimMaterial,
    setRimMaterial,
    caliperName,
    brakeSystem,
    mirrorTrim,
    sportDesignPackage,
    environmentPreset,
    isTurntableActive,
    leftSidebarOpen,
    isPanelCollapsed,
    setBodyColor,
    setPaintFinish,
    setWheelDesign,
    setRimColor,
    setCaliper,
    setBrakeSystem,
    setMirrorTrim,
    toggleSportDesign,
    setEnvironmentPreset,
    toggleTurntable,
    toggleLeftSidebar,
    togglePanelCollapse,
    setSummaryModalOpen,
    getTotalPrice,
  } = useConfiguratorStore()

  const totalPrice = getTotalPrice()
  const formattedPrice = '$' + totalPrice.toLocaleString()

  return (
    <>
      {/* 1. TOGGLE BUTTON FOR LEFT SIDEBAR */}
      <div className="fixed top-6 left-6 z-30 pointer-events-auto transition-transform duration-300">
        <button
          onClick={toggleLeftSidebar}
          aria-label={leftSidebarOpen ? 'Close Customizer' : 'Open Customizer'}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(25,28,30,0.08)] transition-all cursor-pointer ${
            leftSidebarOpen
              ? 'bg-white/85 text-on-surface hover:bg-white'
              : 'bg-primary text-on-primary hover:bg-primary/90'
          }`}
          title={leftSidebarOpen ? 'Hide Customizer Panel' : 'Show Customizer Panel'}
        >
          <span className="material-symbols-outlined text-[18px]">
            {leftSidebarOpen ? 'arrow_back' : 'tune'}
          </span>
          <span className="font-label-md text-label-md font-medium">
            {leftSidebarOpen ? 'Hide' : 'Configure 911'}
          </span>
        </button>
      </div>

      {/* 2. FLOATING LEFT CUSTOMIZATION PANEL (320px) */}
      <aside
        id="config-panel"
        className={`fixed top-20 left-6 z-30 w-80 max-h-[calc(100vh-170px)] pointer-events-auto rounded-[24px] bg-white/75 backdrop-blur-[28px] border border-white/60 shadow-[0_20px_48px_-12px_rgba(25,28,30,0.12)] flex flex-col overflow-hidden transition-all duration-300 ${
          leftSidebarOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-[calc(100%+32px)] pointer-events-none'
        }`}
      >
        {/* Inspector Header */}
        <div className="p-5 pb-3 flex items-start justify-between bg-white/40 border-b border-black/[0.04]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                911 Turbo
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-label-caps font-label-caps uppercase">
                MY2025
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mt-0.5">
              Coupe · 3.7L Twin-Turbo · 572 hp
            </p>
          </div>
          <button
            onClick={togglePanelCollapse}
            className="w-7 h-7 rounded-full bg-surface-container-high/60 hover:bg-surface-container-high flex items-center justify-center text-secondary transition-colors cursor-pointer"
            title={isPanelCollapsed ? 'Expand Panel' : 'Collapse Panel'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPanelCollapsed ? 'expand_more' : 'expand_less'}
            </span>
          </button>
        </div>

        {/* Customizer Category Tabs */}
        {!isPanelCollapsed && (
          <div className="px-3 py-2 flex items-center gap-1 overflow-x-auto scrollbar-none bg-white/30 border-b border-black/[0.03]">
            {(
              [
                { id: 'paint', label: 'Paint' },
                { id: 'wheels', label: 'Wheels' },
                { id: 'brakes', label: 'Brakes' },
                { id: 'accent', label: 'Accent' },
                { id: 'environment', label: 'Studio' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cat-tab px-3 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary text-on-primary font-medium shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Inspector Content */}
        {!isPanelCollapsed && (
          <div
            id="panel-content"
            className="p-5 overflow-y-auto space-y-5"
            style={{ maxHeight: 'calc(100vh - 290px)' }}
          >
            {/* TAB 1: PAINT */}
            {activeTab === 'paint' && (
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider font-semibold">
                    Exterior Color
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium truncate max-w-[170px] text-right">
                    {paintName}
                  </span>
                </div>

                {/* 40px Swatches Grid */}
                <div className="grid grid-cols-4 gap-3 py-1">
                  {PAINT_SWATCHES.map((swatch) => {
                    const isSelected = bodyColor.toLowerCase() === swatch.hex.toLowerCase()
                    return (
                      <button
                        key={swatch.name}
                        onClick={() => setBodyColor(swatch.hex, swatch.name, swatch.cost)}
                        className={`group relative flex items-center justify-center w-10 h-10 rounded-full ring-offset-2 ring-offset-white transition-all cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-primary scale-105'
                            : 'hover:ring-2 hover:ring-outline-variant'
                        }`}
                        title={swatch.name}
                      >
                        <span
                          className={`w-8 h-8 rounded-full bg-gradient-to-tr ${swatch.gradient} shadow-inner border border-black/10`}
                        />
                      </button>
                    )
                  })}

                  {/* Custom PTS Swatch Button */}
                  <button
                    onClick={() => {
                      if (customColorInputRef.current) {
                        customColorInputRef.current.click()
                      }
                    }}
                    className={`group relative flex items-center justify-center w-10 h-10 rounded-full ring-offset-2 ring-offset-white transition-all cursor-pointer ${
                      paintName.includes('PTS')
                        ? 'ring-2 ring-primary scale-105'
                        : 'hover:ring-2 hover:ring-outline-variant'
                    }`}
                    title="Paint to Sample (PTS) Custom Color"
                  >
                    <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 via-rose-300 to-amber-200 shadow-inner flex items-center justify-center border border-black/10">
                      <span className="material-symbols-outlined text-[14px] text-on-surface">
                        colorize
                      </span>
                    </span>
                    <input
                      ref={customColorInputRef}
                      type="color"
                      className="sr-only"
                      onChange={(e) =>
                        setBodyColor(e.target.value, `PTS Paint to Sample (${e.target.value})`, 13150)
                      }
                    />
                  </button>
                </div>

                {/* Finish Toggle Pills */}
                <div className="pt-2">
                  <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider font-semibold block mb-2">
                    Surface Lustre
                  </span>
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-full bg-surface-container-high/60">
                    {(['Gloss', 'Satin', 'Matte'] as PaintFinish[]).map((finish) => (
                      <button
                        key={finish}
                        onClick={() => setPaintFinish(finish)}
                        className={`finish-btn py-1 px-3 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                          paintFinish === finish
                            ? 'bg-white text-on-surface font-medium shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Spec Footnote */}
                <div className="p-3 rounded-xl bg-surface-container-low/70 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">
                    verified
                  </span>
                  <p className="font-body-sm text-body-sm text-secondary">
                    Cathodic electrodeposition primer with multi-layer UV clearcoat protection.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: WHEELS */}
            {activeTab === 'wheels' && (
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider font-semibold">
                    Rim Material Design
                  </span>
                  <span className="font-body-sm text-body-sm text-primary font-medium">
                    Active Style
                  </span>
                </div>

                {/* Visual Rim Material Cards */}
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    {
                      id: 'chrome',
                      title: 'Chrome Polished Finish',
                      subtitle: 'High-reflectivity metallic sheen',
                      gradient: 'from-slate-200 via-white to-slate-400',
                    },
                    {
                      id: 'glossy_black',
                      title: 'High Gloss Black',
                      subtitle: 'Deep obsidian gloss coat',
                      gradient: 'from-zinc-700 via-zinc-900 to-black',
                    },
                    {
                      id: 'matte_black',
                      title: 'Matte Dark Stealth',
                      subtitle: 'Anti-reflective track texture',
                      gradient: 'from-zinc-600 via-zinc-700 to-zinc-800',
                    },
                  ].map((rim) => {
                    const isSelected = rimMaterial === rim.id
                    return (
                      <div
                        key={rim.id}
                        onClick={() => setRimMaterial(rim.id as any)}
                        className={`p-2.5 rounded-xl shadow-sm cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-white/95 ring-2 ring-primary shadow-md'
                            : 'bg-white/40 hover:bg-white/70 ring-1 ring-outline-variant/40'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${rim.gradient} shadow-inner flex items-center justify-center shrink-0 border border-black/10`}>
                          <span className="material-symbols-outlined text-[20px] text-white/80 drop-shadow">
                            radio_button_checked
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-label-md text-label-md text-on-surface font-medium truncate">
                            {rim.title}
                          </h4>
                          <p className="font-body-sm text-body-sm text-secondary">
                            {rim.subtitle}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            check_circle
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Rim Color Swatches */}
                <div className="pt-2">
                  <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider font-semibold block mb-2">
                    Rim Finish Color Tint
                  </span>
                  <div className="flex items-center gap-3">
                    {RIM_OPTIONS.map((rimColorOpt) => {
                      const isSelected = rimColor.toLowerCase() === rimColorOpt.hex.toLowerCase()
                      return (
                        <button
                          key={rimColorOpt.name}
                          onClick={() => setRimColor(rimColorOpt.hex, rimColorOpt.name)}
                          className={`w-9 h-9 rounded-full ring-offset-2 ring-offset-white transition-all cursor-pointer ${
                            isSelected ? 'ring-2 ring-primary scale-105' : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: rimColorOpt.hex }}
                          title={rimColorOpt.name}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: BRAKES */}
            {activeTab === 'brakes' && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider font-semibold">
                      Caliper Color
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">
                      {caliperName}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {CALIPER_OPTIONS.map((caliper) => {
                      const isSelected = caliperName.includes(caliper.name.split(' ')[0])
                      return (
                        <button
                          key={caliper.name}
                          onClick={() => setCaliper(caliper.hex, caliper.name, caliper.cost)}
                          className={`w-10 h-10 rounded-full ring-offset-2 ring-offset-white flex items-center justify-center transition-all cursor-pointer ${
                            isSelected ? 'ring-2 ring-primary scale-105' : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: caliper.hex }}
                          title={caliper.name}
                        />
                      )
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider font-semibold block mb-2">
                    Brake Rotor System
                  </span>
                  <div className="space-y-2">
                    <div
                      onClick={() => setBrakeSystem('Porsche Ceramic Composite (PCCB)')}
                      className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                        brakeSystem === 'Porsche Ceramic Composite (PCCB)'
                          ? 'bg-white/90 ring-2 ring-primary shadow-sm'
                          : 'bg-white/40 opacity-75 hover:opacity-100 ring-1 ring-outline-variant/30'
                      }`}
                    >
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-medium">
                          Porsche Ceramic Composite (PCCB)
                        </p>
                        <p className="font-body-sm text-body-sm text-secondary">
                          420mm front · 390mm rear · 10-piston
                        </p>
                      </div>
                      <span className="font-label-caps text-label-caps uppercase font-semibold text-primary">
                        Standard
                      </span>
                    </div>

                    <div
                      onClick={() => setBrakeSystem('Cast Iron Internally Vented')}
                      className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                        brakeSystem === 'Cast Iron Internally Vented'
                          ? 'bg-white/90 ring-2 ring-primary shadow-sm'
                          : 'bg-white/40 opacity-75 hover:opacity-100 ring-1 ring-outline-variant/30'
                      }`}
                    >
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-medium">
                          Cast Iron Internally Vented
                        </p>
                        <p className="font-body-sm text-body-sm text-secondary">
                          Heavy-duty track endurance system
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: ACCENT */}
            {activeTab === 'accent' && (
              <div className="space-y-4">
                <div>
                  <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider font-semibold block mb-2">
                    Exterior Mirror Upper Trims
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Body Color', label: 'Body Color' },
                      { name: 'High Gloss Black', label: 'Gloss Black' },
                      { name: 'Carbon Fiber', label: 'Carbon' },
                    ].map((item) => {
                      const isSelected = mirrorTrim === item.name
                      return (
                        <button
                          key={item.name}
                          onClick={() => setMirrorTrim(item.name, 0)}
                          className={`p-2.5 rounded-xl text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white/90 ring-2 ring-primary shadow-sm'
                              : 'bg-white/40 ring-1 ring-outline-variant/30 hover:bg-white/60'
                          }`}
                        >
                          <span className="font-label-md text-label-md text-on-surface font-medium block">
                            {item.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider font-semibold block mb-2">
                    Rear Spoiler & Aero Wing
                  </span>
                  <div className="p-3 rounded-xl bg-surface-container-low/70 flex items-center justify-between">
                    <div>
                      <p className="font-label-md text-label-md text-on-surface font-medium">
                        SportDesign Package 911 Turbo
                      </p>
                      <p className="font-body-sm text-body-sm text-secondary">
                        Revised front apron & variable active wing
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={sportDesignPackage}
                      onChange={(e) => toggleSportDesign(e.target.checked)}
                      className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: ENVIRONMENT / STUDIO */}
            {activeTab === 'environment' && (
              <div className="space-y-4">
                <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider font-semibold block mb-1">
                  HDRI Lighting Presets
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      name: 'Weissach Studio' as EnvironmentPreset,
                      sub: 'Daylight 5600K',
                      icon: 'wb_sunny',
                      gradient: 'from-surface-variant via-surface-container to-surface-bright',
                      iconClass: 'text-secondary',
                    },
                    {
                      name: 'Pacific Coast' as EnvironmentPreset,
                      sub: 'Golden Hour',
                      icon: 'sunny',
                      gradient: 'from-amber-200 via-orange-100 to-sky-200',
                      iconClass: 'text-amber-600',
                    },
                    {
                      name: 'Alpine Pass' as EnvironmentPreset,
                      sub: 'Overcast Mist',
                      icon: 'ac_unit',
                      gradient: 'from-slate-300 via-blue-100 to-indigo-100',
                      iconClass: 'text-slate-600',
                    },
                    {
                      name: 'Neon Midnight' as EnvironmentPreset,
                      sub: 'Dark Glow',
                      icon: 'nightlife',
                      gradient: 'from-purple-900 via-indigo-900 to-cyan-800',
                      iconClass: 'text-purple-200',
                    },
                  ].map((preset) => {
                    const isSelected = environmentPreset === preset.name
                    return (
                      <div
                        key={preset.name}
                        onClick={() => setEnvironmentPreset(preset.name)}
                        className={`p-2 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-white/95 ring-2 ring-primary shadow-sm'
                            : 'bg-white/40 hover:bg-white/70 ring-1 ring-outline-variant/40'
                        }`}
                      >
                        <div
                          className={`h-14 rounded-lg bg-gradient-to-tr ${preset.gradient} flex items-center justify-center`}
                        >
                          <span className={`material-symbols-outlined ${preset.iconClass}`}>
                            {preset.icon}
                          </span>
                        </div>
                        <p className="font-label-md text-label-md text-on-surface font-medium mt-1.5 truncate">
                          {preset.name}
                        </p>
                        <p className="font-body-sm text-body-sm text-secondary">
                          {preset.sub}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Turntable Toggle */}
                <div className="pt-2 p-3 rounded-xl bg-surface-container-low/70 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      360
                    </span>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface font-medium">
                        Turntable Rotation
                      </p>
                      <p className="font-body-sm text-body-sm text-secondary">
                        Continuous 1.2 RPM orbit
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTurntable}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${
                      isTurntableActive ? 'bg-primary' : 'bg-surface-container-highest'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full shadow-sm transform transition-transform ${
                        isTurntableActive
                          ? 'bg-on-primary translate-x-5'
                          : 'bg-secondary translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sticky Panel Summary Footer */}
        <div className="p-4 bg-white/80 border-t border-black/[0.04] shadow-[0_-8px_20px_rgba(0,0,0,0.02)] flex items-center justify-between mt-auto">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-secondary">
              911 Turbo Configuration
            </span>
          </div>
          <button
            onClick={() => setSummaryModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-medium transition-all shadow-sm cursor-pointer"
          >
            Save Build
          </button>
        </div>
      </aside>
    </>
  )
}