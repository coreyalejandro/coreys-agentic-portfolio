/**
 * Motion Design Tokens
 *
 * Centralized timing, easing, and animation values for consistent motion design
 * across all components.
 */

/**
 * Standard animation durations in milliseconds
 */
export const MOTION_DURATION = {
  /** 100ms - Instant feedback */
  instant: 100,
  /** 200ms - Quick transitions */
  fast: 200,
  /** 300ms - Standard transitions */
  normal: 300,
  /** 500ms - Slow, deliberate animations */
  slow: 500,
  /** 1000ms - Very slow, ambient animations */
  ambient: 1000,
} as const

/**
 * Standard easing functions for smooth animations
 */
export const MOTION_EASING = {
  /** Linear motion - constant speed */
  linear: 'linear',
  /** Ease in - starts slow, ends fast */
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  /** Ease out - starts fast, ends slow */
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  /** Ease in-out - smooth acceleration and deceleration */
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Spring - bouncy, elastic motion */
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const

/**
 * Animation frame rate in milliseconds for setInterval/requestAnimationFrame
 */
export const MOTION_FRAME_RATE = {
  /** 60fps - ~16.67ms per frame */
  fps60: 1000 / 60,
  /** 30fps - ~33.33ms per frame */
  fps30: 1000 / 30,
  /** 15fps - ~66.67ms per frame */
  fps15: 1000 / 15,
} as const

/**
 * Animation intensity multipliers for motion effects
 */
export const MOTION_INTENSITY = {
  /** Subtle motion - 0.5x */
  subtle: 0.5,
  /** Normal motion - 1x */
  normal: 1,
  /** Intense motion - 2x */
  intense: 2,
  /** Extreme motion - 4x */
  extreme: 4,
} as const

/**
 * Rotation constraints in degrees
 */
export const MOTION_ROTATION = {
  /** Minimal rotation - ±1° */
  minimal: 1,
  /** Subtle rotation - ±3° */
  subtle: 3,
  /** Normal rotation - ±5° */
  normal: 5,
  /** Dynamic rotation - ±10° */
  dynamic: 10,
} as const

/**
 * Translation constraints in pixels
 */
export const MOTION_TRANSLATION = {
  /** Small movement - ±5px */
  small: 5,
  /** Medium movement - ±10px */
  medium: 10,
  /** Large movement - ±20px */
  large: 20,
  /** XLarge movement - ±40px */
  xlarge: 40,
} as const

/**
 * Check if user prefers reduced motion
 * @returns true if prefers-reduced-motion: reduce is set
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Hook for checking reduced motion preference
 * Returns a value based on whether reduced motion is preferred
 *
 * @param animatedValue - Value to return when animations are enabled
 * @param reducedValue - Value to return when reduced motion is preferred
 * @returns The appropriate value based on motion preference
 */
export function useReducedMotion<T>(animatedValue: T, reducedValue: T): T {
  return prefersReducedMotion() ? reducedValue : animatedValue
}

/**
 * Get a safe animation frame rate based on user preferences
 * @param frameRate - Desired frame rate
 * @returns Frame rate adjusted for reduced motion (15fps if reduced motion is preferred)
 */
export function getSafeFrameRate(frameRate: number = MOTION_FRAME_RATE.fps60): number {
  return prefersReducedMotion() ? MOTION_FRAME_RATE.fps15 : frameRate
}
