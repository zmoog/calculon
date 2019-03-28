export type BasecampCommandRequest = {
    command: string
    callback_url: string
    creator: {
        id: number
        name: string
        email_address: string
    }
}

export type BasecampMessage = string;
