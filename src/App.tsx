import { useState } from 'react'
import orangeOil from './assets/3933935-hd_1920_1080_25fps.mp4'
import video1 from './assets/15205582-hd_1920_1080_60fps.mp4'
import video2 from './assets/12647214_1920_1080_30fps.mp4'
import video3 from './assets/8387491-uhd_3840_2160_30fps.mp4'

import ipadFrame from './assets/ipad-m4-landscape.png'
import { VideoSlideItem } from './components/VideoSlideItem'
import './App.css'
import { WebCamLogo } from './components/WebCamLogo.tsx'

type AnimationPhase = 'closed' | 'opening' | 'open' | 'closing'

function App() {
  const [phase, setPhase] = useState<AnimationPhase>('closed')
  const [shouldSlideDown, setShouldSlideDown] = useState(false)

  const handleToggle = () => {
    if (phase === 'closed') {
      // Start opening
      setPhase('opening')
      setShouldSlideDown(false)
      // After opening animation completes, transition to open
      setTimeout(() => {
        setPhase('open')
      }, 1350) // 0.6s max delay + 0.75s animation
    } else if (phase === 'open') {
      // Start closing: videos slide out first
      setPhase('closing')
      setShouldSlideDown(false)
      // After videos finish sliding out, slide down the rectangle
      setTimeout(() => {
        setShouldSlideDown(true)
        // After rectangle slides down, reset to closed
        setTimeout(() => {
          setPhase('closed')
          setShouldSlideDown(false)
        }, 750) // Wait for slide-down animation to complete
      }, 1350) // 0.6s max delay + 0.75s animation for videos
    }
  }

  // Map phase to VideoSlideItem animation states
  const getItemAnimationState = (phase: AnimationPhase): 'idle' | 'sliding-in' | 'visible' | 'sliding-out' => {
    switch (phase) {
      case 'closed':
        return 'idle'
      case 'opening':
        return 'sliding-in'
      case 'open':
        return 'visible'
      case 'closing':
        return 'sliding-out'
    }
  }

  const itemState = getItemAnimationState(phase)

  return (
    <div className="app-container">
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={orangeOil} type="video/mp4" />
      </video>

      <div className="ipad-content">
        <div className="video-text-container">
          <WebCamLogo />
        </div>
        <button
          className="animation-button"
          onClick={handleToggle}
        >
          {phase === 'open' || phase === 'opening' ? 'Close Animation' : 'Start Animation'}
        </button>
        <div className={`white-rectangle ${(phase === 'open' || phase === 'opening' || phase === 'closing') && !shouldSlideDown ? 'slide-up' : ''} ${shouldSlideDown ? 'slide-down' : ''}`}>
          <div className="video-slide-container">
            <VideoSlideItem
              videoSrc={video1}
              animationState={itemState}
              inDelay="0.2s"
              outDelay="0.4s"
            />
            <VideoSlideItem
              videoSrc={video2}
              animationState={itemState}
              inDelay="0.4s"
              outDelay="0.2s"
            />
            <VideoSlideItem
              videoSrc={video3}
              animationState={itemState}
              inDelay="0.6s"
              outDelay="0s"
            />
          </div>
        </div>
      </div>
      <img
        src={ipadFrame}
        alt="iPad Frame"
        className="ipad-frame"
      />
    </div>
  )
}

export default App
