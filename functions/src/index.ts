import * as functions from 'firebase-functions';
const querystring = require('querystring');
import axios from 'axios'
const cors = require('cors')({ origin: true });

export const fetchToken = functions.https.onRequest(async (request, response) => {
    
    const url = 'https://developer.api.autodesk.com/authentication/v1/authenticate'
    const client_id = functions.config().forge.client_id
    const client_secret = functions.config().forge.secret_secret
    const scope = 'data:read'

    cors(request, response, async () => {
        try {
            const token = await axios({
                url,
                method: 'post',
                data: querystring.stringify({
                    client_id,
                    client_secret,
                    grant_type: 'client_credentials',
                    scope,
                })
            })
            response.set('Access-Control-Allow-Origin', '*');
            response.status(200).send(token)
        } catch (error) {
            response.status(500).send(error)
        }
    })
})
