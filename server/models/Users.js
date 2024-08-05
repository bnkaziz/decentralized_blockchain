module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
      allowNull: false,
    },
    // deposit: {
    //   type: DataTypes.DOUBLE,
    //   defaultValue: 0.0,
    //   allowNull: false,
    // },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  return Users;
};
