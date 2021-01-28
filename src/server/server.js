const { Server, FlatFile } = require('boardgame.io/server');
const { TicTacToe } = require('../game/Game');
const { configGame } = require('../game/config');
const bodyParser = require('koa-body')();
const { MongoClient } = require('mongodb');
const schedule = require('node-schedule');

const webpush = require('web-push');

const generateCredentials = async ctx => {
    const authHeader = ctx.request.headers['authorization'];
    const token = await authService.decodeToken(authHeader);
    return token.uid;
}

const authenticateCredentials = async (credentials, playerMetadata) => {
    if (credentials) {
        const token = await authService.decodeToken(credentials);
        if (token.uid === playerMetadata.credentials) return true;
    }
    return false;
}
const server = Server({
    games: [TicTacToe,
          generateCredentials,
          authenticateCredentials,]
});
/*
const server = Server({
    games: [TicTacToe],
    db: new FlatFile({
        dir: '/var/ProjectYnov/BoardGameStorage/',
        logging: true,
    }),
}); // Erreur avec les variable inséré dans la BDD
*/

const publicVKey = "BItfWGr9-A8X6Jaoy6AHkRyrs4UPEg1Om2cu8iOeaihiF0zVVNbJsYPOViovgSXYP-5t4hf9n84IJQ7_u1yFZLQ";
const privateVKey = "OUbBKb97HA-5Ftz7Tu0SxadIntVgeR7c_SZbewutGP8";

const uri = "mongodb://127.0.0.1:27017/gssapiServiceName=mongodb";
webpush.setVapidDetails(
    'dev:test@test.com',
    publicVKey,
    privateVKey,
);


let tabScheduleJob = [];

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

router.get('/sendpush/:idPlayer/:titre/:tag/:message', bodyParser, async (ctx, next) => {
    console.log(ctx.request.body)
    console.log(ctx.params.message)
    const idPlayer = ctx.params.idPlayer;
    const titre = ctx.params.titre;
    const tag = ctx.params.tag;
    const message = ctx.params.message;
    const params = {
        title: titre,
        message: message,
        body: message,
        icon: `/img/${tag}.png`,
        image: `/img/${tag}.png`,
        badge: `/img/${tag}.png`,
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: tag,
        actions: [{ "action": "multiplayer", "title": "Cliquez ici pour rejoindre !" }]
    };
    console.log(titre);
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        const playerSubscription = await client.db("gameFilRouge").collection("subscription").findOne({ name: idPlayer });
        let pushSubscription = playerSubscription['subscription'];
        console.log(playerSubscription);

        webpush.sendNotification(pushSubscription, new Buffer(JSON.stringify(params), 'utf8'))
            .then(
                function(data) {
                    console.log(data)
                },
                function(err) {
                    console.log(err)
                }
            )
            .catch(function(ex) {
                console.log(ex)
            });

        await client.close();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    await next();
});

router.post('/createCronDay', bodyParser, async (ctx, next) => {
    console.log(ctx.request.body)

    const bodyCron = ctx.request.body;

    let dateToday = new Date();
    //let date24hours.setDate(date.getDate() + 1);
    //let date23hours.setHours(date.getDate() + 23);

    /*let j = schedule.scheduleJob(date24hours, function(){
      console.log('The world is going to end today.');
    });
    
    
    tabScheduleJob.push(j);*/

});


router.get('/endGame/:nameLobby', bodyParser, async (ctx, next) => {
    const nameLobby = ctx.params.nameLobby;

    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        const players = await client.db("gameFilRouge").collection("subscription").find({ name: { '$regex': nameLobby } }).toArray();
        console.log(players)
        //await client.db("gameFilRouge").collection("subscription").deleteMany({name:{'$regex': nameLobby} });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    await next();
});


server.run(configGame.serverPort);