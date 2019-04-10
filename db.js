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
    productId:{
        type:Sequelize.NUMBER,
        allowNull:false
    },
    quantity: {
        type:Sequelize.NUMBER,
        allowNull:false
    }
})
Vendor.hasMany(Product,{onDelete:'cascade'});
Product.belongsTo(Vendor);
Cart.hasMany(Product);
Product.belongsTo(Cart);
User.hasMany(Cart,{onDelete:'cascade'});
Cart.belongsTo(User);

module.exports={
    db,User,Vendor,Product,Cart
}