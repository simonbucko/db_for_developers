import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class customer extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.CHAR(36),
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn("uuid"),
          primaryKey: true,
        },
        lastName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: "email_UNIQUE",
        },
        addressId: {
          type: DataTypes.CHAR(36),
          allowNull: false,
          references: {
            model: "address",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "customer",
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }, { name: "addressId" }],
          },
          {
            name: "email_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [{ name: "email" }],
          },
          {
            name: "fk_customer_address1_idx",
            using: "BTREE",
            fields: [{ name: "addressId" }],
          },
        ],
        defaultScope: {
          attributes: {
            exclude: ["addressId"],
          },
          nest: true,
        },
      }
    );
  }
}
