import { useState, useEffect } from 'react'

export default function TypingEffect({ words, typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2000 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!words?.length) return
    const currentWord = words[currentWordIndex] || ''
    const speed = isDeleting ? deletingSpeed : typingSpeed

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 530)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className="inline-block min-h-[1.2em] align-bottom">
      <span className="text-white">I am </span>
      <span className="text-gold font-bold text-[1.15em]">
        {displayText}
        <span
          className={`inline-block w-[2px] h-[0.9em] ml-[1px] bg-gold align-middle transition-opacity duration-75 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </span>
    </span>
  )
}
