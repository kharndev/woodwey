'use client'

import { useEffect } from 'react'

export function MediaProtection() {
  useEffect(() => {
    const isProtected = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest('[data-protected-media]'))
    const preventContextMenu = (event: MouseEvent) => {
      if (isProtected(event.target)) event.preventDefault()
    }
    const preventDrag = (event: DragEvent) => {
      if (isProtected(event.target)) event.preventDefault()
    }
    document.addEventListener('contextmenu', preventContextMenu)
    document.addEventListener('dragstart', preventDrag)
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu)
      document.removeEventListener('dragstart', preventDrag)
    }
  }, [])
  return null
}
