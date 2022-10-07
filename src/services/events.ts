import {NextApiResponse} from "next";
import {generateRandomString} from "../utils";
import {getLogger} from "../config";

declare global {
    var Clients: Map<string, NextApiResponse>
}

// does not work using local variable (map is empty during next requests and message processing)
global.Clients = new Map()

export const addClient = (client: NextApiResponse) => {
    const id = generateRandomString()
    global.Clients.set(id, client)
    return id
}

export const deleteClient = (id: string) => {
    global.Clients.delete(id)
}

const prepareJSON = (event: string, data: unknown) => `data: ${JSON.stringify({
    event,
    data
})}\n\n`

export const sendById = (id: string, event: string, data: unknown) => {
    getLogger().trace({
        event,
        data,
        id,
    }, 'sending event to client by id')
    const json = prepareJSON(event, data)
    global.Clients.get(id)?.write(json)
}

export const sendToEvery = (event: string, data: unknown) => {
    getLogger().trace({
        event,
        data,
        clientsCount: global.Clients.size
    }, 'sending event to all clients')
    const json = prepareJSON(event, data)
    global.Clients.forEach((c) => c.write(json))
}
