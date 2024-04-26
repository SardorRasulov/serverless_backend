import docClient from './dbConnection.js'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'

export const queryProductById = productId => {
    const queryProductByIdCommand = new QueryCommand({
        TableName: process.env.PRODUCTS_TABLE_NAME,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": productId
        }
    })
    return docClient.send(queryProductByIdCommand)
}

export default queryProductById
