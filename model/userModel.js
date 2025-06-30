import { DataTypes } from "sequelize";

const createUserModel=(sequelize)=>{
 const User = sequelize.define("User", {
   id: {
     type: DataTypes.INTEGER,
     autoIncrement: true,
     primaryKey: true,
   },
   username: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
   },
   email: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
     validate: { isEmail: true },
   },
   password: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
   },
   refereshToken: {
     type: DataTypes.TEXT,
     allowNull: true,
   },
   role: {
     type: DataTypes.ENUM("superAdmin", "Vendor", "endUser", "Researcher"),
     allowNull: false,
     defaultValue: "endUser",
   },
 });
 return User;
}

export default createUserModel;