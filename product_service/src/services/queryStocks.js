import docClient from './dbConnection.js'
import { ScanCommand } from '@aws-sdk/lib-dynamodb'

const queryStocks = () => {
    const queryStocksCommand = new ScanCommand({
        TableName: process.env.STOCKS_TABLE_NAME,
        AttributesToGet: ["product_id", "count"]
    })
    return docClient.send(queryStocksCommand)
}

export default queryStocks
