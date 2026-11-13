'use client'

import React, { useState } from 'react'
import { useConfiguratorStore } from '@/store/useConfiguratorStore'

export default function BuildSummaryModal() {
  const [submitted, setSubmitted] = useState(false)

  const {
    summaryModalOpen,
    setSummaryModalOpen,
    paintName,
    paintCost,
    wheelDesign,
    wheelCost,
    caliperName,
    caliperCost,
    mirrorTrim,
    mirrorCost,
    packageCost,
    sportDesignPackage,
    basePrice,
    getTotalPrice,
  } = useConfiguratorStore()

  if (!summaryModalOpen) return null

  const totalPrice = getTotalPrice()
  const trimCost = mirrorCost + packageCost

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setSummaryModalOpen(false)
    }, 2400)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg rounded-[28px] bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_32px_64px_-16px_rgba(25,28,30,0.25)] p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-secondary">
              Specification Passport
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
              Porsche 911 Turbo (992)
            </h3>
          </div>
          <button
            onClick={() => setSummaryModalOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-emerald-600">
              check_circle
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Specification Reserved
            </h4>
            <p className="font-body-md text-body-md text-secondary">
              Configuration Code <strong>#PRSH-911T-8821</strong> dispatched to your nearest Certified Porsche Experience Center.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2.5 font-body-md text-body-md">
              <div className="flex justify-between py-2 bg-surface-container-low/60 px-3.5 rounded-lg">
                <span className="text-secondary">Base Vehicle MSRP</span>
                <span className="font-medium text-on-surface">
                  ${basePrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1.5 px-3.5">
                <span className="text-secondary">{paintName}</span>
                <span className="font-medium text-on-surface">
                  {paintCost === 0 ? '$0' : `+$${paintCost.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between py-1.5 px-3.5">
                <span className="text-secondary">{wheelDesign}</span>
                <span className="font-medium text-on-surface">
                  {wheelCost === 0 ? '$0' : `+$${wheelCost.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between py-1.5 px-3.5">
                <span className="text-secondary">{caliperName}</span>
                <span className="font-medium text-on-surface">
                  {caliperCost === 0 ? '$0' : `+$${caliperCost.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between py-1.5 px-3.5">
                <span className="text-secondary">
                  {mirrorTrim} & {sportDesignPackage ? 'SportDesign Aero' : 'Standard Trim'}
                </span>
                <span className="font-medium text-on-surface">
                  {trimCost === 0 ? '$0' : `+$${trimCost.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between py-3 px-3.5 rounded-xl bg-surface-container font-headline-sm text-headline-sm font-semibold text-on-surface mt-2">
                <span>Total Vehicle Specification</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSummaryModalOpen(false)}
                className="flex-1 py-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest font-label-md text-label-md text-on-surface font-medium transition-colors cursor-pointer"
              >
                Edit Configuration
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md font-medium transition-colors shadow-sm cursor-pointer"
              >
                Submit to Dealer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
