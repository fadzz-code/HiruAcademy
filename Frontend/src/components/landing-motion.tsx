"use client";

import { useEffect } from "react";

export function LandingMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-landing-motion]");
    if (!root) return;

    const revealTargets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const counters = Array.from(root.querySelectorAll<HTMLElement>("[data-counter]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.dataset.revealed = "true");
      return;
    }

    root.dataset.motionReady = "true";
    counters.forEach((counter) => { counter.textContent = `0${counter.dataset.suffix ?? ""}`; });

    const frames = new Set<number>();
    const animatedCounters = new Set<HTMLElement>();

    const animateCounter = (counter: HTMLElement) => {
      if (animatedCounters.has(counter)) return;
      animatedCounters.add(counter);

      const target = Number(counter.dataset.counter);
      const suffix = counter.dataset.suffix ?? "";
      const duration = 1400;
      const start = performance.now();

      const update = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) {
          const nextFrame = requestAnimationFrame(update);
          frames.add(nextFrame);
        }
      };

      const firstFrame = requestAnimationFrame(update);
      frames.add(firstFrame);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        target.dataset.revealed = "true";
        target.querySelectorAll<HTMLElement>("[data-counter]").forEach(animateCounter);
        observer.unobserve(target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8%" });

    const setupFrame = requestAnimationFrame(() => {
      const paintFrame = requestAnimationFrame(() => {
        revealTargets.forEach((target) => observer.observe(target));
      });
      frames.add(paintFrame);
    });
    frames.add(setupFrame);

    return () => {
      observer.disconnect();
      frames.forEach(cancelAnimationFrame);
    };
  }, []);

  return null;
}
