CREATE OR REPLACE PROCEDURE create_purchases_relations(start int)
    LANGUAGE plpgsql
AS $$
DECLARE
    nb_product int;
    new_relation int;
    loop_user record;
BEGIN
    nb_product := (SELECT COUNT(1) FROM Products);
    for loop_user in (Select id from Users OFFSET start)
        loop
            for loop_relation in 1..floor(random() * (5 + 1))
                loop
                    new_relation := (SELECT id FROM Products OFFSET floor(random() * nb_product) LIMIT 1);
                    insert into purchases (user_id, product_id) values (loop_user.id, new_relation) ON  CONFLICT DO NOTHING;
                end loop;
        end loop;
end;
$$;
