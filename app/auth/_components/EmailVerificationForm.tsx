"use client"
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import { verifyEmail } from '@/actions/email-verification'
import { toast } from 'sonner'

const EmailVerificationForm = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const hasVerifiedRef = useRef(false)

  useEffect(() => {
    if (hasVerifiedRef.current) return

    if (!token) {
      toast.error("Missing token")
      return
    }

    hasVerifiedRef.current = true

    verifyEmail(token)
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
          return
        }

        if (data.success) {
          toast.success(data.success)
          setTimeout(() => {
            router.replace("/auth")
          }, 1200)
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error("An unexpected error occurred. Please try again later.")
      })
  }, [token, router])

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; fadeDir: number
    }[] = []

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
      })
    }

    let animId: number
   const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.opacity += p.fadeDir * 0.003
        if (p.opacity > 0.6 || p.opacity < 0.05) p.fadeDir *= -1
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 229, 0, ${p.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="relative">
    <div className="font-bold text-center text-yellow-300  cursor-pointer flex items-center gap-2 m-3!" onClick={() => router.push("/auth")}> <ArrowLeft/>Back to login</div>

    <div className="vf-root">
        
      <canvas ref={canvasRef} className="vf-canvas" />
      <div className="vf-radial" />
 
      <div className="vf-card">
          
        <div className="vf-corner vf-corner-tl" />
        <div className="vf-corner vf-corner-tr" />
        <div className="vf-corner vf-corner-bl" />
        <div className="vf-corner vf-corner-br" />

        <div className="vf-icon-wrap">
          <div className="vf-icon-ring-2" />
          <div className="vf-icon-ring" />
          <div className="vf-icon-inner">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>

        <div className="vf-label">AUTHENTICATION</div>

        <h1 className="vf-title">Verifying Your Email</h1>

        <p className="vf-subtitle">
          Confirming your account details.<br />This will only take a moment.
        </p>
       
        <div className="vf-progress-wrap">
          <div className="vf-progress-track">
            <div className="vf-progress-bar" />
          </div>
          <div className="vf-dots-row">
            <div className="vf-dot" />
            <div className="vf-dot" />
            <div className="vf-dot" />
          </div>
        </div>

        <div className="vf-divider" />

        <div className="vf-footer">
            
          <div className="vf-status-dot" />
         
          <span className="vf-footer-text">Secure connection established</span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default EmailVerificationForm
