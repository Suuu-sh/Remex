export type PreApplicationDraft = {
  place: string;
  purpose: string;
  preferredDate1: string;
  preferredDate2: string;
  plan: string;
  deliverables: string[];
  details: string;
};

function formatDate(value: string): string {
  if (!value) return '未定';
  const [date, time] = value.split('T');
  return time ? `${date.replaceAll('-', '/')} ${time}` : date.replaceAll('-', '/');
}

function oneLine(value: string): string {
  return value.trim().replace(/[\r\n]+/g, ' ');
}

export function buildPreApplicationMessage(draft: PreApplicationDraft): string {
  const deliverables = draft.deliverables.length > 0 ? draft.deliverables.join('・') : '未定';
  const photoNote = draft.deliverables.includes('写真')
    ? ['写真納品は基本サービスに含まれず、ご希望時のみ個別相談です。機材の都合により現状は対応未確約で、機材が整い次第、正式提供を検討します。']
    : [];
  return [
    '【Remex 事前相談】',
    `場所: ${oneLine(draft.place)}`,
    `相談内容: ${draft.purpose}`,
    `希望日時（第1希望）: ${formatDate(draft.preferredDate1)}`,
    `希望日時（第2希望）: ${formatDate(draft.preferredDate2)}`,
    `希望プラン: ${draft.plan || '相談して決めたい'}`,
    `希望する記録: ${deliverables}`,
    ...photoNote,
    '現地で確認してほしいこと:',
    draft.details.trim(),
  ].join('\n');
}

export function createOfficialAccountDraftUrl(lineId: string, message: string): string {
  return `https://line.me/R/oaMessage/${encodeURIComponent(lineId)}/?${encodeURIComponent(message)}`;
}
