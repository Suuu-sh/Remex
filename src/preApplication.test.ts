import assert from 'node:assert/strict';
import test from 'node:test';
import {buildPreApplicationMessage, createOfficialAccountDraftUrl} from './preApplication';

test('pre-application message includes the selected visit details without collecting contact info', () => {
  const message = buildPreApplicationMessage({
    place: '  渋谷駅\n南口 ',
    purpose: '引っ越し候補地の確認',
    preferredDate1: '2026-10-12T14:30',
    preferredDate2: '',
    plan: '60分（現地作業 ¥9,900）',
    deliverables: ['写真', '一人称動画'],
    details: '駅から物件までの夜道を見てほしい。',
  });

  assert.match(message, /場所: 渋谷駅 南口/);
  assert.match(message, /希望日時（第1希望）: 2026\/10\/12 14:30/);
  assert.match(message, /希望日時（第2希望）: 未定/);
  assert.match(message, /希望する記録: 写真・一人称動画/);
  assert.doesNotMatch(message, /メールアドレス|電話番号/);
});

test('official account draft URL percent-encodes both the account ID and message', () => {
  const url = createOfficialAccountDraftUrl('@034laqhf', '【Remex 事前相談】\n場所: 渋谷');

  assert.match(url, /^https:\/\/line\.me\/R\/oaMessage\/%40034laqhf\//);
  assert.ok(url.includes(encodeURIComponent('【Remex 事前相談】\n場所: 渋谷')));
});
