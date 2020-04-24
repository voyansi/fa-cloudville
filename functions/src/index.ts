import * as functions from 'firebase-functions';
import { forgeAPIWrapper } from '../forge/forgeAPIWrapper';
const express = require('express')
const cors = require('cors')({ origin: true });
const app = express()
app.use(cors)

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const faw = forgeAPIWrapper.withTwoLeggedAuth({
    //@ts-ignore
    clientId: functions.config().forgeapi.client_id,
    clientSecret: functions.config().forgeapi.client_secret,
    scope: 'data:read data:write data:create account:read account:write'
})

export const fetchToken = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        try {
            const token = await faw.getToken()
            response.set('Access-Control-Allow-Origin', '*');
            response.send(token)
        } catch (error) {
            response.send(error)
        }

    })
})


// app.get('/forgeToken', async (req: any, res: any) => {
//     try {
//         const token = await faw.getToken()
//         req.send(token)
//     } catch (error) {
//         throw error
//     }
    
// })

// exports.app = functions.https.onRequest(app);

// export const fetchForgeToken = functions.https.onCall(async (data, context) => {
//     try {
//         const token = await faw.getToken()
//         return token
//     } catch (error) {
//         throw error
//     }
// })

// export const getHubs = functions.https.onRequest(async (reqest, response) => {
//     try {
//         const hubs = await faw.getHubs()
//         response.send(hubs)
//     } catch (error) {
//         response.send(error)
//     }
// })

// export const getProjects = functions.https.onRequest(async (reqest, response) => {
//     try {
//         const hubs = await faw.getHubs()
//         const hubId = hubs.data[0].id
//         const projects = await faw.getProjects(hubId)
//         response.send(projects)
//     } catch (error) {
//         response.send(error)
//     }
// })

// export const getTopFolder = functions.https.onRequest(async (request, response) => {
//     try {
//         const hubs = await faw.getHubs()
//         const hubId = hubs.data[0].id
//         const projects = await faw.getProjects(hubId)
//         const projectId = projects.data[0].id
//         const projectTopFolder = await faw.getProjectTopFolder(hubId)(projectId)
//         response.send(projectTopFolder)
//     } catch (error) {
//         response.send(error)
//     }
// })

// export const getContents = functions.https.onRequest(async (request, response) => {
//     const fawe = forgeAPIWrapper.withTwoLeggedAuth({
//         //@ts-ignore
//         clientId: functions.config().forgeapi.client_id,
//         clientSecret: functions.config().forgeapi.client_secret,
//         scope: 'data:read data:write data:create account:read account:write'
//     })
//     try {
//         const contents = await fawe.getProjectContents('b.7e8d1b7d-47bd-4606-b8b8-094e8de86f15')('urn:adsk.wipprod:fs.folder:co.d9PTVReaTBOIVKmj9vhcbw')
//         response.send(contents)
//     } catch (error) {
//         response.send(error)
//     }
// })