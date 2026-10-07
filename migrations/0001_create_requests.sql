CREATE TABLE IF NOT EXISTS requests (
  id TEXT PRIMARY KEY NOT NULL,
  created_at TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('request', 'inquiry')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  place TEXT NOT NULL DEFAULT '',
  preferred TEXT NOT NULL DEFAULT '',
  activities TEXT NOT NULL DEFAULT '',
  checkpoints TEXT NOT NULL DEFAULT '',
  formats_json TEXT NOT NULL DEFAULT '[]',
  wishes TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS requests_created_at_idx ON requests (created_at);
