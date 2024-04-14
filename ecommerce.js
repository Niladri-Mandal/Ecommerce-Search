const http=require('http');
const fs=require('fs');
const url=require('url');

const product=fs.readFileSync('./products.json','utf-8');

const products= JSON.parse(product);
console.log(products);

http.createServer((req,res)=>{
    const myurl=url.parse(req.url,true);

    if(myurl.pathname=='/products'){
    res.setHeader('Content-Type','application/json');
    
    const newData=products.filter(product=>{
        return  product.category==myurl.query.category;
    })
    res.write(JSON.stringify(newData));
    res.end();
    }


 else if(myurl.pathname=='/filterproducts'){

    res.setHeader('Content-Type','application/json');
    const minPrice=parseFloat(myurl.query.price);
    console.log(typeof(minPrice)); 
    
    const catagoryProduct=myurl.query.category;

    const newData=products.filter(product=>{
        return ( product.category===catagoryProduct && product.price >= minPrice);
    })
    console.log(newData);
   res.write(JSON.stringify(newData));
   res.end();
 }
 
}).listen(4040,()=>{
    console.log(`http://localhost:${4040}`);
})