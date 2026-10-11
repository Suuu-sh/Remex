import type {Locale} from './i18n';

export type PreApplicationDraft = {
  place: string;
  purpose: string;
  plan: string;
  details: string;
};


const purposeLabels: Record<string, [string, string]> = {
  move: ['引っ越し候補地の確認', 'Check a potential neighborhood for a move'],
  property: ['店舗・物件の現地確認', 'Check a shop or property in person'],
  event: ['イベント・展示の代理体験', 'Attend an event or exhibition on my behalf'],
  product: ['商品・展示品の確認', 'Check a product or displayed item'],
  record: ['閉店前・取り壊し前の記録', 'Document a place before it closes or is demolished'],
  other: ['その他', 'Other'],
};
const planLabels: Record<string, [string, string]> = {
  '30': ['30分（現地作業 ¥6,600）', '30 minutes (on-site work ¥6,600)'],
  '60': ['60分（現地作業 ¥9,900）', '60 minutes (on-site work ¥9,900)'],
  '90': ['90分（現地作業 ¥13,200）', '90 minutes (on-site work ¥13,200)'],
};
function localizedChoice(value: string, labels: Record<string, [string, string]>, locale: Locale): string {
  const found = labels[value] ?? Object.values(labels).find(([ja, en]) => value === ja || value === en);
  return found ? found[locale === 'en' ? 1 : 0] : value;
}

function oneLine(value: string): string {
  return value.trim().replace(/[\r\n]+/g, ' ');
}

export function buildPreApplicationMessage(draft: PreApplicationDraft, locale: Locale = 'ja'): string {
  if (locale === 'en') {
    return [
      '[Remex Pre-application]',
      `Place: ${oneLine(draft.place)}`,
      `Purpose: ${localizedChoice(draft.purpose, purposeLabels, locale)}`,
      `Preferred plan: ${draft.plan ? localizedChoice(draft.plan, planLabels, locale) : 'I would like to discuss this'}`,
      'Details:',
      draft.details.trim(),
    ].join('\n');
  }
  return [
    '【Remex 事前相談】',
    `場所: ${oneLine(draft.place)}`,
    `相談内容: ${localizedChoice(draft.purpose, purposeLabels, locale)}`,
    `希望プラン: ${draft.plan ? localizedChoice(draft.plan, planLabels, locale) : '相談して決めたい'}`,
    '詳細な内容:',
    draft.details.trim(),
  ].join('\n');
}

export function createOfficialAccountDraftUrl(lineId: string, message: string): string {
  return `https://line.me/R/oaMessage/${encodeURIComponent(lineId)}/?${encodeURIComponent(message)}`;
}
