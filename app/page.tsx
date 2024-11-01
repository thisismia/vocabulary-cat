'use client'

import React from 'react'
import CatVocabularyGame from './components/cat-vocabulary-game'

export default function Home() {
  return (
    <main className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <CatVocabularyGame />
    </main>
  )
} 
