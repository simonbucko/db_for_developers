import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class office extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid'),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    addressId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'address',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'office',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "addressId" },
        ]
      },
      {
        name: "fk_office_address1_idx",
        using: "BTREE",
        fields: [
          { name: "addressId" },
        ]
      },
    ]
  });
  }
}
