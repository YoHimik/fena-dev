import {publishPrepareEmails, publishSendEmail} from "../producers";
import {createEmails, getAllEmails, getEmailsById} from "../models";
import {generateRandomString} from "../utils";
import {EMAILS_TO_PREPARE, getLogger} from "../config";
import {sendToEvery} from "./events";
import {Events} from "../types/events";

export const getEmails = () => {
    const emails = getAllEmails()
    return {
        emails
    }
}

export const createSendEmailsJob = async (countToSend: number) => {
    const emails = createEmails(countToSend)
    await publishPrepareEmails(emails.id)
    return emails
}

export const prepareEmailsToSend = async (id: string) => {
    const emails = getEmailsById(id);
    if (!emails) {
        getLogger().warn({id}, 'no emails found for id')
        return
    }

    while (emails.preparedCount < emails.countToSend) {
        const emailsCountToSend = Math.min(EMAILS_TO_PREPARE, emails.countToSend - emails.preparedCount)
        const emailsToSend = Array(emailsCountToSend).fill(0).map(() => ({
            key: generateRandomString(),
            data: {
                jobId: id
            }
        }))
        await publishSendEmail(emailsToSend)
        emails.preparedCount += emailsCountToSend
        sendToEvery(Events.EmailsUpdate, emails)
    }
}

export const sendEmail = ({jobId}: { jobId: string }) => new Promise<void>(resolve => setTimeout(() => {
    try {
        const emails = getEmailsById(jobId)
        if (!emails) {
            getLogger().warn({jobId}, 'no prepare emails job found')
            return
        }
        emails.sentCount += 1
        sendToEvery(Events.EmailsUpdate, emails)
    } finally {
        resolve()
    }
}, 0))
