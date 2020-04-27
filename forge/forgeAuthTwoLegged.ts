import axios from 'axios';
import { forgeAuth, forgeAuthConfig, forgeAuthTokenTwoLegged } from './forgeAPIWrapper';
//@ts-ignore
import * as querystring from 'querystring'

export class forgeAuthTwoLegged implements forgeAuth {
    private url = 'https://developer.api.autodesk.com/authentication/v1/authenticate';
    private config: forgeAuthConfig;
    private token?: forgeAuthTokenTwoLegged;
    // private access_token?: string;
    constructor(c: forgeAuthConfig) {
        this.config = c;
    }
    isAuthenticated() {
        return this.token ? true : false;
    }
    fetchToken = async (): Promise<forgeAuthTokenTwoLegged> => {
        const url = this.url;
        const { clientId, clientSecret, scope } = this.config;
        try {
            const forgeResponse = await axios({
                method: 'post',
                url,
                // data needs to be in a query string
                data: querystring.stringify({
                    client_id: clientId,
                    client_secret: clientSecret,
                    'grant_type': 'client_credentials',
                    scope: scope,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            return (forgeResponse.data);
        }
        catch (error) {
            throw error;
        }
    };
    refresh = async () => {
        try {
            const token = await this.fetchToken();
            this.token = token;
            return token;
        }
        catch (error) {
            throw error;
        }
    };
    getToken = async () => {
        try {
            if (this.token) {
                // return token
                return this.token;
            }
            else {
                // fetch and register token
                await this.refresh();
                return this.token;
            }
        }
        catch (error) {
            throw error;
        }
    };
}
