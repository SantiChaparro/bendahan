const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Payment',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            
        },
        payment_day:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        amount:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        payment_mode:{
            type: DataTypes.ENUM('Efectivo','Transferencia','Débito','Crédito'),
            allowNull: false
        },
        state:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Pendiente' 
        }
        
    })
};