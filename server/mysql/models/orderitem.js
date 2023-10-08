import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orderitem extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    orderId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'orderitem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderId" },
          { name: "productId" },
        ]
      },
      {
        name: "productCode",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
    ]
  });
  }
}
