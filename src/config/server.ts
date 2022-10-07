import {createServer} from 'http'
import {parse} from 'url'
import {app} from "./next";
import {PORT} from "./env";
import {getLogger} from "./store";

const nextHandler = app.getRequestHandler()

export const server = createServer(async (req, res) => {
    try {
        const parsedUrl = parse(req.url!, true)
        await nextHandler(req, res, parsedUrl)
    } catch (e) {
        getLogger().error(e, 'occurred during request processing')
    }
})

export const startServer = async () => {
    await app.prepare()

    return new Promise<void>((resolve) => {
        server.listen(PORT, () => {
            resolve()
        })
    })
}

export const stopServer = () => app.close()
