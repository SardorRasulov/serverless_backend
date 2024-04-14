import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { client } from './../client/client.js'

export const importProductsFile = async event => {
    const { queryStringParameters } = event
    const { name: fileName } = queryStringParameters

    if (!fileName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Filename is not provided' })
      }
    }
    const command = new PutObjectCommand({ Bucket: 'task-5-s3integration-sr', Key: `uploaded/${fileName}` })
    const signedUrl = await getSignedUrl(client, command, {expiresIn: 3600 * 24 * 7})

    return {
      statusCode: 200,
      body: signedUrl,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    }
}
