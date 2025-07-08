import { DataTypes } from "sequelize";

const createUserInvoiceModel = (sequelize) => {
  const UserInvoice = sequelize.define("UserInvoice", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stripeInvoiceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDateUTC: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiryDateUTC: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    discountInPercentage: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    actualPaidPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userLicenseDetailsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserLicenseDetails',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amountDue: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amountRemaining: {
      type: DataTypes.BIGINT,
      allowNull: false,
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
      { fields: ['stripeInvoiceId'] },
      { fields: ['userLicenseDetailsId'] }
    ]
  });

  return UserInvoice;
};

export default createUserInvoiceModel;
