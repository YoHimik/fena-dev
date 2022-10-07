import type {NextApiRequest, NextApiResponse} from 'next'
import {createSendEmailsJob} from "../../../services";
import {getLogger, runWithStore} from "../../../config";

const handlerWithStore = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        getLogger().trace({
            request: {
                headers: req.headers,
                method: req.method,
                query: req.query,
                url: req.url,
            }
        }, 'incoming request')
        const {method, query} = req
        switch (method) {
            case 'POST':
                const countToSend = Number(query.countToSend)
                if (isNaN(countToSend) || countToSend < 1) {
                    res.status(400).json({})
                    break
                }

                const result = await createSendEmailsJob(countToSend)
                res.status(202).json(result)
                break
            default:
                res.setHeader('Allow', 'POST')
                res.status(405).end(`Method ${method} Not Allowed`)
                break
        }
    } catch (e) {
        getLogger().error(e, 'error occurred during creating send emails job')
        res.status(500).json({})
    } finally {
        getLogger().trace({
            response: {
                status: res.statusCode,
                headers: res.getHeaders(),
            }
        },'request processing finished')
    }
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    runWithStore(undefined, handlerWithStore, req, res)
}
