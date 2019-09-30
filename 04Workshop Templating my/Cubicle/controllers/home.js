const cubes=require('../config/database');

module.exports={
    homeGet:(req,res)=>{
       res.render('index',{cubes:cubes})//когато рендерира, винаги търси във views папката
    }
}