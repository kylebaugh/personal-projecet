INSERT INTO users
(firstName, lastName, email, password, admin_key, is_admin, picture)
VALUES
($1, $2, $3, $4, $5, true, 'https://www.exoffender.org/wp-content/uploads/2016/09/empty-profile.png');