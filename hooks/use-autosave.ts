"use client"

import { useState, useEffect, useRef } from "react"

export type SaveStatus = "saved" | "unsaved" | "saving"

export function useAutosave(dependency: unknown, delay = 2000) {
  const [status, setStatus] = useState<SaveStatus>("saved")
  const [lastSaved, setLastSaved] = useState<Date>(new Date())
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setStatus("unsaved")

    if (timerRef.current) clearTimeout(timerRef.current)
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)

    timerRef.current = setTimeout(() => {
      setStatus("saving")
      saveTimerRef.current = setTimeout(() => {
        setStatus("saved")
        setLastSaved(new Date())
      }, 800)
    }, delay)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [dependency, delay])

  return { status, lastSaved }
}
