// нам необходимо:
//1. Что у любого пользователя будет база с профессиями и характеристиками
//2. Они равны mock данным

const Profession = require("../models/Profession"); // через эти модели мы будем взаимодействовать с базой данных
const Quality = require("../models/Quality");

const professionMock = require("../mock/professions.json");
const qualitiesMock = require("../mock/qualities.json");

module.exports = async () => {
  const professions = await Profession.find();
  if (professions.length !== professionMock.length) {
    await createInitialEntity(Profession, professionMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop(); // чистим всю коллекцию от данных
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save(); // все данные которые мы тут пишем заносит в монго дб
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
