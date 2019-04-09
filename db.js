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
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    vendor:{
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

Vendor.hasMany(Product);
Product.belongsTo(Vendor);

const Cart=db.define('Cart',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    productId:{
        type:Sequelize.NUMBER,
        allowNull:false
    },
    quantity: {
        type:Sequelize.NUMBER,
        allowNull:false
    }
})
Cart.hasMany(Product);
Product.belongsTo(Cart);
User.hasMany(Cart);
Cart.belongsTo(User);

module.exports={
    db,User,Vendor,Product,Cart
}