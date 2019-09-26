const express=require('express');
const port=8080;

const app=express();

app.use(express.static(__dirname+'/public'));

function defaultHandler(req,res){
    res.send('<link rel="stylesheet" type="text/css" href="style.css"><h1>Hello World</h1><script src="static.js"></script>');
}

app.get('/',defaultHandler);

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})