import * as functions from 'firebase-functions';
import { forgeAPIWrapper } from '../../forge/forgeAPIWrapper';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const faw = forgeAPIWrapper.withTwoLeggedAuth({
    //@ts-ignore
    clientId: process.env.client_id,
    clientSecret: process.env.client_secret,
    scope: 'data:read data:write'
})

export const fetchToken = functions.https.onRequest(async (request, response) => {
    try {
        const token = await faw.getToken()
        response.send(token)
    } catch (error) {
        response.send(error)
    }
})

// // export const getHubs = functions.https.onRequest(async(reqest, response ) => {
//     try {
//         const hubs = await forgeAPIWrapper.getInstance().getHubs()
//         response.send(hubs)
//     } catch (error) {
//         response.send(error)
//     }
// })

// export const getProjects = functions.https.onRequest(async(reqest, response ) => {
//     try {
//         const hubs = await forgeAPIWrapper.getInstance().getHubs()
//         const hubId = hubs.data[0].id
//         const projects = await forgeAPIWrapper.getInstance().getProjects(hubId)
//         response.send(projects)
//     } catch (error) {
//         response.send(error)
//     }
// })

// export const getTopFolder = functions.https.onRequest(async (request, response) => {
//     try {
//         const fAPI = forgeAPIWrapper.getInstance()
//         const hubs = await fAPI.getHubs()
//         const hubId = hubs.data[0].id
//         const projects = await fAPI.getProjects(hubId)
//         const projectId = projects.data[0].id
//         const projectTopFolder = await fAPI.getProjectTopFolder(hubId)(projectId)
//         response.send(projectTopFolder)
//     } catch (error) {
//         response.send(error)
//     }
// })

// export const getContents = functions.https.onRequest(async (request, response) => {
//     const projectId = 'b.7e8d1b7d-47bd-4606-b8b8-094e8de86f15'
//     const folderId = 'urn:adsk.wipprod:fs.folder:co.d9PTVReaTBOIVKmj9vhcbw'
//     try {
//         const fAPI = forgeAPIWrapper.getInstance()
//         const contents = await fAPI.getProjectContents(projectId)(folderId)
//         response.send(contents)
//     } catch (error) {
//         response.send(error)
//     }
// })