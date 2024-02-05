const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Client',{

        dni:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        DateOfBirth:{
            type: DataTypes.DATEONLY,
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
        }
    })
};