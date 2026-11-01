import {useEffect, useRef, useState} from 'react';
import LineButton from './LineButton';
import {text} from '../i18n';

const clips = [
  {src: '/media/tokyo-residential-walk.mp4', poster: '/media/tokyo-residential-walk-poster.jpg'},
  {src: '/media/tokyo-residential-walk-later.mp4', poster: '/media/tokyo-residential-walk-later-poster.jpg'},
];
const sourceUrl = 'https://www.pexels.com/video/peaceful-suburban-street-in-tokyo-35306935/';
const sceneDuration = 6000;
const fadeDuration = 800;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [failed, setFailed] = useState<number[]>([]);
  const allFailed = failed.length === clips.length;
  const [available, setAvailable] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = true;
    const update = () => { setReduced(preference.matches); setAvailable(onScreen && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; update(); });
    if (ref.current) observer.observe(ref.current);
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { observer.disconnect(); preference.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (paused || reduced || !available || blocked || failed.includes(index) || (index !== active && index !== outgoing)) {
        video.pause();
      } else {
        video.muted = true;
        void video.play().catch((error: unknown) => {
          if (error instanceof DOMException && error.name === 'AbortError') return;
          if (index === active) setBlocked(true);
        });
      }
    });
  }, [paused, reduced, available, blocked, failed, active, outgoing]);

  useEffect(() => {
    if (outgoing === null) return;
    const timer = window.setTimeout(() => setOutgoing(null), fadeDuration);
    return () => window.clearTimeout(timer);
  }, [outgoing]);

  useEffect(() => {
    if (paused || reduced || !available || blocked || !playing || allFailed) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const next = clips.map((_, offset) => (active + offset + 1) % clips.length).find(index => index !== active && !failed.includes(index));
      if (next === undefined) return;
      const video = videoRefs.current[next];
      if (!video) return;
      try {
        // Keep the current scene visible until the next video's playback is ready.
        video.currentTime = 0;
        video.muted = true;
        await video.play();
        if (cancelled) { video.pause(); return; }
        setOutgoing(active);
        setActive(next);
      } catch {
        // Leave the current scene playing rather than fading to an unavailable clip.
      }
    }, sceneDuration);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [paused, reduced, available, blocked, playing, allFailed, active, failed]);

  useEffect(() => {
    if (!failed.includes(active)) return;
    const fallback = clips.findIndex((_, index) => !failed.includes(index));
    if (fallback !== -1) { setOutgoing(null); setActive(fallback); }
  }, [failed, active]);

  const togglePlayback = () => {
    const video = videoRefs.current[active];
    if (!video) return;
    if (playing) {
      setPaused(true);
      videoRefs.current.forEach(item => item?.pause());
    } else {
      setPaused(false);
      setBlocked(false);
      video.muted = true;
      void video.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setBlocked(true);
      });
    }
  };
  return (
    <section ref={ref} className="hero hero-cinematic" id="top" data-dark>
      <div className={`cinema-scene${paused ? ' is-paused' : ''}`} aria-hidden="true">
        {clips.map((clip, index) => (
          <video key={clip.src} ref={element => { videoRefs.current[index] = element; }} className={`cinema-video${index === active ? ' is-active' : index === outgoing ? ' is-outgoing' : ''}`} src={reduced || failed.includes(index) ? undefined : clip.src} poster={clip.poster} muted playsInline loop preload={reduced ? 'none' : 'auto'} onPlay={() => { if (index === active) setPlaying(true); }} onPause={() => { if (index === active) setPlaying(false); }} onError={() => { setFailed(items => items.includes(index) ? items : [...items, index]); if (index === active) setPlaying(false); }} tabIndex={-1}/>
        ))}
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="service-label"><span/>{text('東京23区の現地訪問サービス', 'On-site visits in Tokyo’s 23 wards')}</p>
          <h1>{text('東京の現地確認を、', 'On-site checks in Tokyo,')}<br/><em>{text('動画とレポートで。', 'with video and a report.')}</em></h1>
          <p className="hero-lead">{text('引っ越し先の下見、店舗・物件の確認、閉店前の記録。あなたの代わりに、運営者が現地を訪ねます。', 'Neighborhoods, shops, properties, or a place before it closes. The owner of Remex makes the visit for you.')}</p>
          <p className="hero-note">{text('基本レポートと、撮影が許可される場合の未編集の一人称動画をお届け。', 'A basic report, plus an unedited first-person video when filming is permitted.')}</p>
          <div className="hero-actions"><LineButton/><a className="text-link" href="#service">{text('サービス内容を見る', 'Explore the service')} <span aria-hidden="true">↓</span></a></div>
          <p className="hero-consultation">{text('相談・見積もり無料 ／ 相談だけでは予約は確定しません', 'Free consultation and estimate · An inquiry is not a booking')}</p>
        </div>
        <div className="hero-bottom">
          <dl className="hero-facts">
            <div><dt>{text('対応エリア', 'Service area')}</dt><dd>{text('東京', 'Tokyo ')}<b>23</b>{text('区', ' wards')}</dd></div>
            <div><dt>{text('現地作業時間', 'On-site time')}</dt><dd><b>30</b>{text('分〜', ' min+')}</dd></div>
            <div><dt>{text('基本料金', 'Base price')}</dt><dd>¥<b>6,600</b>{text('〜', '+')}</dd></div>
          </dl>
          <div className="hero-animation-controls">
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{text('東京の街並み／イメージ映像（素材）', 'Tokyo streets / stock footage')} <span className="scene-count">{active + 1}/{clips.length}</span> ↗</a>
            <button type="button" onClick={togglePlayback} aria-pressed={!playing} disabled={reduced || allFailed} aria-label={playing ? text('背景動画を一時停止', 'Pause background video') : text('背景動画を再生', 'Play background video')}>{allFailed ? text('映像を読み込めません', 'Video unavailable') : reduced ? text('端末設定により静止画を表示', 'Still image: reduced motion') : playing ? text('Ⅱ 一時停止', 'Ⅱ Pause') : text('▶ 再生', '▶ Play')}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
