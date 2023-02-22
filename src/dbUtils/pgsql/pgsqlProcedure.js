async function createProcedure() {
    const start = Date.now();
    result = [];
    result.push(await pgPool.query(`CREATE OR REPLACE PROCEDURE create_followers_relations(start int)
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
                                    $$;`));
    result.push(await pgPool.query(`CREATE OR REPLACE PROCEDURE create_purchases_relations(start int)
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
                                      $$;`));
    result.push(await pgPool.query(`CREATE OR REPLACE PROCEDURE insert_users(nb_users int)
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
                                        $$;`));
    result.push(await pgPool.query(`CREATE OR REPLACE PROCEDURE insert_products(nb_products int)
                                    LANGUAGE plpgsql
                                    AS $$
                                    DECLARE 
                                    init_count_product int;
                                    
                                    BEGIN
                                      init_count_product := (SELECT COUNT(1) FROM Products);
                                      WITH new_products AS (
                                          SELECT i AS ID, CONCAT('Product', i) AS Name, 1.00 as Price
                                          FROM generate_series(init_count_product+1, init_count_product+nb_products) AS i
                                        )
                                        INSERT INTO products (id, name, price)
                                        SELECT ID, Name, Price FROM new_products
                                        ON CONFLICT DO NOTHING;
                                    end;
                                    $$;`));
    const duration = Date.now() - start;
    let returnValue = {}
    returnValue["Duration"] = duration;
    returnValue["Data"] = result;
    return returnValue;
}


async function insertUsers(nbUsersToInsert) {
  const start = Date.now();
  const result = await pgPool.query(`CALL insert_users($1)`, [nbUsersToInsert]);
  const duration = Date.now() - start;
  let returnValue = {}
  returnValue["Duration"] = duration;
  returnValue["Data"] = result;
  return returnValue;
}

async function insertProducts(nbProductsToInsert) {
  const start = Date.now();
  const result = await pgPool.query(`CALL insert_products($1)`, [nbProductsToInsert]);
  const duration = Date.now() - start;
  let returnValue = {}
  returnValue["Duration"] = duration;
  returnValue["Data"] = result;
  return returnValue;
}