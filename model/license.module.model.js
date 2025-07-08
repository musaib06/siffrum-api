import { DataTypes } from 'sequelize';

const createLicenseModuleModel = (sequelize) => {
  const LicenseModule = sequelize.define('LicenseModules', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    licenseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Licenses',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Modules',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    canRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    canWrite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    canUpdate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    canDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lastModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: true,
    createdAt: 'createdOnUTC',
    updatedAt: 'lastModifiedOnUTC',
    indexes: [
      { fields: ['licenseId'] },
      { fields: ['moduleId'] },
      { unique: true, fields: ['licenseId', 'moduleId'] } // ✅ Unique pair constraint
    ],
  });

  return LicenseModule;
};

export default createLicenseModuleModel;
