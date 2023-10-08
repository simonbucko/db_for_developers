import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orderstatus extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: "status_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'orderstatus',
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
        name: "status_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
