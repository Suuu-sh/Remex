import {useEffect, useRef, useState, type CSSProperties, type PointerEvent, type RefObject} from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Adds `data-in` to every `[data-reveal]` element once it enters the viewport. */
export function useRevealAll() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.setAttribute('data-in', ''));
      return;
    }
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-in', '');
        observer.unobserve(entry.target);
      }),
      {rootMargin: '0px 0px -8% 0px', threshold: 0.04},
    );
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/** 0 → 1 as the element travels through the viewport (start: top hits `start`, end: bottom hits `end`). */
export function useScrollProgress<T extends HTMLElement>(start = 0.85, end = 0.35): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) { setProgress(1); return; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;
      const to = vh * end - rect.height;
      const value = (from - rect.top) / (from - to);
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [start, end]);
  return [ref, progress];
}

/** Page-level scroll position (0 → 1) and whether we have scrolled past `offset` px. */
export function usePageScroll(offset = 24) {
  const [state, setState] = useState({progress: 0, scrolled: false, y: 0});
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setState({progress: max > 0 ? y / max : 0, scrolled: y > offset, y});
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [offset]);
  return state;
}

/** Cycles 0..length-1 every `ms`, paused while `paused` or when reduced motion is preferred. */
export function useCycle(length: number, ms: number, paused = false) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = window.setInterval(() => setIndex(i => (i + 1) % length), ms);
    return () => window.clearInterval(id);
  }, [length, ms, paused]);
  return [index, setIndex] as const;
}

/** Whether the element is currently in the viewport. */
export function useInView<T extends HTMLElement>(rootMargin = '0px'): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {rootMargin});
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);
  return [ref, inView];
}

/** Animates a number toward `target` with an ease-out curve. */
export function useCountTo(target: number, duration = 700) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (prefersReducedMotion()) { setValue(target); from.current = target; return; }
    const start = performance.now();
    const origin = from.current;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(origin + (target - origin) * eased);
      setValue(next);
      from.current = next;
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

/** Sets --mx / --my on the element for cursor-following highlights. */
export function trackPointer(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  el.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

/** Typed helper for CSS custom properties in `style`. */
export const vars = (values: Record<string, string | number>) => values as CSSProperties;
