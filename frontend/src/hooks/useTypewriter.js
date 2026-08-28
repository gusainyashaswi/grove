import { useState, useEffect } from "react";

export function useTypewriter(text, speed = 38, startDelay = 600) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed("");
        setDone(false);

        let timeoutId;
        let intervalId;

        timeoutId = setTimeout(() => {
            let currentIndex = 0;

            intervalId = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayed(text.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    setDone(true);
                    clearInterval(intervalId);
                }
            }, speed);
        }, startDelay);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [text, speed, startDelay]);

    return { displayed, done };
}
