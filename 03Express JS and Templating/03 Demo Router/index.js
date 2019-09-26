const express=require('express');
const port=8080;
const api=require('./api');

const app=express();

function defaultHandler(req,res){
    res.send('Hello World');
}

app.use('/api',api);

app.get('/',defaultHandler);

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})