const { Server } = require('boardgame.io/server');
const { TicTacToe } = require('../game/Game');
const { configGame } = require('../game/config');
const bodyParser = require('koa-body')();
const { MongoClient } = require('mongodb');


const { webpush } = require('web-push');

const server = Server({ games: [TicTacToe] });

const publicVKey = "BERS0qIV52YrS3vpWLTtx8t3a3LrXfqrazefmqy5o_TuQ6ZC2TDkWmQb1ZmUeeVxRmQjeGsi0Aah-sod4PKP5M4";
const privateVKey = "VPpbYXn3zDDPh-uoqw8uwuEW23Z93lnun09v7WUeUus";
const uri = "mongodb://127.0.0.1:27017/gssapiServiceName=mongodb";

let router = server.router;

//router.use(bodyParser.json());
//router.use(cors())

router.get('/', (ctx, next) => {
    ctx.body = 'Hello world!'
});
router.post('/subscription', bodyParser, async (ctx, next) => {
    console.log(ctx.request.body)

    const bodySub = ctx.request.body;
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        const result = await client.db("gameFilRouge").collection("subscription").insertOne(bodySub);
        console.log(`New listing created with the following id: ${result.insertedId}`);
        await client.close();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    await next();
});

router.get('/sendpush', bodyParser, async (ctx, next) => {
    console.log(ctx.request.body)
    webpush.setVapidDetails(
        'dev:test@test.com',
        publicVapidKey,
        privateVapidKey,
    );
    
    const result = await client.db("gameFilRouge").collection("subscription").findOne();
    console.log(result);
});

server.run(configGame.serverPort);