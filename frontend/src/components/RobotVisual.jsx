import { useEffect, useRef, useState } from "react";

export default function RobotVisual({ className = "" }) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const targetTimeRef = useRef(0);
    const isSeekingRef = useRef(false);
    const prevXRef = useRef(null);
    const rafIdRef = useRef(null);

    const [isHovered, setIsHovered] = useState(false);

    // This is the existing Grove Robot Video URL
    const VIDEO_URL =
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";
    const SENSITIVITY = 0.6;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            if (video.duration && !isNaN(video.duration)) {
                targetTimeRef.current = video.duration * 0.15;
                video.currentTime = targetTimeRef.current;
            }
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        let tilt = { x: 0, y: 0, shiftX: 0, shiftY: 0 };
        let targetTilt = { x: 0, y: 0, shiftX: 0, shiftY: 0 };

        const handleMouseMove = (e) => {
            if (!video || isNaN(video.duration) || !video.duration) return;

            // Video seeking logic
            const currentX = e.clientX;
            if (prevXRef.current !== null) {
                const delta = currentX - prevXRef.current;
                const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;

                targetTimeRef.current = Math.max(
                    0,
                    Math.min(video.duration, targetTimeRef.current + timeOffset)
                );

                if (!isSeekingRef.current) {
                    isSeekingRef.current = true;
                    video.currentTime = targetTimeRef.current;
                }
            }
            prevXRef.current = currentX;

            // 3D Tilt Logic
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                targetTilt.x = ((x - centerX) / centerX) * 8; // Max 8 deg
                targetTilt.y = -((y - centerY) / centerY) * 8;
                targetTilt.shiftX = ((x - centerX) / centerX) * 4;
                targetTilt.shiftY = ((y - centerY) / centerY) * 4;
            } else {
                targetTilt = { x: 0, y: 0, shiftX: 0, shiftY: 0 };
            }
        };

        const handleSeeked = () => {
            if (!video) return;
            if (Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
                video.currentTime = targetTimeRef.current;
            } else {
                isSeekingRef.current = false;
            }
        };

        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                handleMouseMove(e.touches[0]);
            }
        };

        const renderLoop = () => {
            tilt.x += (targetTilt.x - tilt.x) * 0.08;
            tilt.y += (targetTilt.y - tilt.y) * 0.08;
            tilt.shiftX += (targetTilt.shiftX - tilt.shiftX) * 0.06;
            tilt.shiftY += (targetTilt.shiftY - tilt.shiftY) * 0.06;

            if (containerRef.current) {
                containerRef.current.style.transform = `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translate3d(${tilt.shiftX}px, ${tilt.shiftY}px, 0)`;
            }

            rafIdRef.current = requestAnimationFrame(renderLoop);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        video.addEventListener("seeked", handleSeeked);
        rafIdRef.current = requestAnimationFrame(renderLoop);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("seeked", handleSeeked);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)] bg-[#f5f5f5] border border-black/[0.05] select-none will-change-transform transition-shadow duration-300 w-[90%] max-w-[480px] aspect-[4/5] mx-auto ${className}`}
            style={{ transformStyle: "preserve-3d" }}
        >
            <video
                ref={videoRef}
                src={VIDEO_URL}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-[center_35%] filter contrast-100 brightness-105 pointer-events-none"
            />

            {/* Subtle inner shadow and glass overlay matching the off-white theme */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/[0.08] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/[0.03] via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
