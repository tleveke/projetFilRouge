const { Server } = require('boardgame.io/server');
const { TicTacToe } = require('../game/Game');
const { configGame } = require('../game/config');
var bodyParser = require('koa-body')();

//import webpush from "web-push";

const server = Server({ games: [TicTacToe] });

const publicVKey = "BERS0qIV52YrS3vpWLTtx8t3a3LrXfqrazefmqy5o_TuQ6ZC2TDkWmQb1ZmUeeVxRmQjeGsi0Aah-sod4PKP5M4";
const privateVKey = "VPpbYXn3zDDPh-uoqw8uwuEW23Z93lnun09v7WUeUus";

let router = server.router;

//router.use(bodyParser.json());
//router.use(cors())

router.get('/', (ctx, next) => {
    ctx.body = 'Hello world!'
});
router.post('/subscription',bodyParser,async (ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = ctx.request.body
    await next();
});

server.run(configGame.serverPort);