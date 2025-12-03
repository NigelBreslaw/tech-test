import { useState } from 'react'
import greenCrystalsVideo from './assets/green-crystals.mp4'
import blueCrystalsVideo from './assets/blue-crystals.mp4'
import slintTextImage from './assets/slint-text.png'
import './App.css'

function App() {
  const [videoPlaying, setVideoPlaying] = useState(true)

  return (
    <>
      <video
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
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
