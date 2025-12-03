import { useState, useRef, useEffect } from 'react'
import greenCrystalsVideo from './assets/green-crystals.mp4'
import blueCrystalsVideo from './assets/blue-crystals.mp4'
import slintTextImage from './assets/slint-text.png'
import './App.css'

function App() {
  const [videoPlaying, setVideoPlaying] = useState(true)
  const backgroundVideoRef = useRef<HTMLVideoElement>(null)
  const maskedVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (backgroundVideoRef.current && maskedVideoRef.current) {
      if (videoPlaying) {
        backgroundVideoRef.current.play()
        maskedVideoRef.current.play()
      } else {
        backgroundVideoRef.current.pause()
        maskedVideoRef.current.pause()
      }
    }
  }, [videoPlaying])

  return (
    <>
      <video
        ref={backgroundVideoRef}
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={greenCrystalsVideo} type="video/mp4" />
      </video>

      <div className="video-text-container">
        <div 
          className="video-mask"
          style={{ 
            maskImage: `url(${slintTextImage})`, 
            WebkitMaskImage: `url(${slintTextImage})` 
          }}
        >
          <video
            ref={maskedVideoRef}
            className="masked-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={blueCrystalsVideo} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="card">
        <button onClick={() => setVideoPlaying(!videoPlaying)}>
          Play / Stop
        </button>
      </div>
    </>
  )
}

export default App
