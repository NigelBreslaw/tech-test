import { useEffect, useRef } from "react"
import Copy, { type CopyRef } from './copy'

export default function DummyText() {

    const copyRef = useRef<CopyRef>(null)


    // Trigger Copy animation after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            copyRef.current?.trigger()
        }, 2000)
        return () => clearTimeout(timer)
    }, [])


    return (
        <div style={{
            position: 'absolute',
            top: '5%',
            left: '5%',
            width: '40%',
            zIndex: 1000,
            pointerEvents: 'none'
        }}>
            <Copy ref={copyRef}>
                <p style={{ margin: 0, color: 'black', fontSize: '24px', lineHeight: '1.6', textAlign: 'left', fontFamily: 'sans-serif' }}>
                    This would be text about the Renesas Hardware or info about Slint and how we are the most awesome GUI toolkit to use. Because your smart proudct needs smart software.
                </p>
            </Copy>
        </div>
    )}