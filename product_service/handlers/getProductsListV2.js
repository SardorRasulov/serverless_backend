import products from './../mocks/products.js'

export const getProductsListV2 = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
