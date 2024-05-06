import docClient from './../services/dbConnection.js'
import { BatchWriteCommand } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'

const batchProducts = data => {
    const putRequests = data.map(data => ({
        PutRequest: {
            Item: {
                id: uuidv4(),
                ...data
            }
        }
    }))
    const batchWriteCommand = new BatchWriteCommand({
        RequestItems: {
            [process.env.PRODUCTS_TABLE_NAME]: putRequests
        }
    })
    return docClient.send(batchWriteCommand)
}

export default batchProducts
