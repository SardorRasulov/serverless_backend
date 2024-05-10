import { generateResponse } from "./helpers/generateResponse.js"

export const basicAuthorizer = async event => {
  const masterPass = process.env.sardorrasulov
  const { headers } = event
  const { Authorization } = headers

  if (typeof Authorization === 'undefined') {
    return generateResponse(401, { message: "Unauthorized access" })
  }

  try {
    const authToken = Authorization.split(' ')[1]
    const credentials = atob(authToken)
    const [username, password] = credentials.split(':')

    const isValidUsername = val => val === 'SardorRasulov'
    const isValidPass = val => val === masterPass

    if (isValidUsername(username) && isValidPass(password)) {
      return generateResponse(200, { username })
    } else {
      return generateResponse(403, { message: 'Invalid credentials' })
    }

  } catch (err) {
    return generateResponse(500, { message: err.message })
  }
}
