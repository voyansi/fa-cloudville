export interface twolegAuthResponse {
    access_token: string;
    token_type: string;
    expires_in: 3599
}

export type forgeIDTypes = 'checklistsContainerId' | "issueContainerId"

export interface hubsResponse {
    jsonapi: {
        version: string
    },
    links: {
        self: {
            href: string
        }
    },
    data: [{
        type: 'hubs',
        id: string,
        attributes: {
            name: string,
            region: string,
            extension: {
                type: string,
                version: string,
                schema: {
                    href: string
                },
                data: {

                },
                region: string
            },
            links: {
                self: string
            },
            relationships: {
                projects: {
                    links: {
                        related: {
                            href: string
                        }
                    }
                }
            }
        }
    }],
    meta: {
        warnings: [{
            Id: string | null,
            HttpStatusCode: string,
            ErrorCode: string,
            Title: string,
            Detail: string,
            AboutLink: string | null,
            Source: [],
            meta: []
        }]
    }
}