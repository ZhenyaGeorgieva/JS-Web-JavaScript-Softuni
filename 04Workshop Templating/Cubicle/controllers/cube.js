const cubes=require('../config/database');

module.exports={
    createGet:(req,res)=>{
       res.render('create')//когато рендерира, винаги търси във views папката
    },
    detailsGet:(req,res)=>{
        let cubeToShow=cubes.find(x=>x.id===req.params.id)
        res.render('details',cubeToShow)
    }
}