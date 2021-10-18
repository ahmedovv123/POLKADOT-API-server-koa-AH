const koa = require('koa');
const Router = require('koa-router');
const app = new koa();
const { Pool } = require('pg')
const blockController = require('./src/controllers/blockController');
const transactionController = require('./src/controllers/transactionController');
const accountController = require('./src/controllers/accountController');
require('dotenv').config()

var router = Router();

router.get('/accounts/count', async function (ctx){
    const result =  await accountController.getAccountsCount(ctx);
    ctx.body = result;
});

router.get('/accounts/transactions/count/:accountId', async function (ctx){
    const result =  await accountController.getAccountTransactionsCount(ctx);
    ctx.body = result;
});

router.get('/accounts/transactions/:accountId', async function (ctx){
    const result =  await accountController.getAccountTransactions(ctx);
    ctx.body = result;
});

router.get('/accounts/balance/:accountId', async function (ctx){
    const result =  await accountController.getAccountBalance(ctx);
    ctx.body = result;
});




const PORT = process.env.PORT || 8080;
app.use(router.routes());

app.pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'postgres',
    password: process.env.DB_PASS || 'root',
    port: process.env.DB_PORT || 5432
})

app.listen(PORT, function() {
    console.log('Server running on port ' + PORT );
})