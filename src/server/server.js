const { Server } = require('boardgame.io/server');
const { TicTacToe } = require('../game/Game');
const { configGame } = require('../game/config');
const bodyParser = require('koa-body')();
const { MongoClient } = require('mongodb');


//import webpush from "web-push";

const server = Server({ games: [TicTacToe] });

const publicVKey = "BERS0qIV52YrS3vpWLTtx8t3a3LrXfqrazefmqy5o_TuQ6ZC2TDkWmQb1ZmUeeVxRmQjeGsi0Aah-sod4PKP5M4";
const privateVKey = "VPpbYXn3zDDPh-uoqw8uwuEW23Z93lnun09v7WUeUus";
const uri = "mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb";
const client = new MongoClient(uri);

let router = server.router;

//router.use(bodyParser.json());
//router.use(cors())

router.get('/', (ctx, next) => {
    ctx.body = 'Hello world!'
});
router.post('/subscription', bodyParser, async (ctx, next) => {
    console.log(ctx.request.body)

    const bodySub = ctx.request.body;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
        const result = await client.db("gameFilRouge").collection("subscription").insertOne(bodySub);
        console.log(`New listing created with the following id: ${result.insertedId}`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    await next();
});

server.run(configGame.serverPort);