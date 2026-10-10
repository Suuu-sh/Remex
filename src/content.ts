export type IconName = 'home' | 'cup' | 'ticket' | 'tag' | 'frame' | 'eye';

export type UseCase = {
  n: string;
  title: string;
  text: string;
  label: string;
  icon: IconName;
};

export const audiences = [
  {en: 'NO TIME', title: '行く時間が、とれない人へ。', text: '仕事や家のことで、平日に足を運ぶ余裕がない。そんな日でも、気になる場所は待ってくれません。'},
  {en: 'TOO FAR', title: '遠くて、行けない人へ。', text: '地方や海外に住んでいて、東京まで来るのは簡単じゃない。その距離を、代わりに歩きます。'},
];

export const uses: UseCase[] = [
  {n: '01', title: '街の空気を、確かめる。', text: '引っ越し先の駅から家まで。道の明るさ、坂道、周辺の雰囲気をあなたの目線で。', label: 'NEIGHBORHOOD', icon: 'home'},
  {n: '02', title: 'お店を、のぞいてみる。', text: '気になるカフェやショップ。混み具合、入口、店内の雰囲気をルールの範囲で確認。', label: 'LOCAL SHOPS', icon: 'cup'},
  {n: '03', title: 'イベントを、体験する。', text: '行けないイベントに代理で参加。本人限定の入場や代理参加禁止の催しは対象外です。', label: 'EVENT EXPERIENCE', icon: 'ticket'},
  {n: '04', title: '商品を、現地で確かめる。', text: '写真だけではわからない色やサイズ感、展示状況を確認。購入や契約の代行は含みません。', label: 'PRODUCT CHECK', icon: 'tag'},
  {n: '05', title: '展示を、見に行く。', text: '気になる展示会や展覧会を訪問。撮影可能な範囲で、会場の様子を記録します。', label: 'EXHIBITION VISIT', icon: 'frame'},
  {n: '06', title: 'お客さまの目線で、調べる。', text: '競合店舗の接客や店舗体験を、一般客として確認。無断録音・秘密情報の取得はしません。', label: 'CUSTOMER EXPERIENCE', icon: 'eye'},
];

export const heroPlaces = [
  '駅から家までの夜道',
  '気になるカフェの混み具合',
  'イベント会場の雰囲気',
  '商品の色とサイズ感',
  '展覧会の見どころ',
  '閉店する店の最後の営業日',
];

/** LINE公式アカウントの友だち追加URL。 */
export const LINE_URL: string = 'https://lin.ee/ZvrRtXZ';

/** LINE内で事前相談フォームを開くLIFF URL。 */
export const LINE_APPLICATION_URL: string = 'https://liff.line.me/2011950025-CXAIFaev';

export const steps = [
  {n: '01', title: 'LINEで、希望を伝える。', text: '事前相談フォームに場所と詳細な内容を入力します。開催日時が決まっている場合は詳細な内容に記入してください。内容を確認して送信すると、LINE公式アカウントとのトークに下書きされます。', tag: 'LINE'},
  {n: '02', title: '内容と料金を、確認。', text: '訪問の可否、範囲、費用をご案内します。見積もりは発行日から7日間有効で、支払期限も記載します。銀行振込の前払いは原則訪問前日まで。前日・当日の予約は訪問開始前に着金確認が必要です。いずれも入金確認後に予約が確定します。', tag: 'ESTIMATE'},
  {n: '03', title: 'あなたの代わりに、現地へ。', text: '確認したいポイントに沿って訪問し、基本レポートと、撮影が許可される場合の未編集の一人称動画をLINEでお届けします。', tag: 'VISIT'},
];

export type Delivery = {id: 'photo' | 'video' | 'edit'; label: string; en: string; text: string; badge?: string};

export const deliveries: Delivery[] = [
  {id: 'video', label: '一人称動画', en: 'POV VIDEO', text: 'GoProで、歩く目線そのままを記録。駅からの道のりや距離感を、自分が歩いたように確かめられます。'},
  {id: 'photo', label: '写真', en: 'PHOTO', badge: '準備中', text: '写真での記録・納品を準備中です。'},
  {id: 'edit', label: '動画編集', en: 'EDITING', badge: '準備中', text: '撮った動画を、見やすい長さに編集してお渡しするオプションを準備中です。'},
];

