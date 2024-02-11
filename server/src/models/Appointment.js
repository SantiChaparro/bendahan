const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Appointment',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            
        },
        date:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        time:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        paid:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
};