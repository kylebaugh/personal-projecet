DROP TABLE IF EXISTS glossary;
DROP TABLE IF EXISTS unit;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(10000),
    admin_key VARCHAR(10000),
    is_admin BOOLEAN,
    picture TEXT
);

CREATE TABLE unit(
    unit_id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE glossary(
    glossary_id SERIAL PRIMARY KEY,
    created_by INT REFERENCES users(user_id),
    name VARCHAR(100),
    definition TEXT,
    unit_id INT REFERENCES unit(unit_id)
);

CREATE TABLE glossary_unit(
    glossary_unit_id SERIAL PRIMARY KEY,
    glossary_id INT REFERENCES glossary(glossary_id),
    unit_id INT REFERENCES unit(unit_id)
);