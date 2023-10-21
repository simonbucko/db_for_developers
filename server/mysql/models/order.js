import _sequelize from "sequelize";
const { Model } = _sequelize;

export default class order extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        orderDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        shippedDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        comments: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        customerId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "customer",
            key: "id",
          },
        },
        orderStatusId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
          references: {
            model: "orderstatus",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "order",
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "id_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "customerNumber",
            using: "BTREE",
            fields: [{ name: "customerId" }],
          },
          {
            name: "fk_order_orderStatus1_idx",
            using: "BTREE",
            fields: [{ name: "orderStatusId" }],
          },
        ],
      }
    );
  }
}
