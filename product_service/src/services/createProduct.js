import docClient from './dbConnection.js'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4  } from 'uuid'

const createProduct = data => {
    const createProductCommand = new PutCommand({
        TableName: process.env.PRODUCTS_TABLE_NAME,
        Item: {
            id: uuidv4(),
            title: data.title,
            description: data.description,
            price: data.price
        }
    })
    return docClient.send(createProductCommand)
}

export default createProduct
