INSERT INTO users
(email, password, admin_key, is_admin)
VALUES
($1, $2, $3, true);