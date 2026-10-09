export type PreApplicationDraft = {
  place: string;
  purpose: string;
  plan: string;
  details: string;
};

function oneLine(value: string): string {
  return value.trim().replace(/[\r\n]+/g, ' ');
}

export function buildPreApplicationMessage(draft: PreApplicationDraft): string {
  return [
    '【Remex 事前相談】',
    `場所: ${oneLine(draft.place)}`,
    `相談内容: ${draft.purpose}`,
    `希望プラン: ${draft.plan || '相談して決めたい'}`,
    '詳細な内容:',
    draft.details.trim(),
  ].join('\n');
}

export function createOfficialAccountDraftUrl(lineId: string, message: string): string {
  return `https://line.me/R/oaMessage/${encodeURIComponent(lineId)}/?${encodeURIComponent(message)}`;
}
