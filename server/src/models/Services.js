const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Services',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            
        },
        service_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost:{
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        commission_percentage:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    })
};