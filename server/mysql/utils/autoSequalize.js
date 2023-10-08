import SequalizeAuto from "sequelize-auto";

export const createModelsFromDB = (sequalize) => {
  const sequalizeAuto = new SequalizeAuto(sequalize, null, null, {
    lang: "esm",
    skipTables: ["log"],
  });
  sequalizeAuto.run();
};
