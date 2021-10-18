const koa = require('koa');
const Router = require('koa-router');
const app = new koa();

var router = Router();
router.get('/hello', async function (ctx){
    ctx.body = 'hello from koa';

});

function* getMessage() {
    this.body = 'Helo ';
    console.log('sss')
}

const PORT = process.env.PORT || 8080;
app.use(router.routes());

app.listen(PORT, function() {
    console.log('Server running on port ' + PORT );
})