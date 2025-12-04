import slintLogo from '../assets/slint-logo.svg'
import renesasLogo from '../assets/Renesas_Electronics_logo.svg'
import Webcam from 'react-webcam'

export function WebCamLogo() {
    return (
        <div
            className="video-mask"
            style={{
                maskImage: `url(${slintLogo}), url(${renesasLogo})`,
                WebkitMaskImage: `url(${slintLogo}), url(${renesasLogo})`,
            }}
        >
            <Webcam
                className="masked-video"
                audio={false}
                mirrored={true}
            />
        </div>
    )
}