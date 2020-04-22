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

    
}