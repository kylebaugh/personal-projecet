INSERT INTO user_items
(user_id, glossary_id)
VALUES
($1, $2);

SELECT * FROM user_items 
WHERE user_id = $1;