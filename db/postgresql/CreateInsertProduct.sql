CREATE OR REPLACE PROCEDURE insert_products(nb_products int)
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
$$;
