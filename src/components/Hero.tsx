import {useEffect, useRef, useState} from 'react';
import LineButton from './LineButton';
import {text} from '../i18n';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [failed, setFailed] = useState(false);
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
    const video = videoRef.current;
    if (!video) return;
    if (paused || reduced || !available || blocked || failed) {
      video.pause();
    } else {
      video.muted = true;
      void video.play().catch((error: unknown) => {
        // Pausing or removing the source can interrupt a pending play request.
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setBlocked(true);
      });
    }
  }, [paused, reduced, available, blocked, failed]);
  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      setPaused(true);
      video.pause();
    } else {
      setPaused(false);
      setBlocked(false);
      video.muted = true;
      void video.play().catch((error: unknown) => {
        // Pausing or removing the source can interrupt a pending play request.
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setBlocked(true);
      });
    }
  };
  return (
    <section ref={ref} className="hero hero-cinematic" id="top" data-dark>
      <div className="cinema-scene" aria-hidden="true">
        <video ref={videoRef} className="cinema-video" src={reduced || failed ? undefined : '/media/tokyo-residential-walk.mp4'} poster="/media/tokyo-residential-walk-poster.jpg" muted playsInline loop preload={reduced ? 'none' : 'metadata'} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} tabIndex={-1}/>
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
            <a href="https://www.pexels.com/video/peaceful-suburban-street-in-tokyo-35306935/" target="_blank" rel="noopener noreferrer">{text('東京の街並み／イメージ映像（素材）', 'Tokyo streets / stock footage')} ↗</a>
            <button type="button" onClick={togglePlayback} aria-pressed={!playing} disabled={reduced || failed} aria-label={playing ? text('背景動画を一時停止', 'Pause background video') : text('背景動画を再生', 'Play background video')}>{failed ? text('映像を読み込めません', 'Video unavailable') : reduced ? text('端末設定により静止画を表示', 'Still image: reduced motion') : playing ? text('Ⅱ 一時停止', 'Ⅱ Pause') : text('▶ 再生', '▶ Play')}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
