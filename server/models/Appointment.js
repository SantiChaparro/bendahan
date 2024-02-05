const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Appointment',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            
        },
        appointment_date:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        appointment_time:{
            type: DataTypes.TIME,
            allowNull: false,
        }
    })
};