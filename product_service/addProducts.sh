# aws dynamodb query \
# --table-name Product \
# --key-condition-expression "id = :id" \
# --expression-attribute-values '{":id":{"S":"7567ec4b-b10c-48c5-9345-fc73c48a80aa"}}' \
# --profile admin \
# --region ap-northeast-1

aws dynamodb put-item \
--table-name Product \
--item '{"id": {"S":"7567ec4b-b10c-48c5-9345-fc73c48a80aa"}, "title":{"S":"ProductOne"}, "description":{"S":"Short Product Description1"}, "price":{"N":"24"}}' \
--profile admin \
--region ap-northeast-1

aws dynamodb put-item \
--table-name Product \
--item '{"id": {"S":"7567ec4b-b10c-48c5-9345-fc73c48a80a1"}, "title":{"S":"ProductTitle"}, "description":{"S":"Short Product Description7"}, "price":{"N":"15"}}' \
--profile admin \
--region ap-northeast-1

aws dynamodb put-item \
--table-name Product \
--item '{"id": {"S":"7567ec4b-b10c-48c5-9345-fc73c48a80a3"}, "title":{"S":"Product"}, "description":{"S":"SShort Product Description2"}, "price":{"N":"23"}}' \
--profile admin \
--region ap-northeast-1

aws dynamodb put-item \
--table-name Product \
--item '{"id": {"S":"7567ec4b-b10c-48c5-9345-fc73348a80a1"}, "title":{"S":"ProductTest"}, "description":{"S":"Short Product Description4"}, "price":{"N":"15"}}' \
--profile admin \
--region ap-northeast-1

aws dynamodb put-item \
--table-name Product \
--item '{"id": {"S":"7567ec4b-b10c-48c5-9445-fc73c48a80a2"}, "title":{"S":"Product2"}, "description":{"S":"Short Product Descriptio1"}, "price":{"N":"23"}}' \
--profile admin \
--region ap-northeast-1

aws dynamodb put-item \
--table-name Product \
--item '{"id": {"S":"7567ec4b-b10c-45c5-9345-fc73c48a80a1"}, "title":{"S":"ProductName"}, "description":{"S":"Short Product Description7"}, "price":{"N":"15"}}' \
--profile admin \
--region ap-northeast-1