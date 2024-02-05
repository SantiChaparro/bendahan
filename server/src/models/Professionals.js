const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Professionals',{

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
        }
    })
};