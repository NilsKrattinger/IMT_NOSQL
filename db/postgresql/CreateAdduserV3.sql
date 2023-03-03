CREATE OR REPLACE PROCEDURE add_followers(start_index int,number_to_insert int)
    LANGUAGE plpgsql
AS $add_followers$
DECLARE
    nb_user int;
    init_count_user int;
    counter int = 1;
    nb_follower int = 0;
    nb_purchases integer =1;
    nb_products integer =1;
BEGIN
    init_count_user := start_index;
    counter := init_count_user +1 ;
    number_to_insert := init_count_user + number_to_insert;
    while counter <= number_to_insert loop
            insert into users (id,name) values (counter,'User' || counter);
            counter := counter + 1;
        end loop;

    counter:= init_count_user+1;

    nb_user:= (select count(1) from users);

    while counter <= number_to_insert loop
            nb_follower:= 0;
            while nb_follower <= random() * 20 loop
                    insert into followers (user_id, follower_id) values (counter, GREATEST(random() * (nb_user),1))
                    ON CONFLICT DO NOTHING;
                    nb_follower := nb_follower+1;
                end loop;
            counter := counter + 1;
        end loop;


    -- insert purchases
    counter:= init_count_user+1;

    nb_products:= (select count(1) from products);


    while counter <= number_to_insert loop
            nb_purchases:= 0;
            while nb_purchases <= random() * 5 loop
                    insert into purchases (user_id, product_id) values (counter, GREATEST(random() * (nb_products),1))
                    ON CONFLICT DO NOTHING;
                    nb_purchases := nb_purchases+1;
                end loop;
            counter := counter + 1;
        end loop;


end; $add_followers$
