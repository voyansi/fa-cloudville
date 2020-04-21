import * as functions from 'firebase-functions';
// import * as querystring from 'querystring';
// import axios from 'axios'
// import { twolegAuthResponse } from './forgeInterfaces';
import { forgeAPIWrapper } from './forgeAPIWrapper';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// const getToken = async ():Promise<twolegAuthResponse> => {
//     const client_id = functions.config().forgeapi.client_id
//     const client_secret = functions.config().forgeapi.client_secret
//     const url = `https://developer.api.autodesk.com/authentication/v1/authenticate`
//     const scopes = encodeURI(`data:read account:read`)
//     try {
//         const forgeResponse = await axios({
//                 method: 'post',
//                 url,
//                 data: querystring.stringify({
//                     client_id,
//                     client_secret,
//                     'grant_type': 'client_credentials',
//                     scopes,

//                 }),
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//             })
//         return (forgeResponse.data)

//     } catch (error) {
//         throw error
//     }
// }


export const fetchToken = functions.https.onRequest(async (request, response) => {
    try {
        const token = await forgeAPIWrapper.getInstance().getToken()
        response.send(token)
    } catch (error) {
        response.send(error)
    }
})

export const getHubs = functions.https.onRequest(async(reqest, response ) => {
    try {
        const hubs = await forgeAPIWrapper.getInstance().getHubs()
        response.send(hubs)
    } catch (error) {
        response.send(error)
    }
})

export const getProjects = functions.https.onRequest(async(reqest, response ) => {
    try {
        const hubs = await forgeAPIWrapper.getInstance().getHubs()
        const hubId = hubs.data[0].id
        const projects = await forgeAPIWrapper.getInstance().getProjects(hubId)
        response.send(projects)
    } catch (error) {
        response.send(error)
    }
})

export const getTopFolder = functions.https.onRequest(async (request, response) => {
    try {
        const fAPI = forgeAPIWrapper.getInstance()
        const hubs = await fAPI.getHubs()
        const hubId = hubs.data[0].id
        const projects = await fAPI.getProjects(hubId)
        const projectId = projects.data[0].id
        const projectTopFolder = await fAPI.getProjectTopFolder(hubId)(projectId)
        response.send(projectTopFolder)
    } catch (error) {
        response.send(error)
    }
    
})