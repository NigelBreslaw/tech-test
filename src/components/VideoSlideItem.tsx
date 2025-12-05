import { useEffect, useRef, useState } from 'react'

type AnimationState = 'idle' | 'sliding-in' | 'visible' | 'sliding-out'

interface VideoSlideItemProps {
  videoSrc: string
  animationState: AnimationState
  inDelay: string
  outDelay: string
  onPlayPause?: (playing: boolean) => void
  title: string
}

export function VideoSlideItem({ videoSrc, animationState, inDelay, outDelay, title }: VideoSlideItemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [xPosition, setXPosition] = useState(0)

  let className = 'video-slide-item'
  let animationDelay = '0s'

  switch (animationState) {
    case 'idle':
      // No additional class, stays at translateX(100%)
      break
    case 'sliding-in':
      className += ' slide-in'
      animationDelay = inDelay
      break
    case 'visible':
      // Keep slide-in class to maintain forwards state, add visible for explicit positioning
      className += ' slide-in visible'
      // No animation delay needed
      break
    case 'sliding-out':
      // Keep visible class to maintain position, add slide-out for animation
      className += ' visible slide-out'
      animationDelay = outDelay
      break
  }

  useEffect(() => {
    let rafId: number
    const tick = () => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        setXPosition(Math.round(rect.left))
      }
      rafId = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className="video-slide-item-container">


      <div
        ref={containerRef}
        className={className}
        style={{ animationDelay }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="slide-video"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

      </div>
      <p className="video-position">x: {xPosition}px</p>
      <p className="video-title">{title}</p>
    </div>
  )
}

