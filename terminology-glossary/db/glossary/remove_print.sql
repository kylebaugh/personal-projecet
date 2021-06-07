DELETE FROM user_items
WHERE user_id = $1 AND glossary_id = $2;

SELECT * FROM user_items
WHERE user_id = $1;