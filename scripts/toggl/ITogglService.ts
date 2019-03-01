export interface ITogglService {
    summary(since: Date, until: Date): Promise<any>;
}

export type TogglConfig = {
    apiToken: string,
    userAgent: string,
    workspaceId: string
}
