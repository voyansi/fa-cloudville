import { twolegAuthResponse, hubsResponse } from "./forgeInterfaces"
import axios from 'axios'
//@ts-ignore
import * as querystring from 'querystring'
import { AuthClientThreeLegged } from "forge-apis"
import { OAuth2PopupFlow } from 'oauth2-popup-flow';
const ForgeSDK = require('forge-apis')

export interface forgeAppConfig {
    clientId: string;
    clientSecret: string;
    redirectUrl: string;
    scopes: string;
}

export interface forgeThreeLegToken {
    token_type: 'Bearer',
    expires_in: number,
    refresh_token: string,
    access_token: string
    exp: number
}


export class forgeAPIWrapper {
    private static urlRoot = `https://developer.api.autodesk.com`
    // private config: forgeAppConfig;
    // private oAuth2ThreeLegged: AuthClientThreeLegged;
    private auth: OAuth2PopupFlow<forgeThreeLegToken>;

    constructor() {
        // this.config = c;
        
        this.auth = new OAuth2PopupFlow<forgeThreeLegToken>({
            authorizationUri: '	https://developer.api.autodesk.com/authentication/v1/authorize',
            //@ts-ignore
            clientId: process.env.VUE_APP_CLIENT_ID,
            //@ts-ignore
            redirectUri: process.env.VUE_APP_REDIRECT,
            scope: 'data:read'
        })

        // set up Forge SDK 3 Legged Auth
        // const autoRefresh = true;
        // this.oAuth2ThreeLegged = new ForgeSDK.AuthClientThreeLegged(
        //     this.config.clientId,
        //     this.config.clientSecret,
        //     this.config.redirectUrl,
        //     this.config.scopes.split(' '), autoRefresh)
    }

    isAuthenticated() {
        return this.auth.loggedIn();
    }

    async authenticate() {
        const result = await this.auth.tryLoginPopup()
        if(result === 'ALREADY_LOGGED_IN'){
            return this.auth.tokenPayload()
        } else if(result === 'POPUP_FAILED'){
            alert('could not open pop-up')
        } else if (result === 'SUCCESS'){
            return this.auth.tokenPayload()
        }
    }

    getThreeLeggedUrl = () => {
        // return this.oAuth2ThreeLegged.generateAuthUrl()
    }

    // getThreeLeggedToken = async (authCode: string) => {
    //     return await this.oAuth2ThreeLegged.getToken(authCode)
    // }

    getToken = () => false;


    // getToken = async (): Promise<twolegAuthResponse> => {
    //     //TODO: factor out functions.config() dependency
    //     const client_id = this.config.clientId
    //     const client_secret = this.config.clientSecret
    //     const url = `${forgeAPIWrapper.urlRoot}/authentication/v1/authenticate`
    //     // scopes need to be URI encoded
    //     // const scope = encodeURI(`data:read account:read`)
    //     const scope = 'data:read account:read data:create data:write viewables:read'

    //     try {
    //         const forgeResponse = await axios({
    //             method: 'post',
    //             url,
    //             // data needs to be in a query string
    //             data: querystring.stringify({
    //                 client_id,
    //                 client_secret,
    //                 'grant_type': 'client_credentials',
    //                 scope,
    //             }),
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             }
    //         })
    //         return (forgeResponse.data)

    //     } catch (error) {
    //         throw error
    //     }
    // }

    getHubs = async (): Promise<hubsResponse> => {
        try {
            const t = await this.getToken()
            const token = t.access_token;
            const url = `${forgeAPIWrapper.urlRoot}/project/v1/hubs`
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

    getProjects = async (hubId: string) => {
        try {
            const t = await this.getToken()
            const token = t.access_token;
            const url = `${forgeAPIWrapper.urlRoot}/project/v1/hubs/${hubId}/projects`

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

    getProjectTopFolder = (hubId: string) => async (projectId: string) => {
        try {
            const t = await this.getToken()
            const token = t.access_token;
            const url = `${forgeAPIWrapper.urlRoot}/project/v1/hubs/${hubId}/projects/${projectId}/topFolders`

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

    getProjectContents = (projectId: string) => async (folderId: string) => {
        // TODO: add optional params (https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/)
        try {
            const t = await this.getToken()
            const token = t.access_token;
            const url = `${forgeAPIWrapper.urlRoot}/data/v1/projects/${projectId}/folders/${folderId}/contents`

            const response = await axios({
                method: 'get',
                url,
                headers: {
                    'Authorization': `Bearer ` + token,
                }
            })

            return response
        } catch (error) {
            throw error
        }
    }

}