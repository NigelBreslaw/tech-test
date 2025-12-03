import { useState, useRef, useEffect } from 'react'
import greenCrystalsVideo from './assets/green-crystals.mp4'
import slintTextImage from './assets/slint-text.png'
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
          {videoPlaying && (
            <Webcam
              className="masked-video"
              audio={false}
              mirrored={false}
            />
          )}
        </div>
      </div>
      <div className="card">
        <button onClick={() => setVideoPlaying(!videoPlaying)}>
          {videoPlaying ? 'Stop Webcam' : 'Start Webcam'}
        </button>
      </div>
    </>
  )
}

export default App
