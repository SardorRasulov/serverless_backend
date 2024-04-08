import docClient from "./dbConnection.js"
import { ScanCommand } from '@aws-sdk/lib-dynamodb'

const queryProducts = () => {
    const queryProductsCommand = new ScanCommand({
        TableName: process.env.PRODUCTS_TABLE_NAME
    })
    return docClient.send(queryProductsCommand)
}

export default queryProducts
