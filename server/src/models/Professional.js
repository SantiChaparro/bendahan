const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Professional',{

        dni:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        mail:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true,
             }
        },
        commission_percentage:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    })
};