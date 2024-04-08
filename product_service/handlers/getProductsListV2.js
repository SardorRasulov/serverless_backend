import queryProducts from '../src/services/queryProducts.js'
import queryStocks from '../src/services/queryStocks.js'

export const getProductsListV2 = async event => {
  let res
  try {
    console.log('Incoming event', JSON.stringify(event))
    const productsResponse = await queryProducts()
    const stocksResponse = await queryStocks()
    const products = productsResponse?.Items?.map(product => ({
      ...product,
      ...(stocksResponse?.Items?.find(stock => stock.product_id === product.id))
    }))
    console.log(`Received products: ${ JSON.stringify( products ) }`)
    res = {
      statusCode: 200,
      body: JSON.stringify(products)
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
  };
};
