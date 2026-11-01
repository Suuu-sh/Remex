# Website media sources

## Tokyo residential street background

- Verified / downloaded: **2026-11-02 (Asia/Tokyo)**.
- Provider: **Pexels**.
- Creator: **Miltan Monjib**.
- Item: [Peaceful Suburban Street in Tokyo — 35306935](https://www.pexels.com/video/peaceful-suburban-street-in-tokyo-35306935/).
- Location evidence: the official item description identifies a quiet suburban street in Tokyo, Japan. No specific ward is asserted here.
- License: [Pexels License](https://www.pexels.com/license/). The item page links to this free license. It permits website/commercial use and modification; credit is optional. This integration includes a source link nevertheless.
- Boundaries: do not imply endorsement by depicted people or brands, portray recognizable people offensively, sell unaltered copies, redistribute as stock/wallpaper, or use the media as a trademark. Incidental houses, vehicles and street features are background scenery, not Remex partners or customers. The footage is labeled as stock imagery, not a Remex visit/delivery.
- Acquisition: the official item's **Free download** link redirected to a public Pexels video-file URL. No access-control bypass, preview watermark removal, or signed credential URL was used.
- Original: portrait 1080×1920, approximately 21.855 seconds, 59.94 fps. Original downloads remain temporary, outside this repository.
- Integration: `public/media/tokyo-residential-walk.mp4` is a 14-second excerpt starting at 0 seconds, resized to 720×1280 and re-encoded as H.264 MP4 at approximately 1.6 Mbps, optimized for network playback, with **no audio track**. Native macOS AVFoundation was used; no project dependency was added.
- Poster: `public/media/tokyo-residential-walk-poster.jpg`, derived from the excerpt's opening frame, JPEG quality 0.8.
- Presentation: responsive `object-fit: cover`, preserving aspect ratio; the desktop crop emphasizes houses and roadway. No CSS zoom/parallax is applied to the footage. Text and a readability overlay are separate layers.
- Review: extracted 0/3/6/10-second frames confirm real forward camera movement (road markings and a manhole pass beneath the camera; poles/houses approach). No prominent foreground face or adult advertisement was observed in the selected excerpt. This is a visual assessment, not a guarantee of third-party rights clearance.
- Use is limited to an integrated Remex website background and poster; there is no stock download/gallery feature. Do not reuse as a standalone stock collection.

## Alternating hero scenes (2026-11-02)

The hero now alternates two **temporal excerpts of the same Pexels item 35306935**, not different filming locations or separate contributors. The licensing and use boundaries above apply to both.

| Scene | Integrated file | Original source range | Duration | Output |
| --- | --- | --- | --- | --- |
| 1 | `public/media/tokyo-residential-walk.mp4` | 0–14 seconds | 14 seconds | Existing H.264 720×1280, no audio |
| 2 | `public/media/tokyo-residential-walk-later.mp4` | 12–20 seconds | 8 seconds | H.264 720×1280, approximately 1.6 Mbps, no audio |

- Scene 2 uses the same native AVFoundation extraction and network-optimized H.264 encoding workflow. Its poster is `public/media/tokyo-residential-walk-later-poster.jpg`, derived from its first frame.
- Playback starts each scene at its beginning, so the usual six-second display windows show source 0–6 and 12–18 seconds respectively. There is a 0.8-second crossfade after the incoming video starts successfully. A loading failure leaves the current scene visible rather than fading to black.
- Both the media and switching timer stop for user pause, reduced motion, an offscreen hero, or a hidden document. Reduced motion does not request video files and uses the opening poster. The source link is valid for either scene; the visible scene counter is not a location claim.
- Additional candidate checks rejected stationary cameras and inaccurate Tokyo metadata: item 34654546 visibly shows Kamakura Komachi-dori, while 35187988 shows Nishikawaguchi. Neither is included. Other checked shots did not establish meaningful forward walking. No unverified place or stationary shot was substituted to increase the scene count.
