import products from '../mocks/products.js'

export const getProductByIdV2 = async (event) => {
  const productId = event.pathParameters.productId
  const productById = products.find(product => product.id === productId)

  return {
    statusCode: 200,
    body: JSON.stringify(productById)
  }
}
