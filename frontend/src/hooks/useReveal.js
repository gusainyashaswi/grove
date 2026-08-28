import { useEffect } from "react";

/**
 * useReveal — attaches an IntersectionObserver to every .reveal element
 * in the document, adding "in-view" when it crosses the threshold.
 *
 * One-shot: each element is unobserved after it first enters view.
 * Respects prefers-reduced-motion by skipping animation entirely.
 *
 * Call once near the top of the page (e.g., Home.jsx) after the full
 * render tree has mounted. To re-scan after async content appears,
 * increment the `deps` array (or call it again with a new key).
 */
export function useReveal(deps = []) {
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const allReveal = document.querySelectorAll(".reveal:not(.in-view)");

        if (reduceMotion) {
            allReveal.forEach((el) => el.classList.add("in-view"));
            return;
        }

        if (!("IntersectionObserver" in window)) {
            allReveal.forEach((el) => el.classList.add("in-view"));
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        allReveal.forEach((el) => io.observe(el));

        return () => io.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
