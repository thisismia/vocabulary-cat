'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, HelpCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'

interface VocabularyItem {
  word: string;
  definition: string;
  audioUrl: string;
}

const vocabularyData: VocabularyItem[] = [
  { 
    word: 'Ephemeral',
    definition: 'Lasting for a very short time',
    audioUrl: '/audio/ephemeral.mp3'
  },
  { 
    word: 'Ubiquitous',
    definition: 'Present, appearing, or found everywhere',
    audioUrl: '/audio/ubiquitous.mp3'
  },
  { 
    word: 'Eloquent',
    definition: 'Fluent or persuasive in speaking or writing',
    audioUrl: '/audio/eloquent.mp3'
  }
]

export default function CatVocabularyGame() {
  const [currentWord, setCurrentWord] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [catState, setCatState] = useState<'normal' | 'happy' | 'angry'>('normal')
  const [masteredWords, setMasteredWords] = useState<Set<number>>(new Set())
  const [isCompleted, setIsCompleted] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const handleSubmit = () => {
    const cleanInput = userInput.trim().toLowerCase()
    const correctWord = vocabularyData[currentWord].word.toLowerCase()
    
    if (cleanInput === correctWord) {
      setFeedback('Correct! Well done!')
      setCatState('happy')
      setMasteredWords(prev => new Set(prev).add(currentWord))
      
      if (currentWord < vocabularyData.length - 1) {
        setTimeout(() => {
          setCurrentWord(prev => prev + 1)
          setUserInput('')
          setShowHint(false)
          setFeedback('')
          setCatState('normal')
        }, 1500)
      } else {
        setIsCompleted(true)
      }
    } else {
      setFeedback('Try again!')
      setCatState('angry')
      setTimeout(() => setCatState('normal'), 1500)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Vocabulary Practice</h2>
          <p className="text-gray-600">
            Word {currentWord + 1} of {vocabularyData.length}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            <Button onClick={playAudio} size="icon">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button onClick={() => setShowHint(!showHint)} size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>

          {showHint && (
            <p className="text-center text-gray-600">
              Hint: {vocabularyData[currentWord].definition}
            </p>
          )}

          <Input
            type="text"
            placeholder="Type the word you hear"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="text-center"
          />

          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>

          {feedback && (
            <p className={`text-center ${
              feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
            }`}>
              {feedback}
            </p>
          )}
        </div>

        <audio ref={audioRef} src={vocabularyData[currentWord].audioUrl} />
      </CardContent>
    </Card>
  )
}
