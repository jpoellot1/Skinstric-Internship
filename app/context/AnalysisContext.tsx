'use client'

import React, { createContext, useContext, useState } from 'react'

const AnalysisContext = createContext<{
  analysisResult: any;
  setAnalysisResult: (data: any) => void;
}>({ analysisResult: null, setAnalysisResult: () => {} })

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  return (
    <AnalysisContext.Provider value={{ analysisResult, setAnalysisResult }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export const useAnalysis = () => useContext(AnalysisContext)