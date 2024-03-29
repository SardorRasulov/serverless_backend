import products from '../mocks/products.js'

export const getProductsListV2 = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
  };
};
