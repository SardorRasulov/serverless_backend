import batchProducts from './../src/services/batchProducts.js'
import { SNSClient, PublishBatchCommand , ListTopicsCommand } from '@aws-sdk/client-sns'

export const catalogBatchProcess = async event => {
    const snsClient = new SNSClient({ region: 'ap-northeast-1' })
    const data = event.Records.map(({ messageAttributes }) =>
        Object.keys(messageAttributes)
        .reduce((attrs, key) => ({
            ...attrs,
            [key]: messageAttributes[key].stringValue
        }), {})
    )
    let res
    try {
        const response = await batchProducts(data)
        if (response.$metadata.httpStatusCode === 200) {
            res = {
                statusCode: 200,
                body: JSON.stringify(data)
            }
            const listTopicsCommand = new ListTopicsCommand({})
            const { Topics } = await snsClient.send(listTopicsCommand)
            const topicArn = Topics?.[0]?.TopicArn
            const publishEntries = event.Records.map(({ messageAttributes }, idx) => ({
                Id: `Id-${idx}`,
                Message: 'Product added',
                Subject: 'Products base update',
                MessageAttributes: {
                    stringValue: messageAttributes.stringValue,
                    dataType: messageAttributes.dataType
                }
            }))
            const sendNotification = new PublishBatchCommand({ TopicArn: topicArn, PublishBatchRequestEntries: publishEntries })
            await snsClient.send(sendNotification)
        }
    } catch (err) {
        console.log('err', err.message)
        res = {
            statusCode: 500,
            body: JSON.stringify({ message: err.message })
        }
    }
    return {
       ...res,
        headers: {
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
    }
}