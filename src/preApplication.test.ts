import assert from 'node:assert/strict';
import test from 'node:test';
import {buildPreApplicationMessage, createOfficialAccountDraftUrl} from './preApplication';

test('pre-application message includes the selected visit details without collecting contact info', () => {
  const message = buildPreApplicationMessage({
    place: '  渋谷駅\n南口 ',
    purpose: '引っ越し候補地の確認',
    plan: '60分（現地作業 ¥9,900）',
    details: '駅から物件までの夜道を見てほしい。開催日時: 2026年10月12日 14:30',
  });

  assert.match(message, /場所: 渋谷駅 南口/);
  assert.doesNotMatch(message, /希望する記録/);
  assert.match(message, /詳細な内容:\n駅から物件までの夜道を見てほしい。開催日時: 2026年10月12日 14:30/);
  assert.doesNotMatch(message, /希望日時|第1希望|第2希望/);
  assert.doesNotMatch(message, /写真|個別相談/);
  assert.doesNotMatch(message, /メールアドレス|電話番号/);
});

test('official account draft URL percent-encodes both the account ID and message', () => {
  const url = createOfficialAccountDraftUrl('@034laqhf', '【Remex 事前相談】\n場所: 渋谷');

  assert.match(url, /^https:\/\/line\.me\/R\/oaMessage\/%40034laqhf\//);
  assert.ok(url.includes(encodeURIComponent('【Remex 事前相談】\n場所: 渋谷')));
});
