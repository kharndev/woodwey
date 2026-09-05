'use client'

import { useMemo, useSyncExternalStore } from 'react'

const selectionKey = 'woodwey-selection'
const selectionEvent = 'woodwey-selection'

function getSnapshot() {
  if (typeof window === 'undefined') return '[]'
  return window.localStorage.getItem(selectionKey) ?? '[]'
}

function getServerSnapshot() {
  return '[]'
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(selectionEvent, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(selectionEvent, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

export function useSelection() {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return useMemo(() => {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
    } catch {
      return []
    }
  }, [value])
}

export function saveSelection(ids: string[]) {
  window.localStorage.setItem(selectionKey, JSON.stringify(ids))
  window.dispatchEvent(new Event(selectionEvent))
}