export const wards = [
  '千代田', '中央', '港', '新宿', '文京', '台東', '墨田', '江東', '品川', '目黒', '大田', '世田谷',
  '渋谷', '中野', '杉並', '豊島', '北', '荒川', '板橋', '練馬', '足立', '葛飾', '江戸川',
];

export const plans = [
  {mins: 30, price: 6600, desc: 'ちょっとした確認に', example: '駅前の雰囲気や、ひとつのお店の入口・混み具合', checklist: 3},
  {mins: 60, price: 9900, desc: 'じっくり下見したいときに', example: '駅からひとつの候補地までの道、周辺の確認ポイントなど', checklist: 5},
  {mins: 90, price: 13200, desc: '複数のポイントを見たいときに', example: '一か所の広い展示会をひと回り、候補地の確認点を複数見るなど', checklist: 8},
];

export const principles = [
  {n: '01', title: '公開された場所で、ルールを守って。', text: '無断撮影、立入禁止区域への侵入、施設ルールに反する行為は行いません。撮影許可が必要な場合は事前確認します。'},
  {n: '02', title: '人のプライバシーを、侵さない。', text: '特定の個人の追跡・監視、ストーカー行為、個人情報の調査、無断での人物撮影はお断りします。'},
  {n: '03', title: '危険なこと、偽ることはしない。', text: '違法・危険行為、なりすまし、本人限定の手続きや入場、代理での契約は対応できません。安全上の理由で訪問を中止する場合もあります。'},
];

export const refusals = [
  '特定の個人の追跡・監視', '無断での人物撮影', '個人情報の調査', '立入禁止区域への侵入',
  'なりすまし', '本人限定の手続き・入場', '代理での購入・契約', '無断録音・秘密情報の取得', '違法・危険な行為',
];

export const faqs = [
  {q: 'どこまで対応していますか？', a: '現在は東京23区内を対象としています。場所や訪問内容によって対応できない場合がありますので、まずはご相談ください。'},
  {q: '日時が決まっているイベントにも対応できますか？', a: '開催日時などの条件は事前相談フォームの「詳細な内容」に記入してください。運営者の予定や施設の営業時間などにより、その日時に対応できない場合があります。LINEで相談した時点では予約は確定しません。'},
  {q: '基本料金には何が含まれますか？', a: '東京23区内の1か所での準備・基本レポート、プランごとの現地作業時間と確認項目が含まれます。撮影が許可される場合は、未編集の一人称動画を1本お届けします。往復の公共交通機関運賃は別途です。', link: {href: '/pricing', label: '料金の内訳を見る'}},
  {q: '写真の納品も依頼できますか？', a: '写真での記録・納品は準備中です。'},
  {q: '閉店前や取り壊し前の記録も頼めますか？', a: 'ご相談いただけます。お店は一般の客として営業時間内に、店のルールに従って記録します。建物の内部は、所有者・管理者の許可が得られた場合のみ立ち入ります。許可が得られない場合は、公開された場所からの記録をご提案します。'},
  {q: '支払い・キャンセルはどうなりますか？', a: '相談・見積もりは無料です。見積もりは発行日から7日間有効で、支払期限を記載します。銀行振込の前払いは原則、訪問前日まで（振込手数料はお客様負担）。訪問前日または当日の予約は、訪問開始前に着金確認が必要です。入金確認後に予約が確定します。作業開始前はサービス料金なし（事前了承済みの返金不可の実費のみ）、開始後は完了した訪問作業時間分のみで、未実施分は請求しません。', link: {href: '/#terms', label: '利用・キャンセル条件を見る'}},
  {q: '撮影したものは公開されますか？', a: 'お届けした記録を、許可なく事例紹介に使用することはありません。第三者の映り込みにも配慮し、公開・撮影が禁止されたものは記録しません。'},
];

export const useCases = [
  {n: '01', en: 'MOVING', art: 'moving' as const, title: '遠方からの、引っ越し候補地チェック。', text: '遠くに住んでいて下見に来られない方の代わりに、駅から候補の家までを歩いて記録します。', note: '道の明るさ、坂道、周辺のお店など、気になる点を事前に伺います。'},
  {n: '02', en: 'FOR BUSINESS', art: 'business' as const, title: '法人向けの、店舗・物件の現地確認。', text: '出店候補地の人通りや、物件まわりの様子を、一般客と同じ立場で確認して記録します。', note: '基本料金は個人と共通です。追加の確認範囲・報告形式などを含む個別見積もりは、内容により¥15,000〜¥30,000程度となる場合があります。'},
  {n: '03', en: 'LAST DAY', art: 'shop' as const, title: '閉店前の、最後の記録。', text: '閉店が決まったお店の最終営業日を、ひとりの客として過ごして記録します。取り壊し前の建物や、販売終了前の商品のご相談も。', note: 'お店のルールと撮影可否、建物は所有者・管理者の許可に従います。'},
];

