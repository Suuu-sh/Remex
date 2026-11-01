import LineButton from './LineButton';
import {text} from '../i18n';

/** A fictional delivery preview, not footage or a customer visit. */
function ReportPreview() {
  return (
    <figure className="field-report">
      <figcaption className="report-caption">
        <span>{text('お届けする記録のイメージ', 'What your delivery could look like')}</span>
        <span className="report-example">{text('架空の作成例', 'Fictional example')}</span>
      </figcaption>
      <div className="report-scene" aria-hidden="true">
        <svg viewBox="0 0 560 280" fill="none">
          <rect width="560" height="280" fill="#dce3dd"/>
          <circle cx="450" cy="54" r="24" fill="#f7edcf"/>
          <path d="M0 186H560V280H0Z" fill="#eae4d8"/>
          <path d="M210 280 272 161H322L410 280" fill="#b1b8b0"/>
          <path d="M306 184 315 205M326 230 339 259" stroke="#f6f2ea" strokeWidth="3"/>
          <path d="M0 77H112V208H0Z" fill="#71847c"/>
          <path d="M15 91H97V195H15Z" stroke="#435950"/>
          {[0,1,2].map(r => [0,1,2].map(c => <rect key={`${r}-${c}`} x={24+c*26} y={105+r*29} width="12" height="16" fill="#dce3dd"/>))}
          <path d="M124 118H230V199H124Z" fill="#f4efe1" stroke="#8b978a"/>
          <path d="M118 118H236L225 100H129Z" fill="#e77551"/>
          <rect x="139" y="141" width="41" height="32" fill="#b9c6b9"/>
          <rect x="191" y="138" width="23" height="61" fill="#6d8074"/>
          <path d="M364 83H469V212H364Z" fill="#c5b59b"/>
          <path d="M381 105H402V132H381ZM430 105H451V132H430ZM381 151H402V178H381ZM430 151H451V178H430Z" fill="#f6f2ea"/>
          <path d="M484 133H560V228H484Z" fill="#8d9b87"/>
          <path d="M477 133 518 103 560 133" fill="#637b69"/>
          <path d="M347 95V209M342 96H363M355 95V112" stroke="#435950" strokeWidth="3"/>
          <path d="M254 139V204M245 140H264" stroke="#435950" strokeWidth="3"/>
          <path d="M39 241C117 218 146 226 201 215" stroke="#f65f32" strokeWidth="3" strokeDasharray="5 7"/>
          <circle cx="39" cy="241" r="5" fill="#f65f32"/>
          <circle cx="201" cy="215" r="5" fill="#f65f32"/>
          <path d="M0 267H208M395 252H560" stroke="#c6c3b6"/>
        </svg>
        <span className="scene-label">{text('駅から候補地までの道のり', 'Route from station to property')}</span>
      </div>
      <div className="report-body">
        <div className="report-title"><span className="mono">01</span><h2>{text('周辺環境の確認レポート', 'Neighborhood visit report')}</h2></div>
        <p>{text('事前に伺った確認項目に沿って、現地で見たことをまとめます。', 'A summary of what we observe, based on your agreed checkpoints.')}</p>
        <ul>
          <li><span>{text('道のり', 'Route')}</span>{text('駅からの歩道・坂道', 'Sidewalks and hills from the station')}</li>
          <li><span>{text('周辺環境', 'Surroundings')}</span>{text('人通り・近隣のお店', 'Foot traffic and nearby shops')}</li>
          <li><span>{text('記録', 'Recording')}</span>{text('一人称動画（撮影許可時）', 'First-person video, when permitted')}</li>
        </ul>
      </div>
      <p className="report-disclaimer">{text('説明用のイラストです。実際の訪問事例・映像ではありません。', 'Illustration only. Not an actual visit or video.')}</p>
    </figure>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="service-label"><span/>{text('東京23区の現地訪問サービス', 'On-site visits in Tokyo’s 23 wards')}</p>
          <h1>{text('東京の現地確認を、', 'On-site checks in Tokyo,')}<br/><em>{text('動画とレポートで。', 'with video and a report.')}</em></h1>
          <p className="hero-lead">{text('引っ越し先の下見、店舗・物件の確認、閉店前の記録。行けないあなたの代わりに、運営者が現地を訪ねます。', 'Check a neighborhood, shop, or property, or document a place before it closes. When you can’t go, the owner of Remex makes the visit for you.')}</p>
          <p className="hero-note">{text('基本レポートと、撮影が許可される場合の未編集の一人称動画をお届けします。', 'You receive a basic report and, when filming is permitted, an unedited first-person video.')}</p>
          <div className="hero-actions"><LineButton/><a className="text-link" href="#service">{text('サービス内容を見る', 'Explore the service')} <span aria-hidden="true">↓</span></a></div>
          <p className="hero-consultation">{text('相談・見積もり無料 ／ 相談だけでは予約は確定しません', 'Free consultation and estimate · An inquiry is not a booking')}</p>
          <dl className="hero-facts">
            <div><dt>{text('対応エリア', 'Service area')}</dt><dd>{text('東京', 'Tokyo ')}<b>23</b>{text('区', ' wards')}</dd></div>
            <div><dt>{text('現地作業時間', 'On-site time')}</dt><dd><b>30</b>{text('分〜', ' min+')}</dd></div>
            <div><dt>{text('基本料金', 'Base price')}</dt><dd>¥<b>6,600</b>〜</dd></div>
          </dl>
        </div>
        <ReportPreview/>
      </div>
    </section>
  );
}
