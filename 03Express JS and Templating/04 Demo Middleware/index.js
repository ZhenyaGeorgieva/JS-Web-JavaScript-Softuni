const express=require('express');
const port=8080;
const api=require('./api');

const app=express();

function defaultHandler(req,res){
    res.send('Hello World');
}

app.use('/api',api);

app.get('/',defaultHandler);

// app.use(function(err,req,res,next){
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!')
// })

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})