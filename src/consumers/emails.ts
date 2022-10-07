import {createConsumer, TOPICS} from "../config/kafka";
import {prepareEmailsToSend, sendEmail} from "../services";

const emailsPrepareConsumer = async ({id}: { id: string }) => {
    await prepareEmailsToSend(id)
}

const sendEmailsConsumer = async ({jobId}: { jobId: string }) => {
    await sendEmail({jobId})
}

export const runEmailsConsumers = () => {
    return Promise.all([
        createConsumer('emails.prepare', TOPICS.EMAILS_PREPARE.topic, emailsPrepareConsumer),
        createConsumer('emails.send', TOPICS.EMAILS_SEND.topic, sendEmailsConsumer),
    ])
}
