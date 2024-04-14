import csv from 'csv-parser'
import { GetObjectCommand, CopyObjectCommand } from '@aws-sdk/client-s3'
import { client } from './../client/client.js'

export const importFileParser = async event => {
    const record  = event.Records[0]
    const bucketName = record.s3.bucket.name
    const objectKey = record.s3.object.key

    const command = new GetObjectCommand({ Bucket: bucketName, Key: objectKey })
    const response = await client.send(command)
    response.Body
        .pipe(csv())
        .on('data', data => console.log('Data read', data))
        .on('error', error => console.log('Error during reading', error))
        .on('end', () => {
            const fileName = objectKey.split('/')[1]
            const copyObjectCommand = new CopyObjectCommand({ CopySource: `${bucketName}/${objectKey}`, Bucket: bucketName,  Key: `parsed/${fileName}` })
            client.send(copyObjectCommand)
                .then(() => console.log(`File ${fileName} moved from "uploaded" to "parsed" directory`))
        })

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "importFileParser" })
    }
}
