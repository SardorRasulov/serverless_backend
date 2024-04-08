aws dynamodb put-item \
--table-name stocks \
--item '{"id":{"S":"stock_1"}, "count":{"N":"12"}, "product_id":{"S":"7567ec4b-b10c-48c5-9345-fc73c48a80aa"}}' \
--profile admin \
--region ap-northeast-1

aws dynamodb put-item \
--table-name stocks \
--item '{"id":{"S":"stock_2"}, "count":{"N":"10"}, "product_id":{"S":"7567ec4b-b10c-48c5-9345-fc73c48a80a1"}}' \
--profile admin \
--region ap-northeast-1

aws dynamodb put-item \
--table-name stocks \
--item '{"id":{"S":"stock_3"}, "count":{"N":"28"}, "product_id":{"S":"7567ec4b-b10c-48c5-9345-fc73c48a80a3"}}' \
--profile admin \
--region ap-northeast-1

aws dynamodb put-item \
--table-name stocks \
--item '{"id":{"S":"stock_4"}, "count":{"N":"34"}, "product_id":{"S":"7567ec4b-b10c-48c5-9345-fc73348a80a1"}}' \
--profile admin \
--region ap-northeast-1

aws dynamodb put-item \
--table-name stocks \
--item '{"id":{"S":"stock_5"}, "count":{"N":"22"}, "product_id":{"S":"7567ec4b-b10c-48c5-9445-fc73c48a80a2"}}' \
--profile admin \
--region ap-northeast-1

aws dynamodb put-item \
--table-name stocks \
--item '{"id":{"S":"stock_6"}, "count":{"N":"18"}, "product_id":{"S":"7567ec4b-b10c-45c5-9345-fc73c48a80a1"}}' \
--profile admin \
--region ap-northeast-1