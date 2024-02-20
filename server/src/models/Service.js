const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Service',{

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
        }
        
    })
};