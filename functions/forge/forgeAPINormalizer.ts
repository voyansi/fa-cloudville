import { hubsResponse } from './forgeInterfaces'

export interface forgeHub {
    name: string,
    region: string,
    id: string
}

export interface forgeProject {
    id: string;
    name: string;
    inHub: string;
}

export interface forgeFolder {
    id: string;
    name: string;
    displayName: string;
    createUserName: string;
    createUserId: string;
    hidden: boolean;
    lastModifiedUserId: string;
    lastModifiedUserName: string;
    inProject?: string;
}

export class forgeAPINormalizer {
    static parseHubsResponse(r: hubsResponse): forgeHub[] {
        return r.data.map(d => {
            return {
                name: d.attributes.name,
                region: d.attributes.region,
                id: d.id
            }
        })
    }

    //TODO: add types
    static parseProjectsResponse(p: any) {
        return p.map((r: any) =>
            r.data.map((d: any) => {
                return {
                    name: d.attributes.name,
                    id: d.id,
                    inHub: d.relationships.hub.data.id
                }
            })).reduce((a: Array<any>, b: Array<any>) => a.concat(b))
    }

    static parseFoldersResponse(f: any) {
        return f.data.map((folder: any) => {
            return {
                name: folder.attributes.name,
                id: folder.id,
                displayName: folder.attributes.displayName,
                createUserName: folder.attributes.createUserName,
                createUserId: folder.attributes.createUserId,
                hidden: folder.attributes.hidden,
                lastModifiedUserId: folder.attributes.lastModifiedUserId,
                lastModifiedUserName: folder.attributes.lastModifiedUserName,
            }
        })
    }

}