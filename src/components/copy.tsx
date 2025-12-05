import React, { useRef, useImperativeHandle, type ReactElement } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

export interface CopyRef {
    trigger: () => void;
}

export default function Copy({ 
    children, 
    ref,
    delay = 0
}: { 
    children: ReactElement;
    ref?: React.Ref<CopyRef>;
    delay?: number;
}) {
    const containerRef = useRef<HTMLElement | null>(null);
    const elementRef = useRef<HTMLElement[]>([]);
    const splitRef = useRef<SplitText[]>([]);
    const lines = useRef<HTMLElement[]>([]);
    const animationRef = useRef<gsap.core.Tween | null>(null);

    useGSAP(() => {

        if (!containerRef.current) return;

        splitRef.current = [];
        elementRef.current = [];
        lines.current = [];

        let elements: HTMLElement[] = [];
        if (containerRef.current.hasAttribute("data-copy-wrapper")){
            elements = Array.from(containerRef.current.children) as HTMLElement[];
        } else {
            elements = [containerRef.current];
        }

        elements.forEach((element) => {
            elementRef.current.push(element);
        

        const split = SplitText.create(element, {
            type: "lines",
            mask: "lines",
            lineClass: "lines++"
        });

        splitRef.current.push(split);

        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== "0px"){
            if(split.lines.length > 0){
                (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
            }
            element.style.textIndent = "0";
        }

        lines.current.push(...(split.lines as HTMLElement[]));
        
        });

        gsap.set(lines.current, { y: "100%" });

        // Store animation props but don't play yet - will be triggered via ref
        const animationProps = {
            y: "0%",
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
            delay: delay,
        }

        // Create animation but pause it - will be triggered by parent via ref
        animationRef.current = gsap.to(lines.current, {
            ...animationProps,
            paused: true,
        });

        return () => {
            splitRef.current.forEach((split) => {
                if(split) {
                    split.revert();
                }
            });
        };
    }, {
        scope: containerRef,
        dependencies: [delay],
    });

    // Expose trigger method via ref
    useImperativeHandle(ref, () => ({
        trigger: () => {
            if (animationRef.current) {
                animationRef.current.play();
            }
        },
    }), []);

    // Always use wrapper div to avoid cloneElement ref issues
    // For single child, the wrapper will be the container
    // For multiple children, wrapper has data-copy-wrapper attribute
    const hasMultipleChildren = React.Children.count(children) > 1;
    
    return (
        <div 
            ref={containerRef as React.Ref<HTMLDivElement>} 
            {...(hasMultipleChildren ? { "data-copy-wrapper": "true" } : {})}
        >
            {children}
        </div>
    )
}