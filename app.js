const client = require('./connection.js')

const express = require('express');
const pg = require('pg')

const app = express();

let port = 1212;

app.use(express.json());
client.connect();


// testing api

app.get("/test",(req,res)=>{
    res.send("success");
});
// ----------------------------------



// POST

app.post("/additem",(req,res)=>{
    let productname = req.body.product_name;
    let description = req.body.product_decription;
    let shelflife = req.body.product_shelflife;

    let qry = `INSERT INTO productdetails(product_name,product_decription,product_shelflife) VALUES( '${productname}','${description}','${shelflife}' )`
    console.log(qry);

    client.query(qry,(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result.rowCount>0){
            res.send({"staus":true, "operation":"success", data:result})
        }else{
            res.send({"status": false, "operation": "failled"})
        }

    });
});

// get

app.get("/:id",(req,res)=>{
    let id = req.params.id;
    let qry = "SELECT product_shelflife FROM productdetails WHERE product_id="+id;
    console.log(qry);

    client.query(qry,(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result.rowCount>0){
         
            res.send({"staus":true, "operation":"success", data:result.rows})
        }else{
            res.send({"status": false, "operation": "failled"})
        }

    })
});

// PUT

app.put("/:id",(req,res)=>{
    let id = req.params.id;
    let productlife = req.body.product_shelflife;
    

    let qry = `UPDATE productdetails SET product_shelflife ='${productlife}' WHERE product_id=`+id
    console.log(qry);
    
    client.query(qry,(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result.rowCount>0){
            res.send({"staus":true, "operation":"success", data:result.rows})
        }else{
            res.send({"status": false, "operation": "failled"})
        }

    })


});


// delete

app.delete("/:id",(req,res)=>{
    let id = req.params.id;
    let qry = `DELETE FROM productdetails WHERE product_id=`+id
    console.log(qry);
    
    client.query(qry,(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result.rowCount>0){
            res.send({"staus":true, "operation":"success", data:result.rows})
        }else{
            res.send({"status": false, "operation": "failled"})
        }

    })
})










app.listen(port,(req,res)=>{
    console.log('server is runnning')
});

