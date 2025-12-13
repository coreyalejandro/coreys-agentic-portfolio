"use client"

import type React from "react"

import { useAudioEngine } from "./audio-engine"

type AudioButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  description?: string
}

export function AudioButton({ children, onClick, onFocus, className = "", description, ...props }: AudioButtonProps) {
  const { isActive, playComponentSound, narrateSection } = useAudioEngine()

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isActive) {
      playComponentSound("button")
      if (description) {
        narrateSection("button-interaction", description)
      }
    }
    onClick?.(event)
  }

  const handleFocus: React.FocusEventHandler<HTMLButtonElement> = (event) => {
    if (isActive && description) {
      narrateSection("button-focus", description)
    }
    onFocus?.(event)
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      onFocus={handleFocus}
      className={className}
      aria-label={description ?? props["aria-label"]}
    >
      {children}
    </button>
  )
}
