"use client"

import { useState } from "react"
import { useAnimation } from "@/hooks/useAnimation"
import { BreathingBackground, ParticleField } from "@/components/creative-chaos"
import { AudioSection } from "@/components/audio-experience/audio-section"
import { Badge } from "@/components/ui/badge"
import { ProjectModal } from "@/components/project-modal"
import { projects as projectsData, getFeaturedProjects } from "@/config/projects"
import Link from "next/link"

/**
 * FeaturedProductsSection — Real domain products
 *
 * Creative Chaos design: collage-style scattered cards with varied sizes,
 * living backgrounds, organic rotation, glassmorphism. Each product card
 * floats independently. NOT a symmetric card grid.
 */

const DOMAIN_COLORS: Record<string, string> = {
  "Epistemic Safety": "#f59e0b",
  "Human Safety": "#ef4444",
  "Cognitive Safety": "#8b5cf6",
  "Empirical Safety": "#06b6d4",
}

const CARD_LAYOUT = [
  { rotation: -5, xOffset: 5, size: "large" as const },
  { rotation: 8, xOffset: 48, size: "medium" as const },
  { rotation: -3, xOffset: 12, size: "medium" as const },
  { rotation: 6, xOffset: 40, size: "large" as const },
]

const SIZE_CLASSES = {
  large: "w-[90%] md:w-[52%]",
  medium: "w-[85%] md:w-[44%]",
}

export function FeaturedProductsSection() {
  const { time, scrollY, mousePosition } = useAnimation()
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const featured = getFeaturedProjects()

  const openProjectModal = (projectId: string) => {
    const project = projectsData.find((p) => p.id === projectId)
    if (project) {
      setSelectedProject(project)
      setIsModalOpen(true)
    }
  }

  return (
    <AudioSection
      id="products"
      title="Products — Real Safety Systems"
      description="Each product is a domain-specific safety system with real code and real evidence."
      position={{ x: 0, y: 3, z: -7 }}
    >
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <section
        id="products"
        className="relative rounded-3xl mb-16 overflow-visible"
        style={{
          background: "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",
          transition: "background 3s ease-in-out",
        }}
      >
        <BreathingBackground time={time} variant="hero" className="rounded-3xl" />
        <ParticleField time={time} count={10} mouseInteraction />

        {/* Floating title */}
        <div className="relative min-h-[40vh] flex items-center justify-center p-8">
          <div
            className="text-center z-20"
            style={{
              transform: `translate(${Math.sin(time * 0.25) * 50}px, ${Math.cos(time * 0.25) * 25}px) rotate(${Math.sin(time * 0.15) * 3}deg)`,
            }}
          >
            <h2
              className="text-7xl md:text-8xl font-black drop-shadow-2xl"
              style={{
                background: "linear-gradient(90deg, var(--theme-accent), var(--theme-text))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PRODUCTS
            </h2>
            <div
              className="text-lg font-light mt-3 text-white/50"
              style={{ transform: `rotate(${Math.cos(time * 0.3) * 4}deg)` }}
            >
              Real code. Real evidence. Real problems solved.
            </div>
          </div>

          {/* Orbiting tech badges */}
          {["Constitutional AI", "Docker/K8s", "Turborepo", "Next.js 14"].map((tag, i) => (
            <Badge
              key={tag}
              className="absolute backdrop-blur-sm font-semibold z-10 text-xs"
              style={{
                backgroundColor: "var(--theme-card)",
                borderColor: "var(--theme-border)",
                color: "var(--theme-text)",
                transform: `translate(${160 + Math.cos(time * 0.35 + i * 1.57) * 140}px, ${140 + Math.sin(time * 0.35 + i * 1.57) * 100}px) rotate(${time * 6 + i * 90}deg)`,
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Scattered product cards */}
        <section className="relative py-16 px-8 pb-48">
          <div className="relative max-w-7xl mx-auto" style={{ minHeight: "1600px" }}>
            {featured.map((project, i) => {
              const layout = CARD_LAYOUT[i % CARD_LAYOUT.length]
              const domainColor = DOMAIN_COLORS[project.domain] ?? "#888"

              return (
                <div
                  key={project.id}
                  onClick={() => openProjectModal(project.id)}
                  className={`absolute group cursor-pointer transition-all duration-700 hover:scale-[1.03] hover:z-30 ${SIZE_CLASSES[layout.size]} shadow-2xl`}
                  style={{
                    left: `${layout.xOffset}%`,
                    top: `${i * 350}px`,
                    transform: `rotate(${layout.rotation + Math.sin(time * 0.25 + i) * 2}deg) translateX(${Math.sin(time * 0.15 + i) * 8}px)`,
                    zIndex: 10 + i,
                  }}
                >
                  <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem]">
                    {/* Living gradient background */}
                    <div
                      className="absolute inset-0 opacity-90"
                      style={{
                        background: `linear-gradient(${135 + Math.sin(time + i) * 20}deg, ${domainColor}20, rgba(0,0,0,0.7), ${domainColor}08)`,
                      }}
                    />

                    {/* Domain color glow */}
                    <div
                      className="absolute -top-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-20"
                      style={{ backgroundColor: domainColor }}
                    />

                    <div className="relative p-8 md:p-10 text-white z-10">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-[10px] font-mono tracking-wider uppercase"
                          style={{ color: domainColor }}
                        >
                          {project.domain}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                          {project.status}
                        </span>
                      </div>

                      <h3
                        className="text-2xl md:text-3xl font-black mb-3 leading-tight"
                        style={{ transform: `rotate(${Math.sin(time * 0.4 + i) * 1}deg)` }}
                      >
                        {project.title}
                      </h3>

                      <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-lg">
                        {project.description}
                      </p>

                      {/* Problem → Solution — asymmetric staggered blocks */}
                      <div className="space-y-3 mb-6">
                        <div
                          className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/5"
                          style={{ transform: `rotate(${Math.sin(time * 0.5 + i) * 0.5}deg)` }}
                        >
                          <span className="text-[10px] font-mono text-red-400/70 block mb-1">PROBLEM</span>
                          <p className="text-xs text-white/50 leading-relaxed">{project.challenge}</p>
                        </div>
                        <div
                          className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/5 ml-6"
                          style={{ transform: `rotate(${-Math.sin(time * 0.5 + i) * 0.5}deg)` }}
                        >
                          <span className="text-[10px] font-mono text-emerald-400/70 block mb-1">SOLUTION</span>
                          <p className="text-xs text-white/50 leading-relaxed">{project.solution}</p>
                        </div>
                      </div>

                      {/* Tech tags — scattered with slight rotations */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 5).map((tech, j) => (
                          <span
                            key={tech}
                            className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/5"
                            style={{ transform: `rotate(${(j % 2 === 0 ? 1 : -1) * 2}deg)` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Evidence badge */}
                      {project.evidence && (
                        <div
                          className="inline-block text-xs font-mono px-3 py-1.5 rounded-xl"
                          style={{
                            background: "rgba(16,185,129,0.08)",
                            color: "#6ee7b7",
                            border: "1px solid rgba(16,185,129,0.2)",
                          }}
                        >
                          {project.evidence}
                        </div>
                      )}

                      {/* Repo link */}
                      <div className="mt-4">
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white/30 hover:text-white/60 transition-colors font-mono"
                          onClick={(e) => e.stopPropagation()}
                        >
                          view source →
                        </Link>
                      </div>
                    </div>

                    {/* Hover glow overlay */}
                    <div
                      className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[3rem]"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </section>
    </AudioSection>
  )
}
