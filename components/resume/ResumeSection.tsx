"use client"

import { useState, useEffect, useRef, type CSSProperties } from "react"
import { AudioSection } from "@/components/audio-experience/audio-section"
import { AudioButton } from "@/components/audio-experience/audio-button"
import { BreathingBackground } from "@/components/creative-chaos"
import Link from "next/link"

export function ResumeSection() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(0)
  const resumeRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>(0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      setTime((prev) => prev + 0.016)
      requestRef.current = requestAnimationFrame(animate)
    }
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return

    try {
      // Dynamic import to reduce bundle size
      const html2canvas = (await import("html2canvas")).default
      const jsPDF = (await import("jspdf")).default

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save("Corey-Alejandro-Resume.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      // Fallback: open print dialog
      window.print()
    }
  }

  return (
    <AudioSection
      id="resume"
      title="Resume - Professional Experience"
      description="Download my resume to learn more about my professional background, skills, and achievements."
      position={{ x: 0, y: 6, z: -8 }}
    >
      <section className="relative min-h-screen py-32 mb-16">
        {/* Breathing, Living Background (shared pattern with HeroSection) */}
        <BreathingBackground time={time} variant="hero" className="rounded-3xl" />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${10 + ((i * 9) % 80)}%`,
                top: `${15 + ((i * 13) % 70)}%`,
                transform: mounted
                  ? `
                    translate(
                      ${Math.sin(time + i) * 30 + mousePosition.x * 0.01}px,
                      ${Math.cos(time * 0.8 + i) * 20 + mousePosition.y * 0.008}px
                    ) 
                    rotate(${time * 12 + i * 30}deg)
                    scale(${0.3 + Math.sin(time + i) * 0.3})
                  `
                  : "translate(0px, 0px) rotate(0deg) scale(0.3)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-white/30 backdrop-blur-sm" />
            </div>
          ))}
        </div>

        <div className="relative container mx-auto px-4">
          {/* Header with Download Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div
              className="mb-6 md:mb-0"
              style={{
                transform: mounted ? `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.008}px)` : "none",
              }}
            >
              <h1
                className="text-6xl md:text-8xl font-black leading-none mb-4 transition-colors duration-3000"
                style={{
                  transform: mounted ? `rotate(${Math.sin(time * 0.2) * 1}deg)` : "rotate(0deg)",
                  color: "var(--theme-text)",
                }}
              >
                <span className="block transform -rotate-1">Resume</span>
              </h1>
              <p
                className="text-xl max-w-2xl transition-colors duration-3000"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Download my professional resume to explore my experience, skills, and achievements
              </p>
            </div>

            <AudioButton
              onClick={handleDownloadPDF}
              description="Download resume as PDF"
              className="font-bold px-8 py-4 rounded-full shadow-2xl inline-flex items-center gap-3 transform hover:scale-110 transition-all duration-300"
              style={{
                transform: mounted ? `rotate(${Math.sin(time * 0.6) * 2}deg)` : "rotate(0deg)",
                background: "var(--theme-gradient)",
                color: "var(--theme-text)",
              }}
            >
              Download PDF
            </AudioButton>
          </div>

          {/* Resume Content - Printable Version */}
          <div
            ref={resumeRef}
            className="rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden transition-all duration-3000"
            style={{
              transform: mounted
                ? `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg)`
                : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
              // Keep the printable resume readable (dark-on-white), independent of global theme vars.
              backgroundColor: "#ffffff",
              ...( {
                "--theme-card": "#ffffff",
                "--theme-text": "rgba(17, 24, 39, 0.95)",
                "--theme-text-secondary": "rgba(55, 65, 81, 0.9)",
                "--theme-border": "rgba(17, 24, 39, 0.12)",
              } as CSSProperties ),
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-2 transition-all duration-3000"
              style={{
                transform: mounted ? `scaleX(${1 + Math.sin(time * 0.3) * 0.1})` : "scaleX(1)",
                background: "var(--theme-gradient)",
              }}
            />

            {/* Resume Header */}
            <div
              className="relative mb-8 pb-8 transition-colors duration-3000"
              style={{ borderBottom: "2px solid var(--theme-border)" }}
            >
              <h2
                className="text-4xl md:text-5xl font-black mb-4 transition-colors duration-3000"
                style={{
                  transform: mounted ? `translateX(${Math.sin(time * 0.2) * 2}px)` : "translateX(0px)",
                  color: "var(--theme-primary)",
                }}
              >
                Corey Alejandro
              </h2>
              <p
                className="text-xl mb-6 transition-colors duration-3000"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                AI Systems Developer & Accessibility Advocate
              </p>

              <div
                className="flex flex-wrap gap-4 text-sm transition-colors duration-3000"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                <a
                  href="mailto:corey@coreyalejandro.com"
                  className="flex items-center gap-2 hover:opacity-70 transition-all duration-300"
                >
                  <span>corey@coreyalejandro.com</span>
                </a>
                <div className="flex items-center gap-2">
                  <span>(210) 336-1722</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>San Antonio, TX</span>
                </div>
                <a
                  href="https://github.com/coreyalejandro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-all duration-300"
                >
                  <span>github.com/coreyalejandro</span>
                </a>
                <a
                  href="https://linkedin.com/in/coreyalejandro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-all duration-300"
                >
                  <span>linkedin.com/in/coreyalejandro</span>
                </a>
                <a
                  href="https://coreyalejandro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-all duration-300"
                >
                  <span>coreyalejandro.com</span>
                </a>
              </div>
            </div>

            {/* Professional Profile */}
            <section className="mb-8">
              <h3
                className="text-2xl font-bold mb-4 transition-colors duration-3000"
                style={{ color: "var(--theme-primary)" }}
              >
                Professional Profile
              </h3>
              <p
                className="leading-relaxed mb-4 transition-colors duration-3000"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                A multidisciplinary technology professional with expertise in AI development, inclusive design, and
                business intelligence. I have a proven track record of constructing customer-centric systems that scale
                while adhering to accessibility-first principles. Currently, I specialize in AI alignment and evaluation,
                human-machine shared context existence, bi-directional prompt engineering, and training data curation for
                advanced AI models. I am also exploring neurodivergent-first theories of change and action to address AI
                safety and inclusive design challenges that neurotypical developers often overlook.
              </p>
              <p
                className="leading-relaxed font-medium transition-colors duration-3000"
                style={{ color: "var(--theme-text)" }}
              >
                Core Value Proposition: I create AI systems that work for everyone - not just the majority. My 15+
                years in leveraging emerging technology taught me that the best solutions emerge when we design for the
                margins, not the middle.
              </p>
            </section>

            {/* Skills */}
            <section className="mb-8">
              <h3
                className="text-2xl font-bold mb-4 transition-colors duration-3000"
                style={{ color: "var(--theme-primary)" }}
              >
                Technical Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4
                    className="font-semibold mb-2 transition-colors duration-3000"
                    style={{ color: "var(--theme-text)" }}
                  >
                    AI Development & Evaluation
                  </h4>
                  <p
                    className="text-sm transition-colors duration-3000"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    Prompt Engineering, RLHF, LLM Testing, contextual AI agent frameworks, safety alignment and model
                    evaluation
                  </p>
                </div>
                <div>
                  <h4
                    className="font-semibold mb-2 transition-colors duration-3000"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Platform & Development
                  </h4>
                  <p
                    className="text-sm transition-colors duration-3000"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    Python, JavaScript, SQL, React, LangChain, OpenAI API, cloud micro-services, RESTful APIs
                  </p>
                </div>
                <div>
                  <h4
                    className="font-semibold mb-2 transition-colors duration-3000"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Data & Analytics
                  </h4>
                  <p
                    className="text-sm transition-colors duration-3000"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    Statistical modeling, predictive analytics, A/B testing, business intelligence dashboards, QA
                    frameworks
                  </p>
                </div>
                <div>
                  <h4
                    className="font-semibold mb-2 transition-colors duration-3000"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Specialized Skills
                  </h4>
                  <p
                    className="text-sm transition-colors duration-3000"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    Accessibility Design (WCAG), neurodivergent-first UX, Inclusive AI Development, evaluation
                    frameworks, technical documentation
                  </p>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h3
                className="text-2xl font-bold mb-4 transition-colors duration-3000"
                style={{ color: "var(--theme-primary)" }}
              >
                Professional Experience
              </h3>

              <div className="space-y-6">
                <div
                  className="pl-6 transition-all duration-3000"
                  style={{ borderLeft: "4px solid var(--theme-primary)" }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4
                        className="font-bold text-lg transition-colors duration-3000"
                        style={{ color: "var(--theme-text)" }}
                      >
                        Prompt Engineer & Data Annotator
                      </h4>
                      <p
                        className="font-medium transition-colors duration-3000"
                        style={{ color: "var(--theme-primary)" }}
                      >
                        Outlier.ai
                      </p>
                    </div>
                    <span
                      className="text-sm mt-1 md:mt-0 transition-colors duration-3000"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      Remote | March 2025 - Present
                    </span>
                  </div>
                  <ul
                    className="list-disc list-inside space-y-1 text-sm transition-colors duration-3000"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    <li>
                      Author PhD-level problem-answer pairs testing AI reasoning capabilities across complex domains
                    </li>
                    <li>
                      Conduct systematic RLHF evaluations across accuracy, helpfulness, safety, and contextual
                      appropriateness
                    </li>
                    <li>
                      Apply neurodivergent perspective to identify accessibility gaps and edge cases in AI responses
                    </li>
                    <li>
                      Recognized for one-shot prompt engineering - producing complex, evaluation-ready scenarios on
                      first attempt
                    </li>
                  </ul>
                </div>

                <div
                  className="pl-6 transition-all duration-3000"
                  style={{ borderLeft: "4px solid var(--theme-secondary)" }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4
                        className="font-bold text-lg transition-colors duration-3000"
                        style={{ color: "var(--theme-text)" }}
                      >
                        Data Annotator
                      </h4>
                      <p
                        className="font-medium transition-colors duration-3000"
                        style={{ color: "var(--theme-primary)" }}
                      >
                        Centific
                      </p>
                    </div>
                    <span
                      className="text-sm mt-1 md:mt-0 transition-colors duration-3000"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      Remote | August 2024 - Present
                    </span>
                  </div>
                  <ul
                    className="list-disc list-inside space-y-1 text-sm transition-colors duration-3000"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    <li>
                      Support production AI systems serving billions of user interactions with high-quality multilingual
                      training data
                    </li>
                    <li>
                      Annotate safety-critical training data for enterprise AI across healthcare, ecommerce, and
                      customer service
                    </li>
                    <li>
                      Contribute neurodivergent-accessible AI design perspective to ensure inclusive model training
                      data
                    </li>
                  </ul>
                </div>

                <div
                  className="pl-6 transition-all duration-3000"
                  style={{ borderLeft: "4px solid var(--theme-accent)" }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4
                        className="font-bold text-lg transition-colors duration-3000"
                        style={{ color: "var(--theme-text)" }}
                      >
                        Customer Service Specialist
                      </h4>
                      <p
                        className="font-medium transition-colors duration-3000"
                        style={{ color: "var(--theme-primary)" }}
                      >
                        Alorica
                      </p>
                    </div>
                    <span
                      className="text-sm mt-1 md:mt-0 transition-colors duration-3000"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      San Antonio, TX | October 2023 - February 2025
                    </span>
                  </div>
                  <ul
                    className="list-disc list-inside space-y-1 text-sm transition-colors duration-3000"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    <li>
                      Led development of AI-powered training platform with neurodivergent-inclusive team structures
                    </li>
                    <li>
                      Spearheaded integrated platform combining AI-powered onboarding, professional development, and
                      social networking
                    </li>
                    <li>
                      Advocated for all-neurodivergent team (self-identified) that became highest-performing unit in
                      division
                    </li>
                  </ul>
                </div>

                <div
                  className="pl-6 transition-all duration-3000"
                  style={{ borderLeft: "4px solid var(--theme-primary)" }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4
                        className="font-bold text-lg transition-colors duration-3000"
                        style={{ color: "var(--theme-text)" }}
                      >
                        Education/Community Commander
                      </h4>
                      <p
                        className="font-medium transition-colors duration-3000"
                        style={{ color: "var(--theme-primary)" }}
                      >
                        Snoozetown, LLC (Snooze, An AM Eatery)
                      </p>
                    </div>
                    <span
                      className="text-sm mt-1 md:mt-0 transition-colors duration-3000"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      Denver, CO | 2018 - February 2025
                    </span>
                  </div>
                  <ul
                    className="list-disc list-inside space-y-1 text-sm transition-colors duration-3000"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    <li>Built scalable national training infrastructure serving 2,000+ employees across 50+ locations</li>
                    <li>
                      Designed training infrastructure with real-time sync, API integrations, and automated deployment
                    </li>
                    <li>
                      Inclusive design for neurodivergent employees improved training effectiveness for all - principle
                      now guiding AI work
                    </li>
                  </ul>
                </div>

                <div
                  className="pl-6 transition-all duration-3000"
                  style={{ borderLeft: "4px solid var(--theme-secondary)" }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4
                        className="font-bold text-lg transition-colors duration-3000"
                        style={{ color: "var(--theme-text)" }}
                      >
                        Director of Online Learning
                      </h4>
                      <p
                        className="font-medium transition-colors duration-3000"
                        style={{ color: "var(--theme-primary)" }}
                      >
                        Our Lady of the Lake University
                      </p>
                    </div>
                    <span
                      className="text-sm mt-1 md:mt-0 transition-colors duration-3000"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      San Antonio, TX | 2012 - 2015
                    </span>
                  </div>
                  <ul
                    className="list-disc list-inside space-y-1 text-sm transition-colors duration-3000"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    <li>Scaled educational technology infrastructure; pioneered SMS-based learning platform for underserved populations</li>
                    <li>Architected infrastructure from 1,000 to 5,000+ concurrent users; led WCAG accessibility compliance</li>
                    <li>Created first SMS-based learning platform in Texas higher education</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h3
                className="text-2xl font-bold mb-4 transition-colors duration-3000"
                style={{ color: "var(--theme-primary)" }}
              >
                Education
              </h3>
              <div className="space-y-4">
                <div
                  className="pl-6 transition-all duration-3000"
                  style={{ borderLeft: "4px solid var(--theme-accent)" }}
                >
                  <h4
                    className="font-bold text-lg transition-colors duration-3000"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Master of Science, Online Teaching & Learning
                  </h4>
                  <p
                    className="font-medium transition-colors duration-3000"
                    style={{ color: "var(--theme-primary)" }}
                  >
                    California State University, East Bay
                  </p>
                </div>
                <div
                  className="pl-6 transition-all duration-3000"
                  style={{ borderLeft: "4px solid var(--theme-accent)" }}
                >
                  <h4
                    className="font-bold text-lg transition-colors duration-3000"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Professional Teaching Credential
                  </h4>
                  <p
                    className="font-medium transition-colors duration-3000"
                    style={{ color: "var(--theme-primary)" }}
                  >
                    University of San Francisco
                  </p>
                </div>
                <div
                  className="pl-6 transition-all duration-3000"
                  style={{ borderLeft: "4px solid var(--theme-accent)" }}
                >
                  <h4
                    className="font-bold text-lg transition-colors duration-3000"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Bachelor of Arts, Drama
                  </h4>
                  <p
                    className="font-medium transition-colors duration-3000"
                    style={{ color: "var(--theme-primary)" }}
                  >
                    Stanford University
                  </p>
                </div>
                <div className="pt-2">
                  <h4
                    className="font-semibold mb-2 transition-colors duration-3000"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Current Professional Development (2025)
                  </h4>
                  <p
                    className="text-sm transition-colors duration-3000"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    Advanced AI Evaluation Methodologies · LangChain & Production AI Agent Development · Google UX
                    Design Professional Certificate · Cloud Architecture for AI Workloads
                  </p>
                </div>
              </div>
            </section>

            {/* Achievements */}
            <section>
              <h3
                className="text-2xl font-bold mb-4 transition-colors duration-3000"
                style={{ color: "var(--theme-primary)" }}
              >
                Key Achievements
              </h3>
              <ul
                className="list-disc list-inside space-y-2 text-sm transition-colors duration-3000"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                <li>Created first SMS-based learning platform in Texas higher education for underserved communities</li>
                <li>Pioneered all-neurodivergent customer service team model demonstrating measurable performance advantages</li>
                <li>Developed AI-powered training systems integrating accessibility-first design principles</li>
                <li>Influenced statewide technology policy through Texas Higher Education Coordinating Board advisory role</li>
                <li>Built platforms scaling from 1,000 to 5,000+ concurrent users while maintaining performance standards</li>
                <li>Designed secure, compliant architectures meeting HIPAA and FERPA requirements</li>
              </ul>
            </section>
          </div>

          {/* Additional CTA */}
          <div className="text-center mt-12">
            <p
              className="text-lg mb-6 transition-colors duration-3000"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Interested in working together? Let's create something amazing.
            </p>
            <Link href="/contact">
              <AudioButton
                description="Get in touch - Contact me for collaboration"
                className="backdrop-blur-md font-semibold px-8 py-4 rounded-full inline-flex items-center gap-3 transition-all duration-300"
                style={{
                  backgroundColor: "var(--theme-card)",
                  color: "var(--theme-text)",
                  border: "1px solid var(--theme-border)",
                }}
              >
                Get In Touch
              </AudioButton>
            </Link>
          </div>
        </div>
      </section>
    </AudioSection>
  )
}
