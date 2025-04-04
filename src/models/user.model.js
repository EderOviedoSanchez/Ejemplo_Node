const {Model, DataTypes} = require("sequelize");
const sequelize = require('./dbconnection'); 

class User extends Model {}
User.init({
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastname:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {isEmail: true},
    },
    password:{
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    is_active:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
},
{
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
},
);
/**Exportar el modelo. */
module.exports = User;