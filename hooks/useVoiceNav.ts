"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { NAV_ITEMS, NAV_ACTIONS } from "@/lib/floating-nav-schema"

export type VoiceNavCommand =
  | { type: "navigate"; href: string }
  | { type: "detach" }
  | { type: "dock" }
  | { type: "opacity-toggle" }
  | { type: "audio-toggle" }
  | null

export interface UseVoiceNavOptions {
  onCommand: (cmd: VoiceNavCommand) => void
  enabled?: boolean
  /** Alternative phrase for "go to X" - e.g. "open documentation" */
  prefixGoTo?: string[]
}

const DEFAULT_PREFIXES = ["go to", "open", "navigate to", "take me to", "show"]

function normalizePhrase(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function matchPhrase(utterance: string, phrases: string[], prefixes: string[]): boolean {
  const u = normalizePhrase(utterance)
  for (const p of phrases) {
    const norm = normalizePhrase(p)
    if (u === norm || u.endsWith(" " + norm)) return true
    for (const pre of prefixes) {
      if (u === `${pre} ${norm}` || u.startsWith(`${pre} ${norm}`)) return true
    }
  }
  return false
}

export function useVoiceNav({ onCommand, enabled = true, prefixGoTo = DEFAULT_PREFIXES }: UseVoiceNavOptions) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [status, setStatus] = useState<"idle" | "listening" | "processing" | "error">("idle")
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const onCommandRef = useRef(onCommand)

  onCommandRef.current = onCommand

  useEffect(() => {
    if (typeof window === "undefined") return

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognitionAPI) {
      setIsSupported(false)
      return
    }
    setIsSupported(true)

    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = "en-US"
    recognition.maxAlternatives = 3

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1]
      if (!result.isFinal) return

      const transcript = result[0]?.transcript?.trim() ?? ""
      if (!transcript) return

      setStatus("processing")

      // Check actions first
      for (const a of NAV_ACTIONS) {
        if (matchPhrase(transcript, a.voicePhrases, ["toggle", "turn", "show", "hide"])) {
          if (a.action === "detach") {
            onCommandRef.current({ type: "detach" })
            setStatus("idle")
            return
          }
          if (a.action === "dock") {
            onCommandRef.current({ type: "dock" })
            setStatus("idle")
            return
          }
          if (a.action === "opacity") {
            onCommandRef.current({ type: "opacity-toggle" })
            setStatus("idle")
            return
          }
          if (a.action === "audio-toggle") {
            onCommandRef.current({ type: "audio-toggle" })
            setStatus("idle")
            return
          }
        }
      }

      // Check nav items
      for (const item of NAV_ITEMS) {
        if (matchPhrase(transcript, item.voicePhrases, prefixGoTo)) {
          onCommandRef.current({ type: "navigate", href: item.href })
          setStatus("idle")
          return
        }
      }

      // "Home" is special
      if (
        matchPhrase(transcript, ["home"], prefixGoTo) ||
        transcript.toLowerCase().includes("home")
      ) {
        onCommandRef.current({ type: "navigate", href: "/" })
        setStatus("idle")
        return
      }

      setStatus("idle")
    }

    recognition.onerror = () => setStatus("error")
    recognition.onend = () => {
      if (isListening) {
        try {
          recognition.start()
        } catch {
          setIsListening(false)
        }
      }
    }

    recognitionRef.current = recognition
    return () => {
      try {
        recognition.abort()
      } catch {}
      recognitionRef.current = null
    }
  }, [prefixGoTo])

  const startListening = useCallback(() => {
    if (!enabled || !recognitionRef.current || !isSupported) return
    try {
      recognitionRef.current.start()
      setIsListening(true)
      setStatus("listening")
    } catch (e) {
      setStatus("error")
    }
  }, [enabled, isSupported])

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return
    try {
      recognitionRef.current.stop()
    } catch {}
    setIsListening(false)
    setStatus("idle")
  }, [])

  const toggleListening = useCallback(() => {
    if (isListening) stopListening()
    else startListening()
  }, [isListening, startListening, stopListening])

  return {
    isSupported,
    isListening,
    status,
    startListening,
    stopListening,
    toggleListening,
  }
}
