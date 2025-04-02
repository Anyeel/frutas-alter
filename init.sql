CREATE TABLE IF NOT EXISTS fruits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fruit_name TEXT NOT NULL
);

INSERT INTO fruits (fruit_name) VALUES ("manzana");
INSERT INTO fruits (fruit_name) VALUES ("pera");
INSERT INTO fruits (fruit_name) VALUES ("uva");