import {getLogger, PORT} from "./config"
import {startServer, stopServer} from "./config/server"
import {declareTopics, stopConsumers, stopProducers} from "./config/kafka";
import {runConsumers} from "./consumers";

const terminateHandler = async (e: NodeJS.Signals) => {
    getLogger().warn(`received terminate signal ${e}, shutting down server`);

    await Promise.all([stopServer(), stopConsumers()]);

    await stopProducers()

    process.exit();
};

const main = async () => {
    getLogger().trace('declaring kafka topics')
    await declareTopics()

    getLogger().trace('running consumers')
    await runConsumers()

    getLogger().trace('starting server')
    await startServer()

    getLogger().info(`server started on port ${PORT}`)

    process.on('SIGINT', terminateHandler);
    process.on('SIGTERM', terminateHandler);
}

main().catch(e => getLogger().error(e, 'error occurred during start'))
