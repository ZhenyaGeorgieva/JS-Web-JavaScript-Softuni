const http=require('http');
const fs=require('fs');
const port=8080;

const app=http.createServer((req,res)=>{
    const stream=fs.createReadStream('./test.txt',{encoding:'UTF-8'});
    stream.on('error', function(err){
        console.error(err);
    })
    stream.pipe(res);//свързваме readStream-a с res Stream-a и те започват да си комуникират.Т.е всичките данни от 
    //текстовия файл се прехвърлят към response-a и ги виждаме в браузъра.

    //друг вариант, ако не искаме да използваме pipe
    stream.on('data', data=>{
        res.write(data);
    });
    stream.on('end', ()=>{
        res.end()
    });
});

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
});