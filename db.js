const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
    dialect: 'sqlite', // mysql, postgres, mssql
    storage: __dirname + '/e-commerce.db'

})

const User=db.define('User',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Vendor=db.define('Vendor',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Product=db.define('Product',{
    productName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    quantity:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
})

const Cart=db.define('Cart',{
    quantity: {
        type:Sequelize.NUMBER,
        allowNull:false
    }
})

Vendor.hasMany(Product,{onDelete:'cascade'});
Product.belongsTo(Vendor);
Product.hasMany(Cart,{onDelete:'cascade'});
Cart.belongsTo(Product);
User.hasMany(Cart,{onDelete:'cascade'});
Cart.belongsTo(User);

//db.sync().then(()=>console.log("Database created")).catch(()=>console.log("Error Occurred"))
module.exports={
    db,User,Vendor,Product,Cart
}