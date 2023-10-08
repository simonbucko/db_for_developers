import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class job extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid'),
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "title_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'job',
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
        name: "title_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
  }
}
