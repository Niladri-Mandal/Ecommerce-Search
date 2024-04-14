const http=require('http');
const fs=require('fs');
const url=require('url');
const port=3001;
http.createServer((req,res)=>{
  
    const myUrl=url.parse(req.url,true);
    res.setHeader('Content-Type','text/html');

    if(myUrl.pathname==='/'){
        res.setHeader('Content-Type','application/json');
     fs.readFile('./products.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            const qp=myUrl.query.category;
           res.write(data+" "+qp);
            res.end();
        }
     })
        
    }

    else{
        res.write("page Not found");
    }

}).listen(port,'localhost',()=>{
    console.log("Server started...");
    console.log(`http://localhost:${port}`);
})