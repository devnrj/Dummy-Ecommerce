const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
    dialect: 'sqlite', // mysql, postgres, mssql
    storage: __dirname + '/e-commerce.db'

})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

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
    vendorID:{
        type: Sequelize.NUMBER,
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

Vendor.HasMany(Product);
Product.BelongsTo(Vendor);

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
Cart.HasMany(Product);
Product.BelongsTo(Cart);
User.HasMany(Cart);
Cart.BelongsTo(User);

module.exports={
    db,User,Vendor,Product,Cart
}