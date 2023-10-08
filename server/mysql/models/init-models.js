import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _address from "./address.js";
import _customer from "./customer.js";
import _employee from "./employee.js";
import _job from "./job.js";
import _office from "./office.js";
import _order from "./order.js";
import _orderitem from "./orderitem.js";
import _orderstatus from "./orderstatus.js";
import _payment from "./payment.js";
import _product from "./product.js";

export default function initModels(sequelize) {
  const address = _address.init(sequelize, DataTypes);
  const customer = _customer.init(sequelize, DataTypes);
  const employee = _employee.init(sequelize, DataTypes);
  const job = _job.init(sequelize, DataTypes);
  const office = _office.init(sequelize, DataTypes);
  const order = _order.init(sequelize, DataTypes);
  const orderitem = _orderitem.init(sequelize, DataTypes);
  const orderstatus = _orderstatus.init(sequelize, DataTypes);
  const payment = _payment.init(sequelize, DataTypes);
  const product = _product.init(sequelize, DataTypes);

  order.belongsToMany(product, {
    as: "productId_products",
    through: orderitem,
    foreignKey: "orderId",
    otherKey: "productId",
  });
  product.belongsToMany(order, {
    as: "orderId_orders",
    through: orderitem,
    foreignKey: "productId",
    otherKey: "orderId",
  });
  customer.belongsTo(address, { as: "address", foreignKey: "addressId" });
  address.hasMany(customer, { as: "customers", foreignKey: "addressId" });
  employee.belongsTo(address, { as: "address", foreignKey: "addressId" });
  address.hasMany(employee, { as: "employees", foreignKey: "addressId" });
  office.belongsTo(address, { as: "address", foreignKey: "addressId" });
  address.hasMany(office, { as: "offices", foreignKey: "addressId" });
  order.belongsTo(customer, { as: "customer", foreignKey: "customerId" });
  customer.hasMany(order, { as: "orders", foreignKey: "customerId" });
  payment.belongsTo(customer, { as: "customer", foreignKey: "customerId" });
  customer.hasMany(payment, { as: "payments", foreignKey: "customerId" });
  employee.belongsTo(job, { as: "job", foreignKey: "jobId" });
  job.hasMany(employee, { as: "employees", foreignKey: "jobId" });
  employee.belongsTo(office, { as: "office", foreignKey: "officeId" });
  office.hasMany(employee, { as: "employees", foreignKey: "officeId" });
  orderitem.belongsTo(order, { as: "order", foreignKey: "orderId" });
  order.hasMany(orderitem, { as: "orderitems", foreignKey: "orderId" });
  payment.belongsTo(order, { as: "order", foreignKey: "orderId" });
  order.hasMany(payment, { as: "payments", foreignKey: "orderId" });
  order.belongsTo(orderstatus, {
    as: "orderStatus",
    foreignKey: "orderStatusId",
  });
  orderstatus.hasMany(order, { as: "orders", foreignKey: "orderStatusId" });
  orderitem.belongsTo(product, { as: "product", foreignKey: "productId" });
  product.hasMany(orderitem, { as: "orderitems", foreignKey: "productId" });

  return {
    address,
    customer,
    employee,
    job,
    office,
    order,
    orderitem,
    orderstatus,
    payment,
    product,
  };
}
