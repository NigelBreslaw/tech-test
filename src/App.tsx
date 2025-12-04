import { useState, useRef } from 'react'
import orangeOil from './assets/3933935-hd_1920_1080_25fps.mp4'
import video1 from './assets/15205582-hd_1920_1080_60fps.mp4'
import video2 from './assets/12647214_1920_1080_30fps.mp4'
import video3 from './assets/8387491-uhd_3840_2160_30fps.mp4'

import ipadFrame from './assets/ipad-m4-landscape.png'
import { VideoSlideItem } from './components/VideoSlideItem'
import './App.css'
import { WebCamLogo } from './components/WebCamLogo.tsx'

function App() {
  const [animationStarted, setAnimationStarted] = useState(false)

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
          onClick={() => setAnimationStarted(true)}
        >
          Start Animation
        </button>
        <div className={`white-rectangle ${animationStarted ? 'slide-up' : ''}`}>
          <div className="video-slide-container">
            <VideoSlideItem
              videoSrc={video1}
              animationDelay="0.2s"
              animationStarted={animationStarted}
            />
            <VideoSlideItem
              videoSrc={video2}
              animationDelay="0.4s"
              animationStarted={animationStarted}
            />
            <VideoSlideItem
              videoSrc={video3}
              animationDelay="0.6s"
              animationStarted={animationStarted}
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
