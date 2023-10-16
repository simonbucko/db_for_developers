import _sequelize from "sequelize";
const { Model } = _sequelize;

export default class job extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(45),
          allowNull: false,
          unique: "title_UNIQUE",
        },
      },
      {
        sequelize,
        tableName: "job",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "title_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [{ name: "title" }],
          },
        ],
      }
    );
  }
}
