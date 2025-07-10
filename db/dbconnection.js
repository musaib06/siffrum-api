import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

import createUserModel from "../model/userModel.js";
import createLicenseModel from "../model/licenses.model.js";
import createModulesModel from "../model/modules.model.js";
import createBannerModel from "../model/banner.model.js";
import createLicenseModuleModel from "../model/license_module.model.js";
import createUserInvoiceModel from "../model/user.invoices.model.js";
import createUserLicenseDetailsModel from "../model/user.license.details.model.js";

let User = null;
let License = null;
let Module = null;
let Banner = null;
let LicenseModule = null;
let UserInvoice = null;
let UserLicenseDetails = null;

export const dbConnection = async (database, username, password) => {
  const sequelize = new Sequelize(database, username, password, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

  try {
    await sequelize.authenticate();
    User = await createUserModel(sequelize);
    License = await createLicenseModel(sequelize);
    Module = await createModulesModel(sequelize);
    Banner = await createBannerModel(sequelize);
    LicenseModule = await createLicenseModuleModel(sequelize);
    UserInvoice = await createUserInvoiceModel(sequelize);
    UserLicenseDetails = await createUserLicenseDetailsModel(sequelize);

    await sequelize.sync({ alter: true });

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { User, License, Module, Banner };

// export const dbConnection = async (database, username, password) => {
//   const sequelize = new Sequelize(database, username, password, {
//     host: "localhost",
//     dialect: "postgres",
//   });