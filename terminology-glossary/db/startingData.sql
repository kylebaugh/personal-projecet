INSERT INTO users
(email, password, admin_key, is_admin)
VALUES
('kyle', 'asdf', 'lastJediSucked', true);

INSERT INTO unit
(name)
VALUES
('Unit 1'), ('Unit 2'),  ('Unit 3'), 
('Unit 4'), ('Unit 5'), ('Unit 6');

INSERT INTO glossary
(created_by, name, definition, unit_id)
VALUES
(1, 'Test 1', 'Test 1 Definition', 1),
(1, 'Test 2', 'Test 2 Definition', 2),
(1, 'Test 3', 'Test 3 Definition', 3);