import { useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\|アイウエオカキクケコサシスセソタチツテト'
const FONT_SIZE = 14

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let drops: number[] = []

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const columns = Math.floor(canvas.width / FONT_SIZE)
      drops = Array.from({ length: columns }, () => Math.random() * -50)
    }

    resize()
    window.addEventListener('resize', resize)

    const interval = setInterval(() => {
      if (!canvas || !ctx) return
      ctx.fillStyle = 'rgba(3, 11, 3, 0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const brightness = Math.random()
        if (brightness > 0.95) ctx.fillStyle = '#ffffff'
        else if (brightness > 0.7) ctx.fillStyle = '#00ff41'
        else ctx.fillStyle = '#005c1a'

        ctx.font = `${FONT_SIZE}px "DM Mono", monospace`
        ctx.fillText(char, i * FONT_SIZE, y * FONT_SIZE)

        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 0.5
      })
    }, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} id="matrix-rain" />
}
