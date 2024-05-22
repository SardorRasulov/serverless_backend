export const generateResponse = (statusCode = 200, body = {}) => {
  return {
    statusCode,
    body: JSON.stringify(body)
  }
}
