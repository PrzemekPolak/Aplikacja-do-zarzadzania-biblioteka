const sqlite3 = require("better-sqlite3");
const db = new sqlite3('resources/db.sqlite')

db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');
db.prepare(
  `CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userName TEXT NOT NULL,
        surname TEXT NOT NULL,
        phone TEXT,
        city TEXT,
        street TEXT,
        streetNumber TEXT
        )`
).run();

db.prepare(
  `CREATE TABLE book (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT,
        authorSurname TEXT
        )`
).run();

db.prepare(
  `CREATE TABLE borrowed (
        id TEXT PRIMARY KEY,
        userId INTEGER NOT NULL,
        bookId INTEGER NOT NULL,
        borrowedDate INTEGER NOT NULL,
        returnedDate INTEGER,
        rating INTEGER
        )`
).run();

db.prepare(
  `CREATE TABLE recommendation (
    user_identity INTEGER PRIMARY KEY,
    excluded TEXT NOT NULL
  )`
).run();
