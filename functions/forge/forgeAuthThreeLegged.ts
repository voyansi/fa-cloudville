import axios from 'axios';
import { forgeAuth, forgeAuthConfig, forgeAuthTokenThreeLeggedAuthCode } from './forgeAPIWrapper';
//@ts-ignore
import * as querystring from 'querystring'

export class forgeAuthThreeLegged implements forgeAuth {
    private url = 'https://developer.api.autodesk.com/authentication/v1/authenticate';
    private config: forgeAuthConfig;
    private token?: forgeAuthTokenThreeLeggedAuthCode | undefined;
    constructor(c: forgeAuthConfig) {
        this.config = c;
    }
    isAuthenticated() {
        return this.token ? true : false;
    }
    // launch three legged login
    fetchCode = async () => {
        const url = this.url;
        const { clientId, scope, redirectUrl } = this.config;
        try {
            await axios({
                method: 'post',
                url,
                // data needs to be in a query string
                data: querystring.stringify({
                    client_id: clientId,
                    'response_type': 'code',
                    'redirect_uri': redirectUrl,
                    scope: scope
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    };
    //hook to a response to register
    fetchToken = async (code: string): Promise<forgeAuthTokenThreeLeggedAuthCode | undefined> => {
        const url = `https://developer.api.autodesk.com/authentication/v1/gettoken`;
        const { clientId, clientSecret, scope, redirectUrl } = this.config;
        try {
            const forgeResponse = await axios({
                method: 'post',
                url,
                // data needs to be in a query string
                data: querystring.stringify({
                    client_id: clientId,
                    client_secret: clientSecret,
                    'grant_type': 'authorization_code',
                    code,
                    'redirect_uri': redirectUrl,
                    scope,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            this.token = forgeResponse.data;
            return this.token;
        }
        catch (error) {
            throw error;
        }
    };
    refresh = async () => {
        const url = 'https://developer.api.autodesk.com/authentication/v1/refreshtoken';
        const { clientId, clientSecret } = this.config;
        try {
            const forgeResponse = await axios({
                method: 'post',
                url,
                // data needs to be in a query string
                data: querystring.stringify({
                    client_id: clientId,
                    client_secret: clientSecret,
                    'grant_type': 'authorization_code',
                    //@ts-ignore
                    refresh_token: this.token.refresh_token,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            this.token = forgeResponse.data;
            return this.token;
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
