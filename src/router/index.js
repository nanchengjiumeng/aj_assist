const Router = require('@koa/router');
const router = new Router();

const {gsValue} = require("../skds/baidu-aip-sdk");

router.get('/bd', (ctx, next) => {
    // ctx.router available

    ctx.body = 'Hello World';
});

router.get("/baidu",async (ctx, next)=>{
    var src = ctx.query.src;
    const res = await gsValue(src);
    console.log( res);
    
    if(src){
        ctx.body = {
            code: 10001,
            text: [res]
        }
    }else{
        ctx.body = {
            code: 10004
        }
    }

})

module.exports = router;