import getProductById from '../src/services/queryProductById.js'

export const getProductByIdV2 = async event => {
  const productId = event.pathParameters.productId
  let res
  try {
    console.log('Incoming event', JSON.stringify(event))
    const response = await getProductById(productId)
    const product = response?.Items?.[0]
    if (product) {
      res = {
        statusCode: 200,
        body: JSON.stringify(product)
      }
      console.log(`"Received product with id: ${ productId }: ${ JSON.stringify( product ) }`)
    } else {
      res = {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" })
      }
    }
  } catch (err) {
    res = {
      statusCode: 500,
      body: JSON.stringify({ message: err.message })
    }
  }

  return {
    ...res,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
  }
}
