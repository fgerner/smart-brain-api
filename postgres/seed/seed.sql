BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) values ('seed', 'seed@mail.com', 2 , '2001-01-01');
INSERT INTO login (hash, email) values ('$2a$10$cOPg0AaJRS.XkTyjXx.Xeu0jWAMX2cXGCxHnCIMU9HCJLZ6H8y/cG', 'seed@mail.com');

COMMIT;