const juice = require('juice');

const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

// 创建一个Koa对象表示web app本身:
const app = new Koa();

const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');

app.use(koaBody());
app.use(bodyParser());

app.use(async(ctx, next) => {
    // console.log(`ctx: ${JSON.stringify(ctx.request.body)}`);
    await next();
});

// add url-route:
router.post('/inlineCSS', async(ctx, next) => {
    let htmlStr = ctx.request.body.html;
    ctx.response.type = 'application/json';
    let inlineCSSHTML = juice(htmlStr);
    // console.log("htmlStr", htmlStr);
    // console.log("inlineCSSHTML", inlineCSSHTML);
    let result = {
        'inlineCSSHTML': inlineCSSHTML
    };
    ctx.response.body = JSON.stringify(result);
});



router.get('/', async(ctx, next) => {
    ctx.response.body = 'This is api-server';
});

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');