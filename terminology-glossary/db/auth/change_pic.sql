UPDATE users
SET picture = $2
WHERE user_id = $1
RETURNING *;