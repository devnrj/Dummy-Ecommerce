const express = require('express')
const {
    db,
    User,
    Product,
    Vendor,
    Cart
} = require('./db')
const app=express()
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use('/pages',
  express.static(__dirname + '/public')
)

app.get('/vendors',async function(req,res){
    const ven = await Vendor.findAll()
    res.send(ven)
})

app.post('/vendors',async function(req,res){
    try {
        if(req.body.vendorName.trim()!=""){
            const result = await Vendor.create({
                name: req.body.vendorName,
              })
              res.send({success: true})
        }else{
            res.send({success:false , err: "Blank input fields not allowed"})
        }
        
      } catch (e) {
        res.send({success: false, err: e.message})
      }
})

db.sync().then(()=>
    app.listen(8880)
)