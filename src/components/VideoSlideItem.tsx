interface VideoSlideItemProps {
  videoSrc: string
  animationDelay: string
  animationStarted: boolean
  onPlayPause?: (playing: boolean) => void
}

export function VideoSlideItem({ videoSrc, animationDelay, animationStarted }: VideoSlideItemProps) {
  return (
    <div 
      className={`video-slide-item ${animationStarted ? 'slide-in' : ''}`} 
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
  )
}

