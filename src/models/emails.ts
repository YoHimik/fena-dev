import {Emails} from "../types";
import {generateRandomString} from "../utils";

declare global {
    var EmailsData: Map<string, Emails>
}

// does not work using local variable (map is empty during next requests and message processing)
global.EmailsData = new Map()

export const createEmails = (countToSend: number) => {
    const newEmails = {
        id: generateRandomString(),
        countToSend,
        preparedCount: 0,
        sentCount: 0,
    }

    global.EmailsData.set(newEmails.id, newEmails)

    return newEmails
}

export const getEmailsById = (id: string) => {
    return global.EmailsData.get(id)
}

export const getAllEmails = () => {
    return Array.from(global.EmailsData.values())
}
