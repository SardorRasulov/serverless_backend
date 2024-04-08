import createProduct from '../src/services/createProduct.js'

export const createProductV1 = async event => {
    const data = event.body
    let res
    try {
        console.log('Incoming event', JSON.stringify(event))
        const response = await createProduct(data)
        if (response.$metadata.httpStatusCode === 200) {
            res = {
                statusCode: 200,
                body: JSON.stringify(data)
            }
            console.log('Created product', JSON.stringify(event.body))
        }
    } catch(err) {
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
