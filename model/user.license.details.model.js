import { DataTypes } from "sequelize";

const createUserLicenseDetailsModel = (sequelize) => {
  const UserLicenseDetails = sequelize.define("UserLicenseDetails", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stripeSubscriptionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stripeProductId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stripePriceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscriptionPlanName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validityInDays: {
      type: DataTypes.INTEGER,
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSuspended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    cancelAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cancelledOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    startDateUTC: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiryDateUTC: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    clientUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    licenseTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.JSONB,
      allowNull: true,
    }
  }, {
    timestamps: true,
    createdAt: 'createdOnUTC',
    updatedAt: 'lastModifiedOnUTC',
    indexes: [
      { fields: ['stripeCustomerId'] },
      { fields: ['clientUserId'] }
    ]
  });

  return UserLicenseDetails;
};

export default createUserLicenseDetailsModel;
