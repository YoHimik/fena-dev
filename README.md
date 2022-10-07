# fena-dev

## How to use
Install it and run:

```sh
npm install
export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
docker-compose -f ./docker-compose.local.yaml up -d
npm run dev
```

Configuration:
1. `ENV = development` - The application environment (use `production` to run in production mode)
2. `LOG_LEVEL = trace` - The minimum level of logs to print 
3. `PORT = 3000` - The port to start the server 
4. `KAFKA_URL = 127.0.0.1:9092` - The url of the kafka broker 
5. `EMAILS_TO_PREPARE = 10` - The number of emails to prepare for sending per once  
