const express = require('express');
const router = express.Router();

const users = [
    {
        id: 1,
        firstName: 'First Name'
    },
    {
        id: 2,
        firstName: 'Second Name'
    },
    {
        id:3,
        firstName:'Third Name'
    }
];

router.get('/user', (req,res)=>{
    res.send(users);
});

router.get('/user/:id', (req,res)=>{
    let userFound=users.find(x=>x.id===Number(req.params.id));
    res.send(userFound);
});

module.exports=router;