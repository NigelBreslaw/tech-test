// cSpell:ignore Renesas

import { useState, useRef, useEffect } from 'react'
import orangeOil from './assets/3933935-hd_1920_1080_25fps.mp4'
import slintLogo from './assets/slint-logo.svg'
// import renesasLogo from './assets/Renesas_Electronics_logo.svg'
import ipadFrame from './assets/ipad-m4-landscape.png'
import Webcam from 'react-webcam'
import './App.css'

function App() {
  const [videoPlaying, setVideoPlaying] = useState(true)
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
              maskImage: `url(${slintLogo})`,
              WebkitMaskImage: `url(${slintLogo})`
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
