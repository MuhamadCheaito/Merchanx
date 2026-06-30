"use client"

import { useState, useCallback } from "react"

const MAX_HISTORY = 50

interface UndoRedoState<T> {
  past: T[]
  present: T
  future: T[]
}

export function useUndoRedo<T>(initial: T) {
  const [state, setState] = useState<UndoRedoState<T>>({
    past: [],
    present: initial,
    future: [],
  })

  const canUndo = state.past.length > 0
  const canRedo = state.future.length > 0
  const willLoseHistory = state.future.length > 0

  const set = useCallback((newPresent: T) => {
    setState((prev) => ({
      past: [...prev.past.slice(-(MAX_HISTORY - 1)), prev.present],
      present: newPresent,
      future: [],
    }))
  }, [])

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.past.length === 0) return prev
      const previous = prev.past[prev.past.length - 1]
      return {
        past: prev.past.slice(0, -1),
        present: previous,
        future: [prev.present, ...prev.future],
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.future.length === 0) return prev
      const next = prev.future[0]
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: prev.future.slice(1),
      }
    })
  }, [])

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    })
  }, [])

  return {
    state: state.present,
    set,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
    willLoseHistory,
  }
}
