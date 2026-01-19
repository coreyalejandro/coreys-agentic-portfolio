'use client'

import { AnimationProvider } from '@/contexts'
import { useAnimation } from '@/hooks'
import { BreathingBackground, ParticleField } from '@/components/creative-chaos'

function TestContent() {
  const { time, mousePosition, scrollY } = useAnimation()
  
  return (
    <div className="relative min-h-screen">
      <BreathingBackground time={time} variant="hero" className="rounded-3xl" />
      
      {/* Floating Particles for depth */}
      <ParticleField time={time} count={15} mouseInteraction={true} />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-white text-center bg-black/50 backdrop-blur-md p-12 rounded-3xl">
          <h1 className="text-6xl font-bold mb-6">🎉 It Works!</h1>
          <div className="text-xl space-y-2">
            <p>Time: {time.toFixed(2)}</p>
            <p>Mouse: {mousePosition.x}, {mousePosition.y}</p>
            <p>Scroll: {scrollY}</p>
          </div>
          <p className="mt-8 text-sm opacity-75">
            Move your mouse and scroll to see the values update!
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TestRefactor() {
  return (
    <AnimationProvider>
      <TestContent />
    </AnimationProvider>
  )
}
