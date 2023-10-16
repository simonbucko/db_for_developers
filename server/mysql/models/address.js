import _sequelize from "sequelize";
const { Model } = _sequelize;

export default class address extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        state: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        postalCode: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        street: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "address",
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
        ],
      }
    );
  }
}
