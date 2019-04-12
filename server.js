const express = require('express')
const {
    db,
    User,
    Product,
    Vendor,
    Cart
} = require('./db')
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/',
    express.static(__dirname + '/public')
)
//get all vendors
app.get('/vendors', async function (req, res) {
    const ven = await Vendor.findAll()
    res.send(ven)
})
//get a vendor by id
app.get('/vendors/:id', async function (req, res) {
    const ven = await Vendor.findOne({
        where: {
            id: Number(req.params.id)
        }
    })

    res.send(ven.name)
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
//delete a vendor
app.delete('/vendors', async function (req, res) {
    const result = await Vendor.destroy({
        where: {
            id: req.body.id
        }
    })
    res.send({success:true})
})
//get all products
app.get('/products', async function (req, res) {
    const prod = await Product.findAll({
        include: Vendor
    })
    res.send(prod)
})
//add a new product
app.post('/products', async function (req, res) {
    try {
        await Product.create({
            productName: req.body.name,
            VendorId: req.body.VendorId,
            price: Number(req.body.price),
            quantity: Number(req.body.quantity)
        })
        res.send({ success: true })
    } catch (e) {
        res.send({ success: false, err: e.message })
    }
})
//get all users
app.get('/users',async function(req,res){
    const users= await User.findAll()
    res.send(users)
})

//get a user
app.get('/users/:userName', async function (req, res) {

    const user = await User.findOne({
        where: {
            name: req.params.userName
        }
    })
    res.send(user)
})
//delete a user
app.delete('/deleteUser/', async function (req, res) {
    const result = await User.destroy({
        where: {
            id: req.body.id
        }
    })
})
//add a new user
app.post('/users', async function (req, res) {
    try {

        if (req.body.userName.trim() == "") {
            res.send({ success: false, message: "Username can't be empty" })
        } else {
            await User.create({
                name: req.body.userName
            })
            res.send({ success: true, message: "User successfully created" })
        }
    } catch (e) {
        res.send({ success: false, message: e.message })
    }
})
//get all products from cart
app.get('/cart/', async function (req, res) {
    const result = await Cart.findAll()

    res.send(result)
})

//get all products from cart for a user
app.post('/cart/getItems', async function (req, res) {   
    const user = req.body.id
    const result = await Cart.findAll({
        include :[{model:Product}] ,
        where: {
            UserId: user
        }
    }).then((cart)=>{
        res.status(200).send(cart)
    }).catch((error) =>{
        res.status(501).send(error)
    })

    
})

app.delete('/products', async function (req, res) {
    const result = await Product.destroy({
        where: {
            id: req.body.id
        }
    })
    res.send({success:true})
})

//delete product from cart for a specific user
app.delete('/cart', async function (req, res) {
    
    try{
        await Cart.destroy({
            where: {
                id : req.body.id
            }
        })
        res.send({success:true})
    }catch(e){
        console.log(e)
        res.send({successs:false,message:e.message})
    }
})
//add item into a cart
app.post('/cart', async function (req, res) {
    const id = req.body.userId
    const pId = req.body.productId
    try {
        let result = await Cart.findOne({
            where: {
                UserId: id,
                ProductId: pId
            }
        })
        if (result == null) {
            await Cart.create({
                UserId: id,
                ProductId: pId,
                quantity: 1
            })
            res.send({ success: true, message: "One new record added!!" })
        } else {
            let qty = result.quantity + 1;
            await Cart.update(
                { quantity: qty },
                {
                    where: {
                        UserId: id,
                        ProductId: pId
                    }
                }
            ).then(() => { })
            res.send({ success: true, message: "Quantity of " + pId + " is updated!" })
        }
    } catch (e) {
        res.send({ success: false, message: e.message })
    }
})

db.sync().then(() =>
    app.listen(8880)
)