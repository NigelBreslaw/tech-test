// cSpell:ignore Renesas

import { useState, useRef, useEffect } from 'react'
import orangeOil from './assets/3933935-hd_1920_1080_25fps.mp4'
import circleGUI from './assets/8387491-uhd_3840_2160_30fps.mp4'
import graphGUI from './assets/12647214_1920_1080_30fps.mp4'
import sciFiGUI from './assets/15205582-hd_1920_1080_60fps.mp4'
import slintLogo from './assets/slint-logo.svg'
import renesasLogo from './assets/Renesas_Electronics_logo.svg'
import ipadFrame from './assets/ipad-m4-landscape.png'
import Webcam from 'react-webcam'
import './App.css'

function App() {
  const [videoPlaying, setVideoPlaying] = useState(true)
  const [animationStarted, setAnimationStarted] = useState(false)
  const backgroundVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (backgroundVideoRef.current) {
      if (videoPlaying) {
        backgroundVideoRef.current.play()
      } else {
        backgroundVideoRef.current.pause()
      }
    }
  }, [videoPlaying])

  return (
    <div className="app-container">
      <video
        ref={backgroundVideoRef}
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
          <div
            className="video-mask"
            style={{
              maskImage: `url(${slintLogo}), url(${renesasLogo})`,
              WebkitMaskImage: `url(${slintLogo}), url(${renesasLogo})`,
            }}
          >
            {videoPlaying && (
              <Webcam
                className="masked-video"
                audio={false}
                mirrored={true}
              />
            )}
          </div>
        </div>
        <div className="card">
          <button onClick={() => setVideoPlaying(!videoPlaying)}>
            {videoPlaying ? 'Stop Webcam' : 'Start Webcam'}
          </button>
        </div>
        <button 
          className="animation-button"
          onClick={() => setAnimationStarted(true)}
        >
          Start Animation
        </button>
        <div className={`white-rectangle ${animationStarted ? 'slide-up' : ''}`}>
          <div className="video-slide-container">
            <div className={`video-slide-item ${animationStarted ? 'slide-in' : ''}`} style={{ animationDelay: '1s' }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="slide-video"
              >
                <source src={sciFiGUI} type="video/mp4" />
              </video>
            </div>
            <div className={`video-slide-item ${animationStarted ? 'slide-in' : ''}`} style={{ animationDelay: '1.5s' }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="slide-video"
              >
                <source src={graphGUI} type="video/mp4" />
              </video>
            </div>
            <div className={`video-slide-item ${animationStarted ? 'slide-in' : ''}`} style={{ animationDelay: '2s' }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="slide-video"
              >
                <source src={circleGUI} type="video/mp4" />
              </video>
            </div>
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
