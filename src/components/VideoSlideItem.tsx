
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
  let titleClass = 'video-title title-hidden'
  let titleTransitionDelay = '0s'

  switch (animationState) {
    case 'idle':
      titleClass = 'video-title title-hidden'
      break
    case 'sliding-in':
      className += ' slide-in'
      animationDelay = inDelay
      titleClass = 'video-title title-visible'
      titleTransitionDelay = `calc(${inDelay} + 0.35s)` // fade starts after slide-in completes
      break
    case 'visible':
      className += ' slide-in visible'
      titleClass = 'video-title title-visible'
      titleTransitionDelay = `calc(${inDelay} + 0.75s)`
      break
    case 'sliding-out':
      className += ' visible slide-out'
      animationDelay = outDelay
      titleClass = 'video-title title-hidden'
      titleTransitionDelay = outDelay
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
      <p
        className={titleClass}
        style={{ transitionDelay: titleTransitionDelay }}
      >
        {title}
      </p>
    </div>
  )
}

