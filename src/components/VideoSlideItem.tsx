
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


  return (
    <div className="video-slide-item-container">


      <div
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
      <p className="video-title">{title}</p>
    </div>
  )
}

