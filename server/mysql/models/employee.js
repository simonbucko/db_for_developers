import _sequelize from "sequelize";
const { Model } = _sequelize;

export default class employee extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
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
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: "email_UNIQUE",
        },
        addressId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "address",
            key: "id",
          },
        },
        officeId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "office",
            key: "id",
          },
        },
        jobId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "job",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "employee",
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
            name: "fk_employee_address1_idx",
            using: "BTREE",
            fields: [{ name: "addressId" }],
          },
          {
            name: "fk_employee_office1_idx",
            using: "BTREE",
            fields: [{ name: "officeId" }],
          },
          {
            name: "fk_employee_jobTitle1_idx",
            using: "BTREE",
            fields: [{ name: "jobId" }],
          },
        ],
      }
    );
  }
}
