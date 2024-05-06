import csv from 'csv-parser'
import { GetObjectCommand, DeleteObjectCommand, CopyObjectCommand } from '@aws-sdk/client-s3'
import { SQSClient, SendMessageBatchCommand, GetQueueUrlCommand  } from '@aws-sdk/client-sqs'
import { client } from './../client/client.js'

export const importFileParser = async event => {
    const record  = event.Records[0]
    const bucketName = record.s3.bucket.name
    const objectKey = record.s3.object.key

    let queueUrl
    const sqsClient = new SQSClient({region: 'ap-northeast-1'})
    const getQueueUrlCommand = new GetQueueUrlCommand({ QueueName: 'catalogItemsQueue' })
    try {
        const { QueueUrl } = await sqsClient.send(getQueueUrlCommand)
        queueUrl = QueueUrl
    } catch (err) {
        console.log('err', err.message)
    }

    const dataFromCSV = []
    const command = new GetObjectCommand({ Bucket: bucketName, Key: objectKey })
    const response = await client.send(command)
    response.Body
        .pipe(csv())
        .on('data', data => {
            dataFromCSV.push(data)
        })
        .on('error', error => console.log('Error during reading', error))
        .on('end', async () => {
            const messages = dataFromCSV.map((data, idx) => {
                const messageAttributes = Object.keys(data).reduce((attrs, key) => ({
                    ...attrs,
                    [key]: {
                        StringValue: data[key],
                        DataType: typeof data[key] === 'string' ? 'String' : 'Number'
                    }
                }), {})
                
                return {
                    Id: `${data.title}-${idx}-1`,
                    MessageBody: data.description,
                    MessageAttributes: messageAttributes
                }
            })
            const sendMessageBatchCommand = new SendMessageBatchCommand({
                QueueUrl: queueUrl,
                Entries: messages
            })
            try {
                const response = await sqsClient.send(sendMessageBatchCommand)
                console.log('response', response)
            } catch (err) {
                console.log('err', err.message)
            }

            const fileName = objectKey.split('/')[1]
            const copyObjectCommand = new CopyObjectCommand({ CopySource: `${bucketName}/${objectKey}`, Bucket: bucketName,  Key: `parsed/${fileName}` })
            await client.send(copyObjectCommand)

            const deleteObjectCommand = new DeleteObjectCommand({ Bucket: bucketName, Key: objectKey })
            await client.send(deleteObjectCommand)
            console.log(`File ${fileName} moved from "uploaded" to "parsed" directory`)
        })

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "importFileParser" })
    }
}
