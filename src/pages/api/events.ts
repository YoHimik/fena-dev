import type {NextApiRequest, NextApiResponse} from 'next'
import {getLogger, runWithStore} from "../../config";
import {addClient, deleteClient, getEmails, sendById} from "../../services";
import {Events} from "../../types/events";

const RESPONSE_HEADERS = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Encoding': 'none'
};

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
        const {method} = req
        switch (method) {
            case 'GET':
                res.writeHead(200, RESPONSE_HEADERS)
                const newId = addClient(res)
                req.on('close', () => deleteClient(newId))
                sendById(newId, Events.EmailsGet, getEmails())
                break
            default:
                res.setHeader('Allow', 'GET')
                res.status(405).end(`Method ${method} Not Allowed`)
                break
        }
    } catch (e) {
        getLogger().error(e, 'error occurred during events subscribing')
        res.status(500).json({})
    } finally {
        getLogger().trace({
            response: {
                status: res.statusCode,
                headers: res.getHeaders(),
            }
        }, 'request processing finished')
    }
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    runWithStore(undefined, handlerWithStore, req, res)
}
