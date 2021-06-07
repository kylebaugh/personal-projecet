SELECT * FROM user_items
JOIN glossary ON user_items.glossary_id = glossary.glossary_id
WHERE user_id = $1;