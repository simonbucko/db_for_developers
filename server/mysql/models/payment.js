import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class payment extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid'),
      primaryKey: true
    },
    customerId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'id'
      }
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    orderId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'payment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_payment_order1_idx",
        using: "BTREE",
        fields: [
          { name: "orderId" },
        ]
      },
      {
        name: "payments_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "customerId" },
        ]
      },
    ]
  });
  }
}
