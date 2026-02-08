import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import FloatingNav from "@/components/floating-nav"
import "./globals.css"
import { Suspense } from "react"
import { AudioEngineProvider } from "@/components/audio-experience/audio-engine"
import { AnimationProvider } from "@/contexts/AnimationContext"
import { ColorThemeProvider } from "@/contexts/ColorThemeContext"

export const metadata: Metadata = {
  title: "Creative Chaos - Neural Depth Design System",
  description: "A revolutionary design system with living interfaces and immersive audio experiences for all users",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased min-h-screen bg-(--theme-deep) text-(--theme-text)`}
        suppressHydrationWarning
      >
        <ColorThemeProvider>
          <AnimationProvider>
            <AudioEngineProvider>
              <Suspense fallback={null}>
                <FloatingNav />
              </Suspense>
              {children}
            </AudioEngineProvider>
          </AnimationProvider>
        </ColorThemeProvider>
      </body>
    </html>
  )
}
