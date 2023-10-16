import _sequelize from "sequelize";
const { Model } = _sequelize;

export default class office extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        addressId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "address",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "office",
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
            name: "fk_office_address1_idx",
            using: "BTREE",
            fields: [{ name: "addressId" }],
          },
        ],
      }
    );
  }
}
