import { useEffect, useRef } from "react";

export default function ScrubbableBackgroundVideo() {
    const videoRef = useRef(null);
    const targetTimeRef = useRef(0);
    const isSeekingRef = useRef(false);
    const prevXRef = useRef(null);

    const VIDEO_URL =
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";
    const SENSITIVITY = 0.8;

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

        const handleMouseMove = (e) => {
            if (!video || isNaN(video.duration) || !video.duration) return;

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

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        video.addEventListener("seeked", handleSeeked);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("seeked", handleSeeked);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#050708]">
            <video
                ref={videoRef}
                src={VIDEO_URL}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover opacity-75 sm:opacity-85 filter contrast-105 brightness-95 transition-opacity duration-700"
                style={{ objectPosition: "70% center" }}
            />
            {/* Subtle Gradient Overlays for readable text and depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050708]/95 via-[#050708]/75 to-transparent sm:w-2/3 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050708]/70 via-transparent to-[#050708]/95 pointer-events-none" />
        </div>
    );
}
tilt.shiftY = (tilt.shiftY || 0) + (((targetTilt.shiftY || 0) - (tilt.shiftY || 0)) * 0.06);

if (containerRef.current) {
    containerRef.current.style.transform = `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translate3d(${tilt.shiftX}px, ${tilt.shiftY}px, 0)`;
}

rafIdRef.current = requestAnimationFrame(renderLoop);
        };

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
        className={`relative rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-black/10 select-none will-change-transform transition-shadow duration-300 ${className}`}
        style={{ transformStyle: "preserve-3d" }}
    >
        <video
            ref={videoRef}
            src={VIDEO_URL}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-[center_35%] filter contrast-[1.03] brightness-[1.02] pointer-events-none"
        />

        {/* Subtle inner shadow and glass overlay */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

        {/* Status Pill on the Video */}
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-black/10 text-xs font-mono text-neutral-800 shadow-sm pointer-events-none">
            <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-black">A.R.I.A</span>
                <span className="text-neutral-400">·</span>
                <span className="text-neutral-600">Adaptive Intelligence</span>
            </div>
            <span className="text-[10.5px] text-neutral-500 hidden sm:inline">
                Move cursor ↔ to track
            </span>
        </div>
    </div>
);
}
