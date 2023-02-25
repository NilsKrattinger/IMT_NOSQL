CREATE OR REPLACE PROCEDURE insert_users(nb_users int)
    LANGUAGE plpgsql
AS $$
DECLARE
    init_count_user int;
BEGIN
    init_count_user := (SELECT COUNT(1) FROM Users);
    WITH new_users AS (
        SELECT i AS ID, CONCAT('User', i) AS Name
        FROM generate_series(init_count_user+1, init_count_user+nb_users) AS i
    )
    INSERT INTO users (id, name)
    SELECT ID, Name FROM new_users
    ON CONFLICT DO NOTHING;
    CALL create_followers_relations(init_count_user);
    CALL create_purchases_relations(init_count_user);
end;
$$;
