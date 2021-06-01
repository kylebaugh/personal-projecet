INSERT INTO users
(firstName, lastName, email, password, admin_key, is_admin)
VALUES
($1, $2, $3, $4, $5, false);