import { twolegAuthResponse } from "./forgeInterfaces"
import * as functions from 'firebase-functions'
import axios from 'axios'
import * as querystring from 'querystring'

export class forgeAPIWrapper {
    private static urlRoot = `https://developer.api.autodesk.com`
    private static instance?: forgeAPIWrapper;
    
    private constructor(){
        
    }

    static getInstance = () => {
        if(forgeAPIWrapper.instance){
            return forgeAPIWrapper.instance;
        } else {
            forgeAPIWrapper.instance = new forgeAPIWrapper();
            return forgeAPIWrapper.instance;
        }
    }

    getToken = async (): Promise<twolegAuthResponse> => {
        //TODO: factor out functions.config() dependency
        const client_id = functions.config().forgeapi.client_id
        const client_secret = functions.config().forgeapi.client_secret
        const url = `${forgeAPIWrapper.urlRoot}/authentication/v1/authenticate`
        // scopes need to be URI encoded
        // const scope = encodeURI(`data:read account:read`)
        const scope = ['data:read account:read']
        
        try {
            const forgeResponse = await axios({
                method: 'post',
                url,
                // data needs to be in a query string
                data: querystring.stringify({
                    client_id,
                    client_secret,
                    'grant_type': 'client_credentials',
                    scope,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            return (forgeResponse.data)

        } catch (error) {
            throw error
        }
    }

    getHubs = async () => {
        try {
            const t = await this.getToken()
            const token = t.access_token;
            const url = `${forgeAPIWrapper.urlRoot}/project/v1/hubs`
            console.log(token)
            
            const response = await axios({
                method: 'get',
                url,
                headers: {
                    'Authorization': `Bearer ` + token,
                    'Accept': '*/*'
                }
            })
            
            return response.data
        } catch (error) {
            throw error
        }
    }
}