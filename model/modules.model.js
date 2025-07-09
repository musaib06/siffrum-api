import { DataTypes } from 'sequelize';

const createModulesModel = (sequelize) => {
  const Module = sequelize.define('Modules', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true,
    createdAt: 'createdOnUTC',
    updatedAt: 'lastModifiedOnUTC',
    indexes: [
      { fields: ['name'] } // ✅ Only valid index
    ],
  });

  return Module;
};

export default createModulesModel;
