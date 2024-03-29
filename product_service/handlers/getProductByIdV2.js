import products from '../mocks/products.js'

export const getProductByIdV2 = async (event) => {
  const productId = event.pathParameters.productId
  const productById = products.find(product => product.id === productId)

  if (!productById) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Product not found' })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(productById),
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
  }
}
