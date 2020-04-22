import { hubsResponse } from "./forgeInterfaces"
import axios from 'axios'
//@ts-ignore
import * as querystring from 'querystring'
import { forgeAuthTwoLegged } from './forgeAuthTwoLegged'

export interface forgeAuthConfig {
    clientId: string;
    clientSecret?: string;
    redirectUrl?: string;
    scope: string;
}

export interface forgeAuthTokenTwoLegged {
    token_type: 'Bearer',
    expires_in: number,
    access_token: string
}

export interface forgeAuthThreeLeggedCallback {
    code: string;
}

export interface forgeAuthTokenThreeLeggedAuthCode {
    token_type: 'Bearer',
    expires_in: number,
    access_token: string,
    refresh_token: string
}

export interface forgeAuthTokenThreeLeggedImplicitGrant {
    access_token: string
}

export type forgeAuthToken = forgeAuthTokenThreeLeggedAuthCode | forgeAuthTokenTwoLegged | forgeAuthTokenThreeLeggedImplicitGrant


export abstract class forgeAuth {
    // TODO: fix the need for the undefiend type
    abstract isAuthenticated(): boolean
    // refresh a token if it has expires
    abstract refresh(): Promise<forgeAuthToken | undefined>
    // get the token from the auth wrapper
    abstract getToken(): Promise<forgeAuthToken | undefined>
}

export class forgeAPIWrapper {
    private static urlRoot = `https://developer.api.autodesk.com`
    private auth: forgeAuth;

    private constructor(auth: forgeAuth) {
        this.auth = auth
    }

    static withTwoLeggedAuth(c: forgeAuthConfig) {
        const auth = new forgeAuthTwoLegged(c);
        return new forgeAPIWrapper(auth);
    }

    // static withThreeLeggedAuth(c: forgeAuthConfig) {

    // }

    getToken = async (): Promise<forgeAuthToken | undefined> => {
        try {
                console.log(this.auth)
            if (this.auth.isAuthenticated()) {
                return await this.auth.getToken();
            } else {
                return await this.auth.getToken()
            }
        } catch (error) {
            throw error
        }
    }

    getHubs = async (): Promise<hubsResponse> => {
        try {
            const t = await this.getToken()
            //@ts-ignore
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
            //@ts-ignore
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
            //@ts-ignore
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
            //@ts-ignore
            const token = t.access_token;
            const url = `${forgeAPIWrapper.urlRoot}/data/v1/projects/${projectId}/folders/${folderId}/contents`

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