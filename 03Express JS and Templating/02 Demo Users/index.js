const express=require('express');
const port=1220;

const users=[
    {
        id:1,
        name:'First Name'
    },
    {
        id:2,
        name:'Second Name'
    }
];

const app=express();

function defaultHandler(req,res){
    res.send('Hello World!');
}

app.get('/user/:id',(req,res)=>{
    const user=users.find(x=>x.id===Number(req.params.id));
    res.send(user);
});

app.get('/', defaultHandler);

app.listen(port,()=>{
    console.log(`Server is listening on ${port}.`)
});