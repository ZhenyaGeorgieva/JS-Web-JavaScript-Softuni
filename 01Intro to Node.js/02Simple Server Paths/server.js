const http=require('http');
const url=require('url');
const port=1337;

const app=http.createServer(function(req,res){
    const {pathname}=url.parse(req['url']);
    if (pathname==='/'){
        res.end('Home');
        return;
    }
    if (pathname==='/about'){
        res.end('About');
        return;
    }
});

app.listen(port,function(){
    console.log(`Server is listening on port ${port}`)
})
