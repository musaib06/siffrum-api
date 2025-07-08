import { Sequelize } from "sequelize";
import createUserModel from "../model/userModel.js";
import createLicenseModel from "../model/licences.model.js";
import createModulesModel from "../model/modules.model.js";
import createBannerModel from "../model/banner.model.js";
import createLicenseModuleModel from "../model/license.module.model.js";
import createUserInvoiceModel from "../model/user.invoices.model.js";
import createUserLicenseDetailsModel from "../model/user.license.details.model.js";
let User = null;
let License = null;
let Module = null;
let Banner = null;
let LicenseModule=null;
let UserInvoice = null;
let UserLicenseDetails= null;
export const dbConnection = async (database, username, password) => {
  const sequelize = new Sequelize(database, username, password, {
    host: "localhost",
    dialect: "postgres",
  });
  try {
    await sequelize.authenticate();
    User = await createUserModel(sequelize);
    License= await createLicenseModel(sequelize);
    Module= await createModulesModel(sequelize);
    Banner = await createBannerModel(sequelize);
    LicenseModule = await createLicenseModuleModel(sequelize);
    UserInvoice = await createUserInvoiceModel(sequelize);
    UserLicenseDetails = await createUserLicenseDetailsModel(sequelize);
    await sequelize.sync({alter:true});
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export {User,License,Module,Banner};
