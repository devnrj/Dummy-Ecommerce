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

app.use('/',
  express.static(__dirname + '/public')
)
//get all vendors
app.get('/vendors',async function(req,res){
    const ven = await Vendor.findAll()
    res.send(ven)
})
//add a new vendor
app.post('/vendors', async function (req, res) {
    try {
        if (req.body.vendorName.trim() != "") {
            const result = await Vendor.create({
                name: req.body.vendorName,
            })
            res.send({ success: true })
        } else {
            res.send({ success: false, err: "Blank input fields not allowed" })
        }

    } catch (e) {
        res.send({ success: false, err: e.message })
    }
})
//get all products
app.get('/products',async function(req,res){
    const prod=await Product.findAll()
    res.send(prod)
})
//add a new product
app.post('/products', async function (req, res) {
    try {
        console.log(req.body)
        const result = await Product.create({
            name: req.body.name,
            vendor: req.body.vendor,
            price: Number(req.body.price),
            quantity: Number(req.body.quantity)
        })
        res.send({ success: true })
    } catch (e) {
        res.send({ success: false, err: e.message })
    }
})
db.sync().then(()=>
    app.listen(8880)
)