CREATE OR REPLACE PROCEDURE create_followers_relations(start int)
    LANGUAGE plpgsql
AS $$
DECLARE
    nb_user int;
    new_relation int;
    loop_user record;
BEGIN
    nb_user:= (SELECT COUNT(1) FROM Users);
    for loop_user in (Select id from Users OFFSET start)
        loop
            for loop_relation in 1..floor(random() * (20 + 1))
                loop
                    new_relation := (SELECT id FROM Users OFFSET floor(random() * nb_user) LIMIT 1);
                    if new_relation<>loop_user.id
                    then
                        insert into followers (user_id, follower_id) values (loop_user.id,new_relation) ON  CONFLICT DO NOTHING;
                    end if;
                end loop;
        end loop;
end;
$$;