export const useCaseRules = [
  '日付が決まっている依頼は、早めのご相談をおすすめします',
  '店舗や建物の内部は、許可がある範囲でのみ撮影します',
  '入場料・利用料などの実費は、事前に見積もりへ含めてご案内します',
  '記録はご依頼者のためのもの。許可なく公開・事例紹介に使いません',
];

/** English copy for the same service and limits; amounts and availability stay identical. */
export function getLocalizedContent(locale: 'ja' | 'en') {
  if (locale === 'ja') return {audiences, uses, heroPlaces, steps, deliveries, wards, plans, principles, refusals, faqs, useCases, useCaseRules};
  return {
    audiences: [
      {en: 'NO TIME', title: 'For when you can’t make the trip.', text: 'Work and daily life leave no room for a weekday visit. But the place you want to see won’t wait.'},
      {en: 'TOO FAR', title: 'For when you live far away.', text: 'Getting to Tokyo from elsewhere in Japan or abroad isn’t easy. We’ll make the visit for you.'},
    ],
    uses: [
      {n: '01', title: 'Get a feel for the neighborhood.', text: 'From the station to a potential home: check the lighting, slopes, and surroundings through your eyes.', label: 'NEIGHBORHOOD', icon: 'home' as IconName},
      {n: '02', title: 'Take a look inside a shop.', text: 'Check a café or store’s crowd, entrance, and atmosphere, while following its rules.', label: 'LOCAL SHOPS', icon: 'cup' as IconName},
      {n: '03', title: 'Experience an event.', text: 'We can attend events you can’t make. Personal admission and events that prohibit proxies are excluded.', label: 'EVENT EXPERIENCE', icon: 'ticket' as IconName},
      {n: '04', title: 'Check a product in person.', text: 'See its color, scale, or display beyond what photos show. Purchases and contracts are not included.', label: 'PRODUCT CHECK', icon: 'tag' as IconName},
      {n: '05', title: 'Visit an exhibition.', text: 'We’ll visit an exhibition or show and document the venue where photography is permitted.', label: 'EXHIBITION VISIT', icon: 'frame' as IconName},
      {n: '06', title: 'See it as a customer would.', text: 'Experience a store as an ordinary customer. No covert recording or access to confidential information.', label: 'CUSTOMER EXPERIENCE', icon: 'eye' as IconName},
    ],
    heroPlaces: ['a walk from the station at night', 'how busy a café is', 'the feel of an event venue', 'a product’s color and scale', 'what an exhibition is like', 'a shop before it closes'],
    steps: [
      {n: '01', title: 'Tell us what you need on LINE.', text: 'Enter the location and details in the pre-visit form. If your request is time-sensitive, include the date and time. The form opens a draft in LINE; review it and press Send in the chat to submit your request.', tag: 'LINE'},
      {n: '02', title: 'Review the scope and estimate.', text: 'We’ll confirm feasibility, scope, and cost. Estimates are valid for 7 days and state the payment deadline. Bank transfer is generally due by the day before the visit; same-day and next-day bookings require confirmed payment before the visit starts. Your booking is confirmed after payment clears.', tag: 'ESTIMATE'},
      {n: '03', title: 'We’ll make the visit for you.', text: 'We visit with your checklist and send a basic report plus one unedited first-person video when filming is permitted, via LINE.', tag: 'VISIT'},
    ],
    deliveries: [
      {id: 'video' as const, label: 'First-person video', en: 'POV VIDEO', text: 'An unedited GoPro recording from the walker’s point of view, so you can get a feel for the route and distance.'},
      {id: 'photo' as const, label: 'Photos', en: 'PHOTO', badge: 'Coming soon', text: 'Photo capture and delivery are coming soon.'},
      {id: 'edit' as const, label: 'Video editing', en: 'EDITING', badge: 'Coming soon', text: 'Edited, easier-to-watch versions of the footage are coming soon.'},
    ],
    wards: ['Chiyoda', 'Chuo', 'Minato', 'Shinjuku', 'Bunkyo', 'Taito', 'Sumida', 'Koto', 'Shinagawa', 'Meguro', 'Ota', 'Setagaya', 'Shibuya', 'Nakano', 'Suginami', 'Toshima', 'Kita', 'Arakawa', 'Itabashi', 'Nerima', 'Adachi', 'Katsushika', 'Edogawa'],
    plans: [
      {mins: 30, price: 6600, desc: 'For a quick check', example: 'A station area or one shop entrance and its crowd', checklist: 3},
      {mins: 60, price: 9900, desc: 'For a closer look', example: 'The route from a station to one property and nearby points', checklist: 5},
      {mins: 90, price: 13200, desc: 'For several checkpoints', example: 'A larger exhibition or multiple points around one property', checklist: 8},
    ],
    principles: [
      {n: '01', title: 'We follow the rules in public spaces.', text: 'No unauthorized filming, restricted-area entry, or actions against venue rules. We confirm permission in advance when needed.'},
      {n: '02', title: 'We respect people’s privacy.', text: 'We do not track or surveil individuals, investigate personal information, or film people without consent.'},
      {n: '03', title: 'No danger, deception, or impersonation.', text: 'We cannot undertake illegal or dangerous activity, impersonation, personal procedures or admission, or contracts on your behalf. A visit may be stopped for safety.'},
    ],
    refusals: ['Tracking or surveilling a person', 'Filming people without consent', 'Investigating personal information', 'Entering restricted areas', 'Impersonation', 'Personal-only procedures or admission', 'Purchases or contracts on your behalf', 'Covert recording or obtaining confidential information', 'Illegal or dangerous activity'],
    faqs: [
      {q: 'Where do you operate?', a: 'We currently serve Tokyo’s 23 wards only. Availability depends on the location and request, so please ask first.'},
      {q: 'Can you attend an event at a specific time?', a: 'Include the date and time in the pre-visit form. Availability depends on our schedule and venue hours. A LINE inquiry does not confirm a booking.'},
      {q: 'What is included in the base price?', a: 'Preparation, a basic report, on-site time, and the plan’s checklist at one location in Tokyo’s 23 wards. When filming is permitted, we also deliver one unedited first-person video. Round-trip public transit is charged separately.', link: {href: '/pricing', label: 'See the full pricing breakdown'}},
      {q: 'Can I request photos?', a: 'Photo capture and delivery are coming soon.'},
      {q: 'Can you document a shop before it closes or a building before demolition?', a: 'You’re welcome to ask. Shops are visited during business hours as an ordinary customer, following their rules. Entry into a building requires the owner’s or manager’s permission. If permission is unavailable, we can suggest documenting it from a public place.'},
      {q: 'How do payment and cancellations work?', a: 'Consultations and estimates are free. Estimates are valid for 7 days and state the payment deadline. Bank transfer is generally due by the day before the visit; transfer fees are yours. Next-day or same-day bookings require payment to clear before work starts. Booking is confirmed after payment. Before work starts, no service fee is charged (except non-refundable expenses approved in advance). After work starts, only completed visit time is charged; unperformed time is not.', link: {href: '/#terms', label: 'Read service and cancellation terms'}},
      {q: 'Will you publish what you record?', a: 'We never use your delivery as a case study without permission. We take care to avoid capturing bystanders and do not record where filming or publication is prohibited.'},
    ],
    useCases: [
      {n: '01', en: 'MOVING', art: 'moving' as const, title: 'Check a potential home from afar.', text: 'We walk and record the route from the station to a home you’re considering, when you can’t visit in person.', note: 'Tell us what matters—street lighting, hills, nearby shops, and more.'},
      {n: '02', en: 'FOR BUSINESS', art: 'business' as const, title: 'Check a shop or property on site.', text: 'We observe foot traffic or the surroundings of a potential location as an ordinary visitor.', note: 'The base price is the same for individuals and businesses. A custom estimate for extra scope or reporting may be around ¥15,000–¥30,000, depending on the request.'},
      {n: '03', en: 'LAST DAY', art: 'shop' as const, title: 'Keep a record before a shop closes.', text: 'Visit a shop on its final day as an ordinary customer. You can also ask about a building before demolition or a product before it is discontinued.', note: 'We follow shop rules and filming permissions; building access requires the owner’s or manager’s approval.'},
    ],
    useCaseRules: [
      'Ask early if your request has a fixed date',
      'We film inside shops and buildings only with permission',
      'Admission and other out-of-pocket costs are included in the estimate in advance',
      'Your records are for you; we never publish them as a case study without permission',
    ],
  };
}
