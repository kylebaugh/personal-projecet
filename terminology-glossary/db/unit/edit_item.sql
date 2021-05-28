UPDATE glossary
SET name = $2, definition = $3, unit_id = $4
WHERE glossary_id = $1;