const { Database } = require("bun:sqlite");
const { mkdirSync } = require("fs");

// Crée le dossier data/ s'il n'existe pas encore (premier démarrage)
mkdirSync("./data", { recursive: true });

// Ouvre la base (la crée si absente)
const db = new Database("./data/clipboard.db");

// Crée la table une seule fois
db.run(`
  CREATE TABLE IF NOT EXISTS clipboard (
    id         INTEGER  PRIMARY KEY,
    content    TEXT     NOT NULL DEFAULT '',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insère la ligne unique si elle n'existe pas encore
db.run(`INSERT OR IGNORE INTO clipboard (id, content) VALUES (1, '')`);

module.exports = db;
