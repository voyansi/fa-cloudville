export default class OAuth{
    endpoint = 'https://developer.api.autodesk.com/authentication/v1/authorize'
    response_type = 'token'
    client_id: string;
    
    constructor(){
        this.client_id = process.env.FORGE_CLIENT_ID
    }
    
    
}