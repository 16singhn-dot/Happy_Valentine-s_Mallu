import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "noor_opened_gifts"
const STORAGE_DICE_ROLL = "noor_current_roll"

interface UsePersisentProgressReturn {
  openedGiftIndices: number[]
  currentRollGifts: number[]
  isHydrated: boolean
  recordGiftOpened: (index: number) => void
  setCurrentRollGifts: (gifts: number[]) => void
  resetCurrentRoll: () => void
  clearAllProgress: () => void
}

export function usePersistentProgress(): UsePersisentProgressReturn {
  const [openedGiftIndices, setOpenedGiftIndices] = useState<number[]>([])
  const [currentRollGifts, setCurrentRollGiftsState] = useState<number[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      const savedRoll = localStorage.getItem(STORAGE_DICE_ROLL)

      if (saved) {
        const parsed = JSON.parse(saved) as number[]
        setOpenedGiftIndices(Array.isArray(parsed) ? parsed : [])
      }

      if (savedRoll) {
        const parsed = JSON.parse(savedRoll) as number[]
        setCurrentRollGiftsState(Array.isArray(parsed) ? parsed : [])
      }
    } catch (error) {
      console.error("Failed to load persistent progress:", error)
    }

    setIsHydrated(true)
  }, [])

  // Persist opened gifts to localStorage
  const recordGiftOpened = useCallback((index: number) => {
    setOpenedGiftIndices((prev) => {
      const updated = Array.from(new Set([...prev, index]))
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (error) {
        console.error("Failed to save progress:", error)
      }
      return updated
    })
  }, [])

  // Persist current roll gifts
  const setCurrentRollGifts = useCallback((gifts: number[]) => {
    setCurrentRollGiftsState(gifts)
    try {
      localStorage.setItem(STORAGE_DICE_ROLL, JSON.stringify(gifts))
    } catch (error) {
      console.error("Failed to save roll:", error)
    }
  }, [])

  // Reset only the current roll, keep opened gifts
  const resetCurrentRoll = useCallback(() => {
    setCurrentRollGiftsState([])
    try {
      localStorage.removeItem(STORAGE_DICE_ROLL)
    } catch (error) {
      console.error("Failed to reset roll:", error)
    }
  }, [])

  // Clear all progress (hidden command)
  const clearAllProgress = useCallback(() => {
    setOpenedGiftIndices([])
    setCurrentRollGiftsState([])
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_DICE_ROLL)
    } catch (error) {
      console.error("Failed to clear progress:", error)
    }
  }, [])

  return {
    openedGiftIndices,
    currentRollGifts,
    isHydrated,
    recordGiftOpened,
    setCurrentRollGifts,
    resetCurrentRoll,
    clearAllProgress,
  }
}
